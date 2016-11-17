/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

'use strict';
var textHelper = require('./textHelper'),
    storage = require('./storage');

var registerIntentHandlers = function (intentHandlers, skillContext) {
    intentHandlers.ListChoresFromListIntent = function (intent, session, response) {
      //list all chores currently on the chore list
      storage.loadChoreList(session, function(currentChoreList) {
        if (currentChoreList.data.listedChores.length === 0) {
          response.tell('Your chore list is currently empty.');
          return;
        } else {
          var speechOutput = "Your chores are ";
          currentChoreList.data.listedChores.forEach(fuction(value){
            speechOutput += (value + '. ');
          });
          response.tell(speechOutput);
        }
      });
    };

    intentHandlers.AddChoreToListIntent = function (intent, session, response) {
      var newChoreVerb = textHelper.getChorePart(intent.slots.ChoreVerb.value);
      var newChoreLocation = textHelper.getChorePart(intent.slots.ChoreLocation.value);
      var newChoreObject = textHelper.getChorePart(intent.slots.ChoreObject.value);

      if (!newChoreVerb || (!newChoreLocation && !newChoreObject)) {
        response.ask('I\'m sorry, I didn\'t catch that; what chore would you like to add?', 'What chore do you want to add?');
        return;
      }
      storage.loadChoreList(session, function(currentChoreList){
        var newChoreName = newChoreVerb + ' the'
        if (newChoreLocation) {
          newChoreName =+ ' ' + newChoreLocation;
        }
        if (newChoreObject) {
          newChoreName += ' ' + newChoreObject;
        }
        if (currentChoreList.data.listedChores.includes(newChoreName)) {
          response.tell(newChoreName + ' is already on your list of chores to do.');
          return;
        }
        currentChoreList.data.listedChores.push(newChoreName);
        currentChoreList.save(function() {
          response.tell(newChoreName + ' has been added to your chore list.');
        });
      });
    };

    intentHandlers.RemoveChoreFromListIntent = function (intent, session, response) {};

    intentHandlers.FirstChoreFromListIntent = function (intent, session, response) {};

    intentHandlers.RandomChoreFromListIntent = function (intent, session, response) {};

    intentHandlers.NextChoreFromListIntent = function (intent, session, response) {};
};
exports.register = registerIntentHandlers;
