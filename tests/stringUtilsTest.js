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
	},
	
	"shortenName: Check that names are properly shortened with level 0": function(test){
		test.equal("Elizabeth C. Finnegan", stringUtils.shortenName("Elizabeth Claire Finnegan"));
		test.equal("Hannah J. Whittaker", stringUtils.shortenName("Hannah Jocelyn Whittaker"));
		test.equal("Madeline Eve Cooper", stringUtils.shortenName("Madeline Eve Cooper"));
		test.equal("Alyssa Marie", stringUtils.shortenName("Alyssa Marie"));
		test.equal("Catherine F. M. C. Galon", stringUtils.shortenName("Catherine Françoise Marie Christine Galon"));
		test.equal("Armand-Jean Du Plessis", stringUtils.shortenName("Armand-Jean Du Plessis"));
		 
		test.done();
	},
	
	"shortenName: Check that names are properly shortened with level 1": function(test){
		test.equal("Elizabeth Finnegan", stringUtils.shortenName("Elizabeth Claire Finnegan", 1));
		test.equal("Hannah Whittaker", stringUtils.shortenName("Hannah Jocelyn Whittaker", 1));
		test.equal("Madeline Cooper", stringUtils.shortenName("Madeline Eve Cooper", 1));
		test.equal("Alyssa Marie", stringUtils.shortenName("Alyssa Marie", 1));
		test.equal("Catherine Galon", stringUtils.shortenName("Catherine Françoise Marie Christine Galon", 1));
		test.equal("Armand-Jean Plessis", stringUtils.shortenName("Armand-Jean Du Plessis", 1));
		
		test.done();
	}
};