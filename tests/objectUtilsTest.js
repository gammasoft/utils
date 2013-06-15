var objectUtils = require("../objectUtils");

module.exports = {
	"isUndefined: Check if isUndefined works as expected": function(test){
		test.ok(objectUtils.isUndefined(undefined));
		test.ok(objectUtils.isUndefined(void 0));
		test.equal(objectUtils.isUndefined(100), false);
		
		test.done();
	},
	
	"isArray: Check that it detects arrays": function(test){
		test.ok(objectUtils.isArray([]));
		test.equal(objectUtils.isArray({}), false);
		test.equal(objectUtils.isArray("this is not an array"), false);
		
		test.done();
	},
	
	"isEmpty: Check that if detects empty objects": function(test){
		test.ok(objectUtils.isEmpty({}));
		test.ok(objectUtils.isEmpty(new function(){ }));
		test.ok(objectUtils.isEmpty(new Object()));
		
		test.done();
	},
	
	"isEmpty: Check that if detects non empty objects": function(test){
		test.equal(objectUtils.isEmpty({ a: 1, b: 2 }), false);
		test.equal(objectUtils.isEmpty(new function(){ this.number = 42; }), false);
		
		test.done();
	},
	
	"isNumber: Check that it detects regular numbers": function(test){
		test.ok(objectUtils.isNumber(1234.45));
		test.ok(objectUtils.isNumber(121343.34));
		test.ok(objectUtils.isNumber(Number.MAX_VALUE));
		test.ok(objectUtils.isNumber(Number.MIN_VALUE));
		
		test.done();
	},
	
	"isNumber: Check that it detects numbers in strings": function(test){
		test.ok(objectUtils.isNumber("123"));
		test.ok(objectUtils.isNumber("123.234"));
		test.ok(objectUtils.isNumber("121343.34"));
		test.ok(objectUtils.isNumber("1.7976931348623157e+308"));
		test.ok(objectUtils.isNumber("5e-324"));
		
		test.done();
	},
	
	"isNumber: Check that it rejects non numbers": function(test){
		test.equal(objectUtils.isNumber(""), false);
		test.equal(objectUtils.isNumber(1/0), false);
		test.equal(objectUtils.isNumber("1,89"), false);
		test.equal(objectUtils.isNumber("12345.2345.656"), false);
		
		test.done();
	}
};