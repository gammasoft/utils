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

module.exports.convolve = convolve;
module.exports.multiplyPolynomials = convolve;

function convolve(signal1, signal2){
    var signal1Length = signal1.length;
    var signal2Length = signal2.length;
    var finalSize = signal1Length + signal2Length - 1;

    var result = new Array(finalSize);

    for (var i = 0; i < finalSize; i++) {
        result[i] = 0;

        for (var j = 0; j < signal2Length; j++) {
            if(i - j < 0) continue;
            if(i - j >= signal1Length) continue;

            result[i] += signal2[j] * signal1[i - j];
        }
    }

    return result;
}