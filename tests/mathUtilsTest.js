var mathUtils = require("../mathUtils");

module.exports = {
	"euclideanDistance: Check that calculation can be done with 'n' domensions and that they yield right result": function(test){
		test.equal(mathUtils.euclideanDistance({x: 5, y: 4}, {x: 4, y: 1}), 3.1622776601683795);
		test.equal(mathUtils.euclideanDistance({"x axis": 2, "y axis": 5}, {"x axis": 3, "y axis": 4}), 1.4142135623730951);
		test.equal(mathUtils.euclideanDistance({i: 2, j: 4, w: 5}, {i: 3, j: 3, w: 3}), 2.449489742783178);
		test.equal(mathUtils.euclideanDistance({a: 10}, {a: 8}), 2);
		test.equal(mathUtils.euclideanDistance({a: 8}, {a: 10}), 2);
		test.equal(mathUtils.euclideanDistance({a: 8, b: 10}, {a: 10}), 2);
		test.equal(mathUtils.euclideanDistance({a: 8}, {a: 10, b: 10}), 2);
		test.equal(mathUtils.euclideanDistance({}, {}), 0);
		test.equal(mathUtils.euclideanDistance(null, null), 0);
		test.equal(mathUtils.euclideanDistance({a: 8}, null), 0);
		
		test.done();
	},	
		
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
	},
	
	"solve: Solves simple equations": function(test){
		//Available functions in `Math`
		//Math.E                     Math.LN10                  Math.LN2                   Math.LOG10E                Math.LOG2E                 Math.PI                    Math.SQRT1_2               Math.SQRT2                 Math.abs                   Math.acos                  Math.asin                  Math.atan                  Math.atan2
		//Math.ceil                  Math.cos                   Math.exp                   Math.floor                 Math.log                   Math.max                   Math.min                   Math.pow                   Math.random                Math.round                 Math.sin                   Math.sqrt                  Math.tan
		
		test.equal(mathUtils.solve('round(test / 2)', { test: 5 }), 3);
		test.equal(mathUtils.solve('floor(test / 2)', { test: 5 }), 2);
		test.equal(mathUtils.solve('2 + 2'), 4);
		test.equal(mathUtils.solve('cos(PI)'), -1);
		test.done();
	}
};