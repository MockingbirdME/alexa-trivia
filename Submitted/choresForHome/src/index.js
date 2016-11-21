// jshint node: true

//last modification 9:27 am, nov 21st.
'use strict';

var ChoresForHome = require('./choresForHome');

exports.handler = function(event, context) {
  var choresForHome = new ChoresForHome();
  choresForHome.execute(event, context);
};
