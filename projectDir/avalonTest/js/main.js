define(function(require, exports, module){
	var $ = require('jquery');
  	var avalon = require('avalon');

  	// avalon拦截器示例
  	avalon.ready(function(){
  		var vm = avalon.define({
  			$id : "duplexHooks",
  			aaa : "我是帅哥"
  		})
  		avalon.scan();
  	})
  	avalon.duplexHooks.limite ={
  		get : function(str,data){
  			var limite = parseInt($(data.element).attr("data-duplex-limite"));
  			console.log(str.length);
  			if(str.length > limite){
  				return data.element.value = str.slice(0, limite);
  			}
  			return str;
  		}
  	}

  	// 样式控制
  	var cssCtrl = avalon.define({
  		$id : "cssCtrl",
  		width : "55",
  		height : 100,
  		backgroundColor : "black",
  		addWidth : function(num){
  			cssCtrl.width = (parseInt(cssCtrl.width)+num);
  		},
  		alert : function(str){
  			alert(str)
  		},
  		addHeight : function(num){
  			cssCtrl.height = (parseInt(cssCtrl.height)+num);
  		},
  		reset : function(){
  			cssCtrl.height = 100;
  			cssCtrl.width = 55;
  		}
  	})
})