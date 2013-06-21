var arrayUtils = require("../arrayUtils");

module.exports = {
	"insertAt: Correctly inserts value at desired position": function(test){
		var array = ["foo", "bar"];
		arrayUtils.insertAt(array, 1, "bang");
		
		test.deepEqual(array, ["foo", "bang", "bar"]);
		test.done();
	},
		
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
	},
	
	"pretty: Check that it produces the right result with default value": function(test){
		test.equal("Foo, Bar e FooBar", arrayUtils.pretty(["Foo", "Bar", "FooBar"]));
		
		test.done();
	},
	
	"pretty: Check that it produces the right result with not default value": function(test){
		test.equal("Foo, Bar and FooBar", arrayUtils.pretty(["Foo", "Bar", "FooBar"], "and"));
		
		test.done();
	},
	
	"clean: Check that right values are removed from array": function(test){
		test.deepEqual(["foo", "bar"], arrayUtils.clean(["foo", undefined, undefined, "bar", undefined], undefined));
		test.deepEqual(["this", 2, "is", "it"], arrayUtils.clean([false, "this", 2, "is", false, "it"], false));
		
		test.done();
	},

	"intersection: Check that results are correct": function(test){
		var a = [1, 2, 3, 4];
		var b = [2, 3, 4, 5];
		
		test.deepEqual(arrayUtils.intersection(b, a), [2, 3, 4]);
		test.done();
	},
	
	"intersection: Check that results are the same no matter the order of the parameters": function(test){
		var a = [1, 2, 3, 4];
		var b = [2, 3, 4, 5];
		
		test.deepEqual(arrayUtils.intersection(a, b), arrayUtils.intersection(b, a));
		test.done();
	},
	
	"toDictionary: Check that it works": function(test){
		var array = [{id: 1, name: "foo"}, {id: 2, name: "bar"}];
		test.deepEqual(arrayUtils.toDictionary(array, "id"), {"1": {id: 1, name: "foo"}, "2": {id: 2, name: "bar"}});
		
		test.done();
	},
	
	"toDictionary: Check that object gets overwritten if there is another array element with same value for the given key": function(test){
		var array = [{id: 1, name: "foo"}, {id: 2, name: "bar"}, {id: 2, name: "fuark"}];
		test.deepEqual(arrayUtils.toDictionary(array, "id"), {"1": {id: 1, name: "foo"}, "2": {id: 2, name: "fuark"}});
		
		test.done();
	}
};