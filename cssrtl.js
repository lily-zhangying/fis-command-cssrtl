'use strict';

var R2 = require("R2");

exports.name = 'cssrtl';
exports.desc = 'make css rtl files for cross-language layout-friendly support';

exports.register = function(commander){
    //找到所有css文件
    //替换后 在css文件旁边生成 a.rtl.css
    commander
        .option('--file', 'make a single css rtl file', String)
        .option('--root', 'make ', String)
	 	.action(function(){
	 		function swap(file){
	 			try{
	 				console.log(file);
 					var output = R2.swap(fis.util.read(file));
					var newfile = file.substring(0, file.length - 3) + 'rtl.css';
					console.log(newfile);
					fis.util.write(newfile, output);
	 			}catch(e){
	 				fis.log.error(e);
	 			}
	 		};

			var args = Array.prototype.slice.call(arguments);
			if(commander.file){
				if(args.length >= 1 && typeof args[0] == "string"){
					var file = fis.util.realpath(args[0]);
					if((/\.css/i).test(file) && (/\.rtl\.css/i).test(file)){
						swap(file);
					}else{
						fis.log.error("please input css file path");
					}
				}else{
					fis.log.error("please input css file path");
				}
			}else{
				var dir = fis.util.realpath(process.cwd());
				if(commander.root && args.length >= 1 && typeof args[0] == "string"){
					dir = fis.util.realpath(args[0]);
				}
				var files = fis.util.find(dir, /\.css$/i, /\.rtl\.css$/i);
				files.forEach(function(file){
					swap(file);
				});
			}
	 	});
};




