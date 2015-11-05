function numAnimate(opt){

	/**
	 * obj   数字容器 jquery对象
	 * numLenth 数字位数
	 * defaultNum 初始化数字
	 */

	var option = {
		obj : $('.numAnimation'),
		numLength : 8,
		defauleNum : 2121
	}

	$.extend(option,opt);
	
	var numLength = Number(option.numLength) || 5,
		defauleNum = Number(option.defauleNum) || 0,
		numWrap = option.obj,
		len;

	function init(){

		// 初始化创建节点
		var numHtml = ''
		for(var i = 0;i < numLength ;i++){
			numHtml += '<ul><li>0</li><li>1</li><li>2</li><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li><li>9</li><li>-</li></ul>'
		}
		numWrap.html(numHtml);

	}

	init();

	var height = numWrap.find('li').eq(0).height();

	// 数字取整 3位取整  1 => 001
	function pad(num){
		num = parseInt(num);
		var len = num.toString().length;  
	    while(len < numLength) {  
	        num = "0" + num;  
	        len++;
	    }
	    return num;
	}

	this.showNum = function(num){
		var numString = pad(num);
		for(i = 0,len = numString.length;i < len;i++){
			var b = numString.charAt(len-i-1);
			if(b == '-'){
				b = 10;
			}
			var y = -parseInt(b)*height;
			var obj = numWrap.find('ul').eq(numLength-i-1);
			obj.animate({
				marginTop: y
			},
				500, function() {
			});
		}
	}
	this.showNum(defauleNum);
}

