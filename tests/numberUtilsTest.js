var numberUtils = require("../numberUtils");

module.exports = {
	"getRandomInteger: Check that number is between given range": function(test){
		var random = numberUtils.getRandomInteger(0, 10);
		
		test.ok(random >= 0);
		test.ok(random <= 10);
		test.done();
	},
	
	"getRandomInteger: Check that number range is inclusive": function(test){
		var random = numberUtils.getRandomInteger(0, 1);
		
		test.ok(random === 0 || random === 1);
		test.done();
	}
};