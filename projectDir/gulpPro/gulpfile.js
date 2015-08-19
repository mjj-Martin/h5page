
var gulp         = require("gulp");
var plugin       = require("gulp-load-plugins");
var config       = require("./gulptask/gulpfile_config.js")();
var args         = require("yargs").argv;


require("./gulptask/gulpfile_js.js")(gulp,plugin,config,args);
require("./gulptask/gulpfile_html.js")(gulp,plugin,config,args);
require("./gulptask/gulpfile_css.js")(gulp,plugin,config,args);
require("./gulptask/gulpfile_image.js")(gulp,plugin,config,args);
require("./gulptask/gulpfile_buildfile.js")(gulp,plugin,config,args);
