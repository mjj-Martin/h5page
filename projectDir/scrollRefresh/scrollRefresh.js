function scrollRefresh(opt){
	opt = opt || {};
	var option = {
		devaation : 50,
		success : function(tip,end,onFail){

		}
	}
	option = $.extend(option,opt);

	var touchArea = $('.scrollTouch'),
	    tip = $('.scroll-tip'),
	    devaationStartOffset,
	    touchMoveOffset,
	    scrollBarOffset
	    body = $(document.body),
	    devaation = option.devaation;

	/**
	 * flag有3种状态
	 * 0 = 初始化状态
	 * 1 = 滚动中
	 * 2 = 执行相应的回调函数
	 */
	var flag = 0;

	touchArea.on('touchstart',scrollTouchStart);
	touchArea.on('touchmove',scrollTouchMove);
	touchArea.on('touchend',scrollTouchEnd);

	// 设置偏移量
	function translate(num){
		touchArea.css({
			'-webkit-transform':'translateY('+num+'px)',
			'transform':'translateY('+num+'px)',
		})
	}

	// 触摸开始，初始化偏移值
	
	function scrollTouchStart(e){

		console.log(flag)

		if (flag != 2) {
			if (touchArea.hasClass('onload2')) {
				touchArea.removeClass('onload2');
			}
			if (touchArea.hasClass('onload')) {
				touchArea.removeClass('onload');
			}
		}

		var target = e.originalEvent.targetTouches[0];
		scrollBarOffset = body.scrollTop();
		touchStartOffset = target.clientY;
	}

	// 移动
	function scrollTouchMove(e){
		var target = e.originalEvent.targetTouches[0];
		touchMoveOffset = target.clientY;
		// 判断滚动条到顶部 并 处于下拉状态
		if( body.scrollTop() < 1 && (touchMoveOffset > touchStartOffset) ){
			e.preventDefault();
			if(flag != 2){
				var num  = (touchMoveOffset - touchStartOffset - scrollBarOffset)*0.6;
				num = num > 100? 100 : num;
				if(num < 80){
					tip.html('下拉刷新...');
					flag = 0;
				}else{
					tip.html('释放加载...');
					flag = 1;
				}

				translate(num);
			}
		}
	}

	// 结束
	function scrollTouchEnd(e){
		if(flag == 1){
			flag = 2;
			tip.html('正在加载...');
			touchArea.on('webkitTransitionEnd.end1',function(){
				touchArea.removeClass('onload');
				success(tip,option.success,successEnd,onFail)
			});
			touchArea.addClass('onload');
			translate(80);
		}else if(flag == 2){
			return false;
		}else{
			translate(0);
			flag = 0;
		}
	}

	// 下拉回调函数执行后的操作
	function successEnd(){
		touchArea.on('webkitTransitionEnd.end2',function(){
			flag = 0;
			touchArea.removeClass('onload2');
			touchArea.off('webkitTransitionEnd.end2');
		})
		touchArea.addClass('onload2');
		translate(0);
	}
	//下拉回调失败
	function onFail(){
		tip.html('加载失败，点击请重新加载');
		flag = 0;;
		tip.on('touchstart',function(e){
			location.reload();
		})
	}

	/**
	 * [success 下拉触发回调]
	 * @param  {[jquery obj]}   tip      [tip框的jquery对象]
	 * @param  {Function} callback [下拉]
	 * @param  {[type]}   end      [description]
	 * @return {[type]}            [description]
	 */
	function success(tip,callback,end,onFail){
		// tip.off('touchstart');
		console.log('触发')
		callback && callback(tip,end,onFail);
		// touchArea.off('webkitTransitionEnd.end1');
	}
}