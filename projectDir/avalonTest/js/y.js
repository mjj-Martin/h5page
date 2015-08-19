define(function(require, exports, module) {

	function Y(){};

	Y.tips =function(str,type,time){
        var time = time || 1500;
        var t = null;
        if($('.alert').size()){
            var h = $('.alert').last().outerHeight();
            var top = $('.alert').last().offset().top+h+5;
            top = top +'px'
        }else{
            var top ='10px'
        }
        top ='10px'
        var index = 100;
        if(type == 'error'){
            var type = 'alert-error';
            var text = '警告：';
        }else{
            var type = 'alert-warn';
            var text = '温馨提示：'
        }
        var id = 'alert'+new Date().getTime();
        var html ="<div id='alert_w'>";
        var html2 ='<div id="'+id+'" class="alert '+type+'" style="top:'+top+'"><div class="alert-close" onclick=" $(\'#'+id+'\').remove();">X</div><div class="alert-message"><span class="label">'+text+'</span>'+str+'</div></div>';
        var html3 ='</div>';
        if($('#alert_w').size()>0){
            $('#alert_w').html(html2);
        }else{
            html =html+html2+html3;
            $('body').append(html);
        }
        t = setTimeout(function(){
            $('#'+id).remove();
        },time)
        $('#'+id).mouseover(function(){
            clearTimeout(t);
        }).mouseleave(function(){
            t = setTimeout(function(){
                $('#'+id).remove();
            },time)
        })

    }

    /**
     * 全局弹窗
     * */
    Y.dialog =function(opts){

        var id2 ='dialog_w'+new Date().getTime();
        this.title =opts.title||'提示';
        this.hideHeader =opts.hideHeader||'';
        this.content =opts.content||'';
        this.width =opts.width||'450px';
        this.height =opts.height||'300px';
        this.callback =opts.callback||function(){};
        this.zIndex = $('.dialog_main').css('z-index')||60;
        this.style =opts.style||'';
        this.mark = opts.mark == false?opts.mark:true;
        this.move = opts.move||'';
        this.id= '#'+id2;
        this.init(id2);
        //关闭弹窗
        this.close =opts.close||function(){

            var me = this;
            if($('.dialog_main').size()>=2){
                $(me.id).prev('.dialog_op').remove();
                $(me.id).remove();

            }else{
                $(me.id).closest('.dialog_w').remove();
            }
        };

        Y.dialog.close =function(id){
            if(id){
                if($('.dialog_main').size()>=2){
                    $(id).prev('.dialog_op').remove();
                    $(id).remove();
                }else{
                    $(id).closest('.dialog_w').remove();
                }
            }
            if($('.dialog_main:last').length){
                var DOMID = '#'+$('.dialog_main:last').attr('id');
                new $Y.moveBox(DOMID,'-webkit-user-select: none;-moz-user-select: none;-o-user-select: none;-ms-user-select: none;');
            }


        }

        //修改弹窗内容
        this.content =function(str){
            var me = this;
            $(me.id).find('.dialog_content').html(str);
        };
    };

    //弹窗初始化
    Y.dialog.prototype.init =function(id){
        var me = this;
        var is_shaow = me.mark?'no_shadow':'';
        var noSelect = me.move?'-webkit-user-select: none;-moz-user-select: none;-o-user-select: none;-ms-user-select: none;':'';
        var Has =$('.dialog_w').size()?true:false;
        this.zIndex =this.zIndex+2;
        var html ='',html2;
        html2='<div class="dialog_main animation '+is_shaow+'" id="'+id+'"  style="width: '+this.width+';height: '+this.height+';z-index:'+this.zIndex+';margin:auto;'+noSelect+this.style+'">';
        if(!me.hideHeader){
            html2 +='<div class="dialog_title_w">';
        }else{
            html2 +='<div class="dialog_title_w" style="display: none">';
        }
        html2+='<div class="title">'+this.title+'</div>'+
        '<span class="btn_close"  onclick="$Y.dialog.close(\'#'+id+'\')">X</span>'+
        '</div>'+
        '<div class="dialog_content">'+
        this.content +    // 内容
        '</div>'+
        '</div>';
        if(!Has){
            html+='<div class="dialog_w">';
            if(this.mark){
                html += '<div class="dialog_bg"></div>'
            }
            html+= html2;
            html+='</div>';
            $('body').append(html);
        }else{
            html = html2;
            var d = "<div class='dialog_op'' style='position: absolute;z-index: "+(this.zIndex-1)+";width: 100%;height: 100%;'></div>";
            $('.dialog_w').append(d+html);

        }
        setTimeout(function(){
            me.callback(me);
            new $Y.moveBox(me.id,me.move);
        },100)

    };


    /**
     * 启用自定义滚动条
     * */
    Y.ScrollBar =function(type,Dom){
        if(Dom){
            $(Dom).each(function(){
                $(this).mCustomScrollbar({
                    theme:'minimal-dark',
                    axis:type||'y' // horizontal scrollbar
                });
            })
        }else{
            $(".mCustomScrollbar_u").each(function(){
                $(this).mCustomScrollbar({
                    theme:'minimal-dark',
                    axis:type||'y' // horizontal scrollbar
                });
            })
        }
    };

    /**
     * 移动窗口
     * */
    Y.moveBox = function(DOM,type){
        this.init(DOM,type);
    }

    Y.moveBox.prototype.init = function(DOM,type){
        this.type = type;
        var od  = this.od = $(DOM)[0];
        var w = this.w,
            h=this.h,
            mx= this.mx =null,
            my= this.my,
            mouseD=this.mouseD =null;
        odrag = this.odrag ='';
        var isIE = document.all ? true : false;
        w = $(this.od).outerWidth();
        h = $(this.od).outerHeight();

        var maxL = $('body').width();
        var maxT =$(window).height();
        document.onmousedown = function(e){
            var e = e ? e : event;
            if(e.button == (document.all ? 1 : 0)){
                mouseD = true;
            }
        }

        document.onmouseup = function(){
            mouseD = false;
            odrag = "";
            if(isIE){
                od.releaseCapture();
                //od.filters.alpha.opacity = 100;
            }else{
                window.releaseEvents(od.MOUSEMOVE);
                //od.style.opacity = 1;
            }
        }


//function readyMove(e){
        $(od).on('mousedown',function(e){
         //   var e = e ? e : event;
           // var target  = e.toElement || e.target || e.srcElement ;

            var target = e.target;

            if(target.nodeName =='BUTTON'|| target.nodeName =='TEXTAREA'|| target.className =='mCSB_dragger_bar'|| target.nodeName =='INPUT'|| target.className =='p-select'){
                return;
            }
            odrag = this;
            od.style.left = od.offsetLeft + "px";
            od.style.top = od.offsetTop + "px";
            od.style.margin = "inherit";
            var e = e ? e : event;
            if(e.button == (document.all ? 1 : 0)){
                mx = e.clientX;
                my = e.clientY;
                od.style.left = od.offsetLeft + "px";
                od.style.top = od.offsetTop + "px";
                if(isIE){
                    od.setCapture();
                    //od.filters.alpha.opacity = 50;
                }else{
                    window.captureEvents(Event.MOUSEMOVE);
                    //od.style.opacity = 0.5;
                }
            }
        })

        document.onmousemove = function(e){
            var e = e ? e : event;
            if(mouseD==true && odrag){
                var mrx = e.clientX - mx;
                var mry = e.clientY - my;
                var c_left  =parseInt(od.style.left) +mrx;
                var c_top  =parseInt(od.style.top) +mry;
                if(c_left>(-w) && c_left< maxL){
                    od.style.left = c_left + "px";
                }
                if(c_top>(-h)  && c_top< maxT){
                    od.style.top = c_top + "px";
                }
                mx = e.clientX;
                my = e.clientY;
            }
        }
    };

    //使用时间
    Y.useTime =function(DOM,startTime){
        Y.useTime.t =null;
        $Y.time(DOM,startTime)

    };
    //服务时间
    Y.useTimeYaodingT=null;
    Y.useTimeYaoding =function(DOM,startTime){
        clearInterval(Y.useTimeYaodingT);
        if(startTime){
            var hh= startTime.substr(0,2)
                ,mm = startTime.substr(3,2)
                ,ss = startTime.substr(6,2)
        }else{
            var hh='00',mm='00',ss='00';
        }

        $(DOM).html(hh+':'+mm+':'+ss);
        Y.useTimeYaodingT = setInterval(function(){
            ss = parseInt(ss);
            ss++
            if(ss<10){
                ss = '0'+ss;
            }else if(ss>59){
                ss ='00';
                mm = parseInt(mm);
                mm++
                if(mm<10){
                    mm = '0'+mm;
                }else if(mm>59){
                    mm='00';
                    hh = parseInt(hh);
                    hh++;
                }
            }
            $(DOM).html(hh+':'+mm+':'+ss);
        },1000)

    };

    Y.time= function(DOM,startTime){
        if(startTime){

            var hh= startTime.substr(0,2)
                ,mm = startTime.substr(3,2)
                ,ss = startTime.substr(6,2)
        }else{
            var hh='00',mm='00',ss='00';
        }

        $(DOM).html(hh+':'+mm+':'+ss);
        Y.useTime.t = setInterval(function(){
            ss = parseInt(ss);
            ss++
            if(ss<10){
                ss = '0'+ss;
            }else if(ss>59){
                ss ='00';
                mm = parseInt(mm);
                mm++
                if(mm<10){
                    mm = '0'+mm;
                }else if(mm>59){
                    mm='00';
                    hh = parseInt(hh);
                    hh++;
                }
            }
            $(DOM).html(hh+':'+mm+':'+ss);
        },1000)
    }

    /**
     * 对日期进行格式化，
     * @param date 要格式化的日期
     * @param format 进行格式化的模式字符串
     *     支持的模式字母有：
     *     y:年,
     *     M:年中的月份(1-12),
     *     d:月份中的天(1-31),
     *     h:小时(0-23),
     *     m:分(0-59),
     *     s:秒(0-59),
     *     S:毫秒(0-999),
     *     q:季度(1-4)
     * @return String
     */
    Y.dateFormat =function (date,format){
        date = new Date(date);
        var map = {
            "M": date.getMonth() + 1, //月份
            "d": date.getDate(), //日
            "h": date.getHours(), //小时
            "m": date.getMinutes(), //分
            "s": date.getSeconds(), //秒
            "q": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };

        format = format.replace(/([yMdhmsqS])+/g, function(all, t){
            var v = map[t];
            if (v !== undefined) {
                if (all.length > 1) {
                    v = '0' + v;
                    v = v.substr(v.length - 2);
                }
                return v;
            }
            else if (t === 'y') {
                return (date.getFullYear() + '').substr(4 - all.length);
            }
            return all;
        });
        return format;
    }
    Y.template =function(source,data,options){

        var render = template.compile(source,options);
        var html = render(data);
        return html;
    };



    Y.check=function(){

    };
    //自己是否在线
    Y.check.meOnline=function(){
        //console.log('自己是否在线')

        return true;
    }

    //病人是否在线
    Y.check.patientOnline=function(){
        //console.log('病人是否在线')
        return true;
    }

    //病人是否在候诊
    Y.check.patientHuoZhen=function(){
        //console.log('病人是否在候诊')

        return true;

    }

    //flash检测
    Y.flashCheck =function(){
        function f(){
            var hasFlash=0;//是否安装了flash
            var flashVersion=0;//flash版本
            if(document.all)
            {
                var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
                if(swf) {
                    hasFlash=1;
                    var VSwf=swf.GetVariable("$version");
                    flashVersion=parseInt(VSwf.split(" ")[1].split(",")[0]);
                }
            }else{
                if (navigator.plugins && navigator.plugins.length > 0)
                {
                    var swf=navigator.plugins["Shockwave Flash"];
                    if (swf)
                    {
                        hasFlash=1;
                        var words = swf.description.split(" ");
                        for (var i = 0; i < words.length; ++i)
                        {
                            if (isNaN(parseInt(words[i]))) continue;
                            flashVersion = parseInt(words[i]);
                        }
                    }
                }
            }
            return {f:hasFlash,v:flashVersion};
        }
        var fls=f();
        if(fls.f && fls.v >10){
            console.info("您安装了flash,当前版本为: "+fls.v+".x");
        }else{
            $Y.tips('您没有安装flash');
            var html = '<div style="text-align: center;padding: 20px"><p style="font-size: 16px;"> 您浏览器无法正常使用该服务，请使用 Adobe Flash Player 11.1.0 版本以上插件 <br/>点击安装. </p>' +
                '<a href="http://www.adobe.com/go/getflashplayer"><img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash player"></a></div> '
            $('.video-box').eq(0).find('.tips').html(html)
            return html;

        }

    };

    //发送信息
    Y.postChat =function(target_id){
        var chat_content = $('#chat_content').val();
        chat_content = chat_content.replace(/\s/g,'');
        var chat_time = new Date().getTime();
        if(chat_content){
            //   var data ={chat_content:chat_content,chat_time:chat_time};
            $T.TalkMsg(chat_content,1);
            //   data = '{chat_content:'+chat_content+',chat_time:'+chat_time+'}'
            $S.sendPush('TalkMsg','0',chat_content)
            $('#chat_content').val('');


        }
    }

    //重新登录
    Y.login =function(callback){
        $.getJSON('/Home/home/isLogin',function(reg){
            if(reg.code == 40005){
                $('.dialog_w').remove();
                loginDialog =  new $Y.dialog({
                    hideHeader:'hideHeader',
                    height:'350px',
                    width:'400px',
                    content:'<div class="loading_w"><span class="icon-loading"></span>加载中...</div>',
                    callback:function(box){
                        $.ajax({
                            url:'/Application/Home/View/Public/login_dialog.html',
                            dataType:'html',
                            type:'get',
                            success:function(reg){
                                box.content(reg);
                            }
                        })
                    }
                })
            }else{
                if(typeof  callback == "function"){
                    callback()
                }


            }

        })

    }

    /**
     * 名称：加载菊花
     * 例子：$Y.loading.show();  //展开
     *      $Y.loading.hide();  //移除
     *
     * */
    var load=function(){
        this.html = '    <div id="myLoad">' +
        ' <div class="myLoad_bg"></div>' +
        ' <div class="myLoad_main show">' +
        ' <img src="/Public/home/images/load-m.gif" width="20" height="20"/>加载中... </div>' +
        ' </div>'
    }
    load.prototype.show =function(){
        $('body').append(this.html);

    };

    load.prototype.hide =function(){
        $('#myLoad .myLoad_main.show').addClass('hide');
        setTimeout(function(){
            $('#myLoad').remove();
        },300)
    };
    Y.loading = new load();

    Y.alert = function(){
    	alert("呵呵哒");
    }

    module.exports = Y;
})