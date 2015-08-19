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

    gulp.task('css', function() {
        
        gulp.src(config.ztDir+args.file+"/**/*.less")
            .pipe(plumber())
            .pipe(less())
            //处理合并图
           // .pipe(spriter({
           //      "spriteSheet":"spript.png",
           //      "pathToSpriteSheetFromCSS":config.ztDir+args.file+"/img/spript.png"
           //  }))
            .pipe(autoprefixer({
                browser : config.css.browsers
            }))
            .pipe(csscomb())
            .pipe(minifyCss({
                compatibility: 'ie8'   
            }))
            .pipe(gulp.dest(config.ztDir+args.file+"/"))
            .pipe(livereload());
    });

}