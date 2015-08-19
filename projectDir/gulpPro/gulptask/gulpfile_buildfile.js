module.exports = function(gulp,plugin,config,args){

	// 创建专题目录
	gulp.task('buildDir', function() {
	    // 创建专题基础目录结构
	    var type;
	    if(!args.type){
	    	type = "basePC";
	    }else{
	    	type = args.type.match(/pc/i) ? "basePC" : "baseMobile";
	    }
	    if(!args.file){
	    	console.log("请输入专题目录名称");
	    	return false;
	    }
	    gulp.src([config.componentDir+type+"/**/*.*"])
	      .pipe(gulp.dest(config.ztDir+args.file+"/"));
	});
	var connect      = require("gulp-connect");
	var livereload = require("gulp-livereload");
	var open = require("child_process");
	//建立服务器
	gulp.task('webserver', function() {
	    connect.server({
	        livereload:true,
	        
	        root: config.http.root

	        // 是否开启https,默认false
	        // https : true,
	        
	        // 修改端口 
	        // port : 8080,
	         
	        // 修改host
	        // host : "www.aipai.com"
	         
	        // 代理模式 proxies
	        // {source: '/abc', target: 'http://localhost:8080/abc', options: {headers: {'ABC_HEADER': 'abc'}}}
	        // proxies ：ARRAY
	    });
	    var ztYear = config.ztDir.replace(/\D/,"");
	    open.exec("start http://localhost:8080/zt"+ztYear+args.file+"/_index.html");
	});
	

	gulp.task('watch',["webserver"], function() {

		if(!args.file){
			console.log("请输入目录名称");
			return false;
		}

	    livereload.listen();

	    gulp.watch(config.ztDir+args.file+"/img/*.less", ['css']);
	  	// 监听js和html文件变化
	  	gulp.watch([config.ztDir+args.file+"/*.html",config.ztDir+args.file+"/**/*.js"], function (file) {
	        livereload.changed(file.path);
	    });

	});

}