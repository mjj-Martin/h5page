var gulp = require('gulp')
var imagemin = require("gulp-imagemin")
var pngquant = require("imagemin-pngquant")
var config = require('../config')
// 执行图片压缩服务
gulp.task('imagemin',function(){
    console.log(config.build.assetsRoot+"测试")
    return gulp.src(config.build.assetsRoot+"/**/*.+(jpg|png|gif|jpeg)")
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
                    quality: '65-80',
                    //图片压缩速度，默认为3 ，10最高，会有5%失真
                    // speed: 4
                })]
                
            })
        )
        .pipe(gulp.dest(config.build.assetsRoot))
  })