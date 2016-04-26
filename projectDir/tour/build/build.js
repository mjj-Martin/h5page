// https://github.com/shelljs/shelljs
require('shelljs/global')
env.NODE_ENV = 'production'

var path = require('path')
var config = require('../config')
var ora = require('ora')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')

var gulp = require('gulp')
var imagemin = require("gulp-imagemin")
var pngquant = require("imagemin-pngquant")

console.log(
  '  Tip:\n' +
  '  Built files are meant to be served over an HTTP server.\n' +
  '  Opening index.html over file:// won\'t work.\n'
)

var spinner = ora('building for production...')
spinner.start()

var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
rm('-rf', assetsPath)
mkdir('-p', assetsPath)
cp('-R', 'static/', assetsPath)

webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err


  // 执行图片压缩服务
  gulp.task('imagemin',function(){
    return gulp.src(config.build.assetsRoot+"/**/*.+(jpg|png|gif|jpeg)")
        .pipe(
            imagemin({
                // png图片压缩质量,1-7 默认3
                optimizationLevel : 4,
                // 开启jpg压缩，默认false
                progressive : true,
                // 开启gif压缩，默认false
                interlaced : true,
                use: [pngquant({
                    //图片压缩质量
                    quality: '65',
                    //图片压缩速度，默认为3 ，10最高，会有5%失真
                    // speed: 4
                })]
            })
        )
        .pipe(gulp.dest(config.build.assetsRoot))
  })
  gulp.run('imagemin')
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})


