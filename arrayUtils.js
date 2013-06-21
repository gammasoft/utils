var objectUtils = require("./objectUtils");

module.exports.insertAt = function(array, index, element){
	array.splice(index, 0, element);
};

module.exports.series = function(from, to){
	var params = [from, to];
	if(from > to) params = [to, from];
	
	var result = [];
	while(params[0] <= params[1])
		result.push(params[0]++);
	
	return from > to ? result.reverse() : result;
};

module.exports.pretty = function(array, lastSeparator){
	if(objectUtils.isUndefined(lastSeparator)) lastSeparator = "e";
	
	return array.toString().replace(/,/g, ", ").replace(/,\s([^,]+)$/, " " + lastSeparator + " $1");
};


module.exports.clean = function(array, deleteValue) {
	for (var i = 0; i < array.length; i++) {
		if (array[i] == deleteValue) {         
			array.splice(i, 1);
			i--;
		}
	}
	
	return array;
};

module.exports.intersection = function(a, b){
    return b.filter(function(element){
        return a.indexOf(element) !== -1;
    });
};

module.exports.toDictionary = function(array, key){
	var result = {};
	array.forEach(function(element){
		result[element[key]] = element;
	});
	
	return result;
};