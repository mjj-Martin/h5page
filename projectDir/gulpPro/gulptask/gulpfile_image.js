module.exports = function(gulp,plugin,config,args){
	var less         = require("gulp-less");
    var livereload   = require("gulp-livereload");
    var autoprefixer = require("gulp-autoprefixer");
    var spriter      = require("gulp-css-spriter");
    var imagemin     = require("gulp-imagemin");
    var minifyCss    = require("gulp-minify-css");
    var plumber      = require("gulp-plumber");
    var csscomb      = require("gulp-csscomb");
    var pngquant     = require("imagemin-pngquant");
	//处理图片压缩
	gulp.task('imagemin', function() {

		if(!args.file){
			console.log("请输入专题目录名称");
			return false;
		}
		var file = args.file;

	    //如果压缩图片格式有所改变，注意删除相应选项
	    return gulp.src(config.ztDir+file+"/img/*.+(jpg|png|gif|jpeg)")
	        .pipe(
	            imagemin({

	                // png图片压缩质量,1-7 默认3
	                optimizationLevel : config.image.optimizationLevel,

	                // 开启jpg压缩，默认false
	                progressive : true,

	                // 开启gif压缩，默认false
	                interlaced : true,

	                use: [pngquant({
	                	//图片压缩质量
	                	quality: config.image.quality,
	                	//图片压缩速度，默认为3 ，10最高，会有5%失真
	                	// speed: 4
	                })]
	                
	            })
	        )
	        .pipe(gulp.dest(config.ztDir+file+"/img/"))
	});

	// 创建CSS合并图
	gulp.task('spriter', function() {
	    

	    if(!args.file){
			console.log("请输入专题目录名称");
			return false;
		}
		var file = args.file;

		gulp.src(config.ztDir+args.file+"/img/*.less")
			.pipe(less())
            //处理合并图
            .pipe(spriter({
                "spriteSheet":config.ztDir+args.file+"/img/spript.png",
                "pathToSpriteSheetFromCSS":"spript.png"
            }))
            .pipe(autoprefixer({
                browser : config.css.browsers
            }))
            .pipe(csscomb())
            .pipe(minifyCss({
                compatibility: 'ie8'   
            }))
            .pipe(gulp.dest(config.ztDir+args.file+"/img/"))

	});

}