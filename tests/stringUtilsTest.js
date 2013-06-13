var stringUtils = require("../stringUtils");

module.exports = {
	"getRandomString: Check length of string": function(test){
		test.ok(stringUtils.getRandomString(10).length === 10);
		test.ok(stringUtils.getRandomString(5).length === 5);
		test.done();
	},
	
	"getRandomString: Check that string contains only numbers": function(test){
		test.ok(/^\d+$/.test(stringUtils.getRandomString(5, "1234567890")));
		test.ok(/^\d+$/.test(stringUtils.getRandomString(5, "1234567890")));
		test.ok(/^\d+$/.test(stringUtils.getRandomString(5, "1234567890")));
		test.ok(/^\d+$/.test(stringUtils.getRandomString(5, "1234567890")));
		test.ok(/^\d+$/.test(stringUtils.getRandomString(5, "1234567890")));
		test.ok(/^\d+$/.test(stringUtils.getRandomString(5, "1234567890")));
		test.ok(/^\d+$/.test(stringUtils.getRandomString(5, "1234567890")));
		test.ok(/^\d+$/.test(stringUtils.getRandomString(5, "1234567890")));
		test.ok(/^\d+$/.test(stringUtils.getRandomString(5, "1234567890")));
		test.ok(/^\d+$/.test(stringUtils.getRandomString(5, "1234567890")));
		
		test.done();
	}
};