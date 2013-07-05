var objectUtils = require("./objectUtils");

module.exports.multiply = function(array, property){
	return sum(array, property, function(a, b){
		return a * b;
	});
};

module.exports.sum = sum;
function sum(array, property, fn){
	if(objectUtils.isUndefined(fn)) fn = function(a, b){
		return getValue(a) + getValue(b);	
	}; 
	
	function getValue(a){
		if(objectUtils.isNumber(a)) return parseFloat(a, 10);
		else if(objectUtils.isString(a)) return a;
		else if(property in a) return parseFloat(a[property], 10);
		else throw new Error("Property '" + property + "' was not found on array's element");
	}
	
	return array.reduce(fn);
};

module.exports.removeLast = function(array){
	removeAt(array, array.length - 1);
};

module.exports.removeAt = removeAt;
function removeAt(array, index){
	array.splice(index, 1);
};

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

module.exports.chop = function(array, quantity){
	var result = [];
	
	var subArray = [];
	var count = 0;
	array.forEach(function(element){
		if(count === quantity){
			result.push(subArray);
			subArray = [];
			count = 0;
		}
		
		subArray.push(element);
		count++;
	});
	
	if(subArray.length > 0) result.push(subArray);
	
	return result;
};