var urlUtils = require("../urlUtils");

module.exports = {
	"getSubpaths: ": function(test){
		test.deepEqual(urlUtils.getSubpaths("/this/is/a/test"), ["this",
		                                                        "this/is",
		                                                        "this/is/a",
		                                                        "this/is/a/test"]);
		test.done();
	},
	
	"getParentFolder: ": function(test){
		test.equal(urlUtils.getParentFolder(""), "");
		test.equal(urlUtils.getParentFolder("picture1.png"), "");
		test.equal(urlUtils.getParentFolder("/this/is/a/test/picture1.png"), "/test");
		test.equal(urlUtils.getParentFolder("/this/is/a/test/picture1.png", 1), "/test");
		test.equal(urlUtils.getParentFolder("/this/is/a/test/picture1.png", 2), "/a/test");
		test.equal(urlUtils.getParentFolder("/this/is/a/test/picture1.png", 3), "/is/a/test");
		test.equal(urlUtils.getParentFolder("/this/is/a/test/picture1.png", 4), "/this/is/a/test");
		test.equal(urlUtils.getParentFolder("/this/is/a/test/picture1.png", 5), "/this/is/a/test");
		test.equal(urlUtils.getParentFolder("/this/is/a/test/picture1.png", 6), "/this/is/a/test");
		
		//Outputs same results even without leading slash
		test.equal(urlUtils.getParentFolder("this/is/a/test/picture1.png"), "/test");
		test.equal(urlUtils.getParentFolder("this/is/a/test/picture1.png", 1), "/test");
		test.equal(urlUtils.getParentFolder("this/is/a/test/picture1.png", 2), "/a/test");
		test.equal(urlUtils.getParentFolder("this/is/a/test/picture1.png", 3), "/is/a/test");
		test.equal(urlUtils.getParentFolder("this/is/a/test/picture1.png", 4), "/this/is/a/test");
		test.equal(urlUtils.getParentFolder("this/is/a/test/picture1.png", 5), "/this/is/a/test");
		test.equal(urlUtils.getParentFolder("this/is/a/test/picture1.png", 6), "/this/is/a/test");
		test.done();
	},
};