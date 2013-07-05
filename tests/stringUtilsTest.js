var stringUtils = require("../stringUtils");

module.exports = {
		
	"onlyLettersAndNumbers: Check that only contains letters and numbers": function(test){
		test.ok(stringUtils.onlyLettersAndNumbers("AaBbCc1872817873aodsiufh"));
		test.ok(stringUtils.onlyLettersAndNumbers("AOIUHAoiuhi3429876492iuyegfwuadiu"));
		
		test.equal(stringUtils.onlyLettersAndNumbers("abcdefgh_32234"), false);
		test.equal(stringUtils.onlyLettersAndNumbers("!@#$%ˆ&*()"), false);
		test.equal(stringUtils.onlyLettersAndNumbers("{}|{}|\":A\": çdc"), false);
		
		test.done();
	},
	
	"onlyLettersAndNumbers: Check that only contains letters and numbers of a given size": function(test){
		test.ok(stringUtils.onlyLettersAndNumbers("abc123", "6"));
		test.ok(stringUtils.onlyLettersAndNumbers("abc123", 6));
		test.ok(stringUtils.onlyLettersAndNumbers("abcedfghi", "9"));
		test.ok(stringUtils.onlyLettersAndNumbers("abcedfghi", 9));
		test.ok(stringUtils.onlyLettersAndNumbers("", "*"));
		test.ok(stringUtils.onlyLettersAndNumbers("1", "+"));
		test.ok(stringUtils.onlyLettersAndNumbers("a", "+"));
		test.ok(stringUtils.onlyLettersAndNumbers("1324wef234efwga", "+"));
		
		test.equal(stringUtils.onlyLettersAndNumbers("", "+"), false);
		test.equal(stringUtils.onlyLettersAndNumbers("123asd", "1"), false);
		test.equal(stringUtils.onlyLettersAndNumbers("{}|{}|\":A\": çdc", "5"), false);
		
		test.done();
	},
		
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
	},
	
	"splitWords: Check no whitespace characters are included": function(test){
		test.deepEqual(["This", "is", "the", "expected", "result"], stringUtils.splitWords(" This   is the    expected        result    "));
		
		test.done();
	},
	
	"getLink: Generates a proper link": function(test){
		test.equal('<a href="/test.html">test</a>', stringUtils.getLink("test", {href: "/test.html"}));
		
		test.equal('<a title="The Title" href="/test.html">test</a>', stringUtils.getLink("test", {
			href: "/test.html",
			title: "The Title"
		}));
		
		test.equal('<a target="_blank" href="/test.html">test</a>', stringUtils.getLink("test", {
			href: "/test.html",
			target: "_blank"
		}));
		
		test.equal('<a title="The Title" target="_blank" href="/test.html">test</a>', stringUtils.getLink("test", {
			href: "/test.html",
			title: "The Title",
			target: "_blank"
		}));
		
		test.done();
	}
};