'use strict';

var R2 = require("R2");

exports.name = 'cssrtl';
exports.desc = 'make css rtl files for cross-language layout-friendly support';

exports.register = function(commander){
    //找到所有css文件
    //替换后 在css文件旁边生成 a.rtl.css
    commander
        .option('-f, --file', 'make a single css rtl file', String)
        .option('-r, --root', 'make all css files in root path to css rtl file', String)
	 	.action(function(){

	 		function swap(file){
	 			try{
 					var output = R2.swap(fis.util.read(file));
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
				var files = fis.util.find(dir, /\.css$/i, /\.rtl\.css$/i);
				process.stdout.write('\n Ω '.green.bold);
				files.forEach(function(file){
					process.stdout.write('.');
					swap(file);
				});
				process.stdout.write('\n');
	 		};

			var args = Array.prototype.slice.call(arguments);
			if(commander.file){
				if(args.length >= 1 && typeof args[0] == "string"){
					processFile(fis.util.realpath(args[0]));
				}else{
					fis.log.error("please input css file path");
				}
			}else{
				var dir = fis.util.realpath(process.cwd());
				if(args.length >= 1 && typeof args[0] == "string"){
					dir = fis.util.realpath(args[0]);
				}
				if(fis.util.isDir(dir)){
					processDir(dir);
				}else if(fis.util.isFile(dir)){
					processFile(dir);
				}else{
					fis.log.error("please input valid dir or path");
				}
			}
	 	});
};




