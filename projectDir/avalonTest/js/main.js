define(function(require, exports, module){
	var $ = require('jquery');
  	var avalon = require('avalon');
  	var patient = require('./patient.js');
  	var Y = require('./y.js');

  	// seajs.use('b.js');
  	// require('a.js');

  	var person = new patient(8);
  	person.getPid();
  	person.a();

  	Y.alert();
})