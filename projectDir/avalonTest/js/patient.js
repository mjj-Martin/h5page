define(function(require, exports, module) {

    var $ = require('jquery');
    var avalon = require('avalon');

    function patient (id){
    	console.log(1);
    	this.pid = id;
    	
    }

    patient.prototype.a = function(){
    	console.log(2);
    };
    patient.prototype.getPid = function(){
      	var that = this;
      	console.log(that.pid);
    }


    module.exports = patient;

});