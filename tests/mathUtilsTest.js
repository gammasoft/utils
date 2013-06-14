var mathUtils = require("../mathUtils");

module.exports = {
	"mod: Check that it calculates the right values": function(test){
		test.equal(mathUtils.mod("036532", [2, 3, 4, 5, 6, 7]), 4);
		test.equal(mathUtils.mod("347389", [2, 3, 4, 5, 6, 7]), 2);
		test.done();
	}
};