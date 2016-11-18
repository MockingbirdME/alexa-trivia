// jshint node: true
'use strict';
var AlexaSkill = require('./AlexaSkill'),
    eventHandlers = require('./eventHandlers'),
    intentHandlers = require('./intentHandlers');

var APP_ID = "amzn1.ask.skill.9b78c227-e232-40ff-a77d-ad739a791175";
var skillContext = {};

/**
 * ChoresForHome is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var ChoresForHome = function () {
    AlexaSkill.call(this, APP_ID);
    skillContext.needMoreHelp = true;
};


// Extend AlexaSkill
ChoresForHome.prototype = Object.create(AlexaSkill.prototype);
ChoresForHome.prototype.constructor = ChoresForHome;

eventHandlers.register(ChoresForHome.prototype.eventHandlers, skillContext);
intentHandlers.register(ChoresForHome.prototype.intentHandlers, skillContext);

module.exports = ChoresForHome;
