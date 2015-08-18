

var gulp         = require("gulp");
var less         = require("gulp-less");
var livereload   = require("gulp-livereload");
var autoprefixer = require("gulp-autoprefixer");
var spriter      = require("gulp-css-spriter");
var imagemin     = require("gulp-imagemin");
var minifyCss    = require("gulp-minify-css");
var connect      = require("gulp-connect");
var plumber      = require("gulp-plumber");
var csscomb      = require("gulp-csscomb");
var pngquant     = require("imagemin-pngquant");

var js  = "js/";
var img = "images/";
var css = "css/"

//处理图片压缩
gulp.task('imagemin', function() {
    //如果压缩图片格式有所改变，注意删除相应选项
    return gulp.src(img+'*.+(jpg|png|gif|jpeg)')
        //图片加入缓存，只对发生修改的图片进行处理
        .pipe(     
            imagemin({

                // png图片压缩质量,1-7 默认3
                optimizationLevel : 3,

                // 开启jpg压缩，默认false
                progressive : true,

                // 开启gif压缩，默认false
                interlaced : true,

                use: [pngquant({
                	//图片压缩质量
                	// quality: '65-80',
                	//图片压缩速度，默认为3 ，10最高，会有5%失真
                	// speed: 4
                })]
                
            })
        )
        .pipe(gulp.dest(img))

});

//构建css
gulp.task('css', function() {

    gulp.src(img+"*.+(less|css)")
        .pipe(plumber())
        .pipe(less())
        //处理合并图
        .pipe(spriter({

            //存储路径
            "spriteSheet":img+"spript.png",

            //合并图命名
            "pathToSpriteSheetFromCSS":"spript.png"

            //检查是否一定存在雪碧图
            // "shouldVerifyImagesExist" : false
        }))
        //添加前缀，选择版本号
    	.pipe(autoprefixer("last 3 version"))
        //css属性排列
        .pipe(csscomb())
        //css压缩
        .pipe(minifyCss({
            //兼容IE8写法
            compatibility: 'ie8'   
        }))
        .pipe(header(eTime))
    	.pipe(gulp.dest(img))
    	.pipe(livereload());
});

//建立服务器
gulp.task('webserver', function() {
    connect.server({
        livereload:true

        // 设置服务器根目录
        //root: "./../../",

        // 是否开启https,默认false
        // https : true,
        
        // 修改端口 
        port : 8081,
         
        // 修改host
        // host : "www.aipai.com"
         
        // 代理模式 proxies
        // {source: '/abc', target: 'http://localhost:8080/abc', options: {headers: {'ABC_HEADER': 'abc'}}}
        // proxies ：ARRAY

    });
});

gulp.task('watch',["webserver"], function() {
    // 创建监听任务
    livereload.listen();
  	gulp.watch(img+'/*.less', ['css']);
  	// 监听js和html文件变化
  	gulp.watch([app+"**/*.html",js+"**/*.js"], function (file) {
        livereload.changed(file.path);
    });
});


gulp.task('default',["css","imagemin"]);
