'use strict';

var ChoresForHome = require('./choresForHome');

exports.handler = function(event, context) {
  var choresForHome = new ChoresForHome();
  choresForHome.execute(event, context);
};
