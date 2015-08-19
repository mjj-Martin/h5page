module.exports = function(gulp,plugin,config,args){

    var through       = require("through-gulp")
    var fs = require("fs");


    function component(){
        // creating a stream through which each file will pass
          var stream = through(function(file, encoding,callback) {
              // do whatever necessary to process the file 
            if (file.isNull()) {

            }
            if (file.isBuffer()) {

            }
            if (file.isStream()) {
                
            }

            var fileStr = file.contents.toString();

            // function transport(){

            //     var a = arguments[0].match(/(?!<\!--\s*component:)\S+(?=\s*-->)/ig);

            //     b = a[0].toString();
            //     var b = b.split(":");

            //     var componentName = b[1];
            //     var componentStream = fs.readFileSync(config.componentDir+componentName+"/"+componentName+".tmp","utf-8");
            //     var head = "<!-- "+a[0]+" -->";
            //     var foot = "<!-- "+a[1]+" -->";
            //     // return arguments[0]+componentStream.contens.toString();
            //     return head+"\n"+componentStream+"\n"+foot;
                
            // }
            // var htmlString  = fileStr.replace(/<\!--\s+component:[^-->]*-->[\s\S]*<\!--\s+component:end\s+-->/ig,transport);
            // file.contents = new Buffer(htmlString);
            // this.push(file);

            var componentArr = fileStr.match(/<\!--\s+component:[^-->]*-->[\s\S]*<\!--\s+component:end\s+-->/ig);
                // .replace(/component\:/g,"")
                // .split(",");
            console.log(componentArr)
            callback();

        });
        // returning the file stream
        return stream;
    }

    gulp.task('buildComponent', function() {
        if(!args.file){
            console.log("请输入专题目录名称");
            return false;
        }
        gulp.src(config.ztDir+args.file+"/"+"*.html")
          .pipe(component())
          .pipe(gulp.dest(config.ztDir+args.file+"/"+"*.html"));
    });
}