'use strict';

var R2 = require("R2"),
    fs = require("fs");

exports.name = 'cssrtl';
exports.desc = 'make css rtl files for cross-language layout-friendly support';

exports.register = function(commander){
    //找到所有css文件
    //替换后 在css文件旁边生成 a.rtl.css
    commander
        .option('-R', 'make css rtl files recursively', String)
        .option('-d, --dir', 'make all css files in dir to css rtl file', String)
        .action(function(){

            function swap(file){
                try{
                    var content = fis.util.read(file);
                    var output = R2.swap(content, {compress: false});
                    var BODY_reg = /((?:[\r\n\s\}]|^)body[\s]*\{)([^\}]*)(\})/ig;
                    var BODY_HAVE_reg = /(body[\s]*\{)([^\}]*?)([direction[\s]*:[\s]*rtl[\s]*;[\s]*unicode-bidi[\s]*:[\s]*embed[\s]*;[\s]*]*)(\})/ig;
                    if(BODY_HAVE_reg.test(output)){
                        output = output.replace(BODY_HAVE_reg, function(m, a, b ,c, d){
                            return (a + b + ';direction:rtl;unicode-bidi:embed;\n ' + d);
                        });
                    }else if(BODY_reg.test(output)){
                        output = output.replace(BODY_reg, function(m, a, b, c, d){
                            return (a + b + 'direction:rtl;unicode-bidi:embed;\n' + c);
                        });
                    }
                    var newfile = file.substring(0, file.length - 3) + 'rtl.css';
                    fis.util.write(newfile, output);
                }catch(e){
                    fis.log.error(e);
                }
            };

            function processFile(file){
                if((/\.css$/i).test(file) && !(/\.rtl\.css$/i).test(file)){
                    process.stdout.write('\n Ω '.green.bold);
                    process.stdout.write('.');
                    swap(file);
                    process.stdout.write('\n');
                }else{
                    fis.log.error("please input css file path");
                }
            };

            function processDir(dir){
                if(commander.R){
                    var files = fis.util.find(dir, /\.css$/i, /\.rtl\.css$/i);
                }else{
                    var files = [];
                    fs.readdirSync(dir).forEach(function(p){
                        if(p[0] != '.') {
                            var file = dir + '/' + p;
                            if(fis.util.isFile(file) && (/\.css$/i).test(file) && !(/\.rtl\.css$/i).test(file)){
                                files.push(file);
                            }
                        }
                    });
                }
                process.stdout.write('\n Ω '.green.bold);
                files.forEach(function(file){
                    process.stdout.write('.');
                    swap(file);
                });
                process.stdout.write('\n');
            };

            var args = Array.prototype.slice.call(arguments);
            if(args.length >= 1 && typeof args[0] == "string"){
                var dir = fis.util.realpath(args[0]);
                if(fis.util.isDir(dir)){
                    processDir(dir);
                }else if(fis.util.isFile(dir)){
                    processFile(dir);
                }else{
                    fis.log.error("please input valid dir or path");
                }
            }else{
                var dir = fis.util.realpath(process.cwd());
                processDir(dir);
            }
        });
};




