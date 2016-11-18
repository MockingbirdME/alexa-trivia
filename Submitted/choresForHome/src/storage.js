// jshint node: true
'use strict';
var AWS = require("aws-sdk");

var storage = (function () {
    var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

    /*
     * The ChoreList class stores all ChoreList states for the user
     */
    function ChoreList(session, data) {
        if (data) {
            this.data = data;
        } else {
            this.data = {
                listedChores: [],
                currentChore: null
            };
        }
        this._session = session;
    }

    ChoreList.prototype = {
        isEmptyList: function () {
            //check if there are no listed chores,
            var noChores = true;
            var choresData = this.data;
            if (choresData.listedChores.length === 0){
              noChores = true;
            } else {
              noChores = false;
            }
            return noChores;
        },
        save: function (callback) {
            //save the current list in the session,
            //so next time we can save a read from dynamoDB
            this._session.attributes.currentChoreList = this.data;
            dynamodb.putItem({
                TableName: 'ChoresForHomeUserData',
                Item: {
                    CustomerId: {
                        S: this._session.user.userId
                    },
                    Data: {
                        S: JSON.stringify(this.data)
                    }
                }
            }, function (err, data) {
                if (err) {
                    console.log(err, err.stack);
                }
                if (callback) {
                    callback();
                }
            });
        }
    };

    return {
        loadChoreList: function (session, callback) {
            if (session.attributes.currentChoreList) {
                console.log('get chore list from session=' + session.attributes.currentChoreList);
                callback(new ChoreList(session, session.attributes.currentChoreList));
                return;
            }
            dynamodb.getItem({
                TableName: 'ChoresForHomeUserData',
                Key: {
                    CustomerId: {
                        S: session.user.userId
                    }
                }
            }, function (err, data) {
                var currentChoreList;
                if (err) {
                    console.log(err, err.stack);
                    currentChoreList = new ChoreList(session);
                    session.attributes.currentChoreList = currentChoreList.data;
                    callback(currentChoreList);
                } else if (data.Item === undefined) {
                    currentChoreList = new ChoreList(session);
                    session.attributes.currentChoreList = currentChoreList.data;
                    callback(currentChoreList);
                } else {
                    console.log('get chore list from dynamodb=' + data.Item.Data.S);
                    currentChoreList = new ChoreList(session, JSON.parse(data.Item.Data.S));
                    session.attributes.currentChoreList = currentChoreList.data;
                    callback(currentChoreList);
                }
            });
        },
        newChoreList: function (session) {
            return new ChoreList(session);
        }
    };
})();
module.exports = storage;
