// jshint node: true
'use strict';
var textHelper = (function () {

    return {
        completeHelp: 'Here\'s some things you can say,' + ' List the chores.' + ' add clean the bathroom sink to the chores list.' + ' I finished doing the dishes.' + ' What\'s the first chore.' + ' Give me a chore.' + ' Tell me the next chore.' + ' and exit.',
        nextHelp: 'You can add or remove chores from the list, hear the list, be assigned a chore and move to the next chore on the list or say help. What would you like?',

        getChorePart: function (recognizedChorePart) {
            if (!recognizedChorePart) {
                return undefined;
            }
            var split = recognizedChorePart.indexOf(' '), newChorePart;

            if (split < 0) {
                newChorePart = recognizedChorePart;
            } else {
                //the name should only contain a first name, so ignore the second part if any
                newChorePart = recognizedChorePart.substring(0, split);
            }
            return newChorePart;
        }
    };
})();
module.exports = textHelper;
