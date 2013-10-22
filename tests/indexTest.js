var fs = require("fs");
var utils = require("../index");

module.exports = {
	"Checks that every submodule is available": function(test){
		fs.readdirSync(__dirname + "/..").forEach(function(file){
			var match = file.match(/(.*)Utils.js/);
			
			if(match){
				console.log(match[1] + " / " + typeof utils[match[1]]);
				test.ok(utils[match[1]]);
			}
		});
		
		test.done();
	}
};