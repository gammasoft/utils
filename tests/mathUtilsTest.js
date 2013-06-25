var mathUtils = require("../mathUtils");

module.exports = {
	"mod: Check that it calculates the right values": function(test){
		test.equal(mathUtils.mod("036532", [2, 3, 4, 5, 6, 7]), 4);
		test.equal(mathUtils.mod("347389", [2, 3, 4, 5, 6, 7]), 2);
		test.done();
	},
	
	"convolve: Check that convolves properly": function(test){
		test.deepEqual(mathUtils.convolve([1, 1, 1], [0.5, 2, 2.5, 1]), [0.5, 2.5, 5, 5.5, 3.5, 1]);
		test.deepEqual(mathUtils.convolve([3, 4, 5], [2, 1]), [6, 11, 14, 5]);
		test.deepEqual(mathUtils.convolve([2, -2, 1], [1, 3, 0.5, -1]), [2, 4, -4, 0, 2.5, -1]);
		test.deepEqual(mathUtils.convolve([1, 2, 3, 4], [-1, 5, 3]), [-1, 3, 10, 17, 29, 12]);
		test.deepEqual(mathUtils.convolve([1, 2], [2, 1, 1, 1]), [2, 5, 3, 3, 2]);
		test.deepEqual(mathUtils.convolve([1, 2, 3, 4, 5], [1]), [1, 2, 3, 4, 5]);
		test.done();
	},
	
	"multiplyPolynomials: Check that polynomials are multiplied properly": function(test){
		test.deepEqual(mathUtils.multiplyPolynomials([1, 1, 1], [0.5, 2, 2.5, 1]), [0.5, 2.5, 5, 5.5, 3.5, 1]);
		test.deepEqual(mathUtils.multiplyPolynomials([3, 4, 5], [2, 1]), [6, 11, 14, 5]);
		test.deepEqual(mathUtils.multiplyPolynomials([2, -2, 1], [1, 3, 0.5, -1]), [2, 4, -4, 0, 2.5, -1]);
		test.deepEqual(mathUtils.multiplyPolynomials([1, 2, 3, 4], [-1, 5, 3]), [-1, 3, 10, 17, 29, 12]);
		test.deepEqual(mathUtils.multiplyPolynomials([1, 2], [2, 1, 1, 1]), [2, 5, 3, 3, 2]);
		test.deepEqual(mathUtils.multiplyPolynomials([1, 2, 3, 4, 5], [1]), [1, 2, 3, 4, 5]);
		test.done();
	}
};