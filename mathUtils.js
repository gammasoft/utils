var objectUtils = require("./objectUtils");
var arrayUtils = require("./arrayUtils");

module.exports.mod = function(value, factors, divider){
	if(objectUtils.isUndefined(divider)) divider = 11;
	if(objectUtils.isUndefined(factors)) factors = arrayUtils.series(2, 9);
		
	var i = 0;
	return value.split("").reduceRight(function(last, current){
		if(i > factors.length - 1) i = 0;
		return (factors[i++] * parseInt(current, 10)) + last; 
	}, 0) % divider;
};