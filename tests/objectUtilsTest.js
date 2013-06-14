var objectUtils = require("../objectUtils");

module.exports = {
	"isUndefined: Check if isUndefined works as expected": function(test){
		test.ok(objectUtils.isUndefined(undefined));
		test.ok(objectUtils.isUndefined(void 0));
		test.equal(objectUtils.isUndefined(100), false);
		
		test.done();
	}
};