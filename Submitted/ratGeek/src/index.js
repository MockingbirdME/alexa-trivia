/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask rat Geek for a rat fact"
 *  Alexa: "Here's your rat fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = "amzn1.ask.skill.5eaff2ae-73ca-44f3-9d06-b4d16cec0051";

/**
 * Array containing rat facts.
 */
var FACTS = [
    "Rats take care of other injured or sick rats in their group.",
    "Without companionship rats tend to become lonely and depressed.",
    "Rats have excellent memories.",
    "When happy, rats have been observed to chatter or grind their teeth.",
    "Rats sometimes make sounds similar to human laughter when they play.",
    "Rats succumb to peer-pressure from other rats.",
    "Although very curious animals, rats are also shy, and prefer to run away than confront a potential threat.",
    "Rats are extremely clean animals, spending several hours every day grooming themselves and their group members. Rats are cleaner than cats or dogs",
    "They are less likely than cats or dogs to catch and transmit parasites and viruses.",
    "A rat can go longer than a camel without having a drink of water.",
    "Rats’ tails help them to balance, communicate and regulate their body temperature.",
    "The rat is the first of the twelve animals of the Chinese zodiac. People born in this year are thought to possess characteristics which are associated with rats, namely: creativity, intelligence, honesty, ambition and generosity.",
    "Rats are recognised as the vehicle of Lord Ganesh in Indian tradition. They are worshipped at the Karni Devi Temple, where priests and pilgrims will feed them grain and milk.",
    "An adult rat can squeeze through a hole as small as the size of a quarter.",
    "Rats have strong teeth, they can chew through glass, cinderblock, wire, aluminum and lead.",
    "Rats don’t have great eyesight so they rely on their whiskers to help them interpret their surroundings.",
    "Rats were one of the first animals to make the trip to outer space, beating humans by almost a year.",
    "Rats are stupendous nappers and they spend about 76 percent of daylight hours sleeping.",
    "A group of rats is called a mischief",
    "Rats have bellybuttons but not gallbladders or tonsils",
    "Rats were first domesticated in the eighteenth century, they were originally breed for use in blood sports",
    "In the wild, rats live up to eighteen months with an average lifespan of less than a year; in captivity these times are doubled.",
    "A female rat can give birth to a litter of as many as 22 babies.",
    "Rats are quite vocal but many of the noises they make are at a frequency too high for humans to hear.",
    "Newborn rats will begin to open their eyes when they are around twelve days old.",
    "Rat's front teeth grow between four and a half and five and a half inches a year, if they don't chew on hard objects to wear them down they can become dangerous to their health.",
    "A rat can tred water for three days and survive being flushed down a toilet.",
    "there is approximately one rat per person living in the United States",
    "A rat can fall as far as 50 feet and land uninjured",
    "Rats do not sweat, they regulate their temperature by constricting or expanding blood vessels in their tails."


];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * ratGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Fact = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Fact.prototype = Object.create(AlexaSkill.prototype);
Fact.prototype.constructor = Fact;

Fact.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Fact.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Fact.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Fact.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say tell me a rat fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random rat fact from the rat facts list
    var factIndex = Math.floor(Math.random() * FACTS.length);
    var randomFact = FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your fact: " + randomFact;
    var cardTitle = "Your Fact";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the ratGeek skill.
    var fact = new Fact();
    fact.execute(event, context);
};
