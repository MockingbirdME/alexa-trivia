'use  strict';

var storage = require('./storage'),
  textHelper = require('./textHelper');

  var registerEventHandlers = function (eventHandlers, skillContext) {
      eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
          //if user said a one shot command that triggered an intent event,
          //it will start a new session, and then we should avoid speaking too many words.
          skillContext.needMoreHelp = false;
      };

      eventHandlers.onLaunch = function (launchRequest, session, response) {
          //Speak welcome message and ask user questions
          //based on whether there are players or not.
          storage.loadChoreList(session, function (currentChoreList) {
              var speechOutput = '',
                  reprompt;
              if (currentChoreList.data.listedChores.length === 0) {
                  speechOutput += 'You currently have no Chores for home, Let\'s start your Chore List. What\'s your first chore?';
                  reprompt = "Please tell me what your first chore is?";
              } else {
                  speechOutput += 'Chores for home, What can I do for you?';
                  reprompt = textHelper.nextHelp;
              }
              response.ask(speechOutput, reprompt);
          });
      };
    };
    exports.register = registerEventHandlers;
