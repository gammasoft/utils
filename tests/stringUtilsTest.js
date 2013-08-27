var stringUtils = require("../stringUtils");

module.exports = {
	"findPrefix: Returns expected results": function(test){
	
		var data = [
		            "Metallica - Ride The Lightning",
		            "Metallica - Master Of Puppets",
		            "Metallica - ...And Justice For All",
		            ];
		
		test.equal(stringUtils.findPrefix(data), "Metallica - ");
		
		var data = [
		            "1234",
		            "1235",
		            "12",
		            ];
		
		test.equal(stringUtils.findPrefix(data), "12");
		
		test.done();
	},
	
	"removePrefix: Returns expected results": function(test){
		
		var data = [
		            "Metallica - Ride The Lightning",
		            "Metallica - Master Of Puppets",
		            "Metallica - ...And Justice For All"
		            ];
		
		test.deepEqual(stringUtils.removePrefix(data), [
														"Ride The Lightning",
														"Master Of Puppets",
														"...And Justice For All"
		                                              ]);
		
		var data = [
		            "1234",
		            "1235",
		            "12",
		            ];
		
		test.deepEqual(stringUtils.removePrefix(data), ["34", "35", ""]);
		
		test.done();
	},
		
	"startWith: Returns expected results": function(test){
		test.ok(stringUtils.startsWith("startsWith", "starts"));
		test.done();
	},		
		
	"endsWith: Returns expected results": function(test){
		test.ok(stringUtils.endsWith("endsWith", "With"));
		test.done();
	},		
	
	"getUrlSubpaths: Returns expected results": function(test){
		test.deepEqual(stringUtils.getUrlSubpaths("/this/is/a/good/test/"), [
		                                                                   "this",
		                                                                   "this/is",
		                                                                   "this/is/a",
		                                                                   "this/is/a/good",
		                                                                   "this/is/a/good/test",
		                                                                   ]);
		test.done();
	},
	
	"joinUrls: Returns expected results": function(test){
		test.equal(stringUtils.joinUrls("", "/is/good"), "/is/good");
		test.equal(stringUtils.joinUrls("/testing", ""), "/testing");
		test.equal(stringUtils.joinUrls("/testing", "/is/good"), "/testing/is/good");
		test.equal(stringUtils.joinUrls("/testing/", "/is/good"), "/testing/is/good");
		test.equal(stringUtils.joinUrls("/testing/", "is/good"), "/testing/is/good");
		test.equal(stringUtils.joinUrls("/testing", "is/good"), "/testing/is/good");
		test.done();
	},	
		
	"nextSizeType: Returns expected results": function(test){
		test.equal(stringUtils.nextSizeType("b"), "Kb");
		test.equal(stringUtils.nextSizeType("Kb"), "Mb");
		test.equal(stringUtils.nextSizeType("Mb"), "Gb");
		test.equal(stringUtils.nextSizeType("Gb"), "Tb");
		test.equal(stringUtils.nextSizeType("Tb"), "Pb");
		test.equal(stringUtils.nextSizeType("Pb"), "Pb");
		test.done();
	},	
	
	"nextSizeType: Returns null if not expected value is passed": function(test){
		test.equal(stringUtils.nextSizeType("thisIsNotValid"), null);
		test.equal(stringUtils.nextSizeType("fooBar"), null);
		test.equal(stringUtils.nextSizeType("123"), null);
		test.equal(stringUtils.nextSizeType("asdfg"), null);
		test.done();
	},	
	
	"formatFileSize: Formats as expected": function(test){
		
		test.equal(stringUtils.formatFileSize(500, "b"), "500.00b");
		test.equal(stringUtils.formatFileSize(500, "b", 0), "500b");
		test.equal(stringUtils.formatFileSize(1024, "b", 2), "1.00Kb");
		test.equal(stringUtils.formatFileSize(1024, "b"), "1.00Kb");
		test.equal(stringUtils.formatFileSize(2048, "b", 3), "2.000Kb");
		test.equal(stringUtils.formatFileSize(2013, "Mb", 4), "1.9658Gb");
		test.equal(stringUtils.formatFileSize(2912, "Gb", 5), "2.84375Tb");
		test.equal(stringUtils.formatFileSize(1025, "Tb", 1), "1.0Pb");
		test.equal(stringUtils.formatFileSize(2048, "Pb", 0), "2048Pb");
		test.done();
	},
		
	"parseSequence: Correctly parses a sequence (segment length can be number string)": function(test){
		var sd = {
			"Valor Fixo": 3,	
			"Codigo da Uf": 2,
			"AAMM da Emissao": "4",
			"CNPJ do Emitente": 14,
			"Modelo": 2,
			"Serie": "3", 
			"Numero da NFe": 9,
			"Codigo Numerico": "9",
			"DV": 1
		};
		
		stringUtils.parseSequence("NFe52110200132781000178550010000005480000005481", sd);
		
		test.equal(sd["Valor Fixo"], "NFe");
		test.equal(sd["Codigo da Uf"], "52");
		test.equal(sd["AAMM da Emissao"], "1102");
		test.equal(sd["CNPJ do Emitente"], "00132781000178");
		test.equal(sd["Modelo"], "55");
		test.equal(sd["Serie"], "001");
		test.equal(sd["Numero da NFe"], "000000548");
		test.equal(sd["Codigo Numerico"], "000000548");
		test.equal(sd["DV"], "1");
		test.done();
	},
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