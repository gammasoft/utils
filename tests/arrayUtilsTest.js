var arrayUtils = require("../arrayUtils");

module.exports = {
	"series: Check that array is created in correct ascending order": function(test){
		test.deepEqual(arrayUtils.series(0, 10), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
		test.deepEqual(arrayUtils.series(-2, 2), [-2, -1, 0, 1, 2]);
		test.deepEqual(arrayUtils.series(-10, -5), [-10, -9, -8, -7, -6, -5]);
		
		test.done();
	},

	"series: Check that array is created in correct descending order": function(test){
		test.deepEqual(arrayUtils.series(10, 0), [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]);
		test.deepEqual(arrayUtils.series(2, -2), [2, 1, 0, -1, -2]);
		test.deepEqual(arrayUtils.series(-5, -10), [-5, -6, -7, -8, -9, -10]);
		
		test.done();
	}
};