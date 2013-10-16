var utils = require("../index");

module.exports = {
	"Checks that every submodule is available": function(test){
		test.ok(utils.array);
		test.ok(utils.console);
		test.ok(utils.crypto);
		test.ok(utils.math);
		test.ok(utils.number);
		test.ok(utils.object);
		test.ok(utils.string);
		test.ok(utils.url);
		test.ok(utils.validation);
		
		test.done();
	}
};