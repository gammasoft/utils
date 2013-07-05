var util = require("util");

module.exports.values = function(object){
	if(!isObject(object) || isArray(object))
		throw new Error("Invalid parameter");
	
	var values = [];
	for(key in object) 
		if(object.hasOwnProperty(key))
			values.push(object[key]);
	
	return values;
};

module.exports.keys = function(object){
	if(!isObject(object) || isArray(object))
		throw new Error("Invalid parameter");
	
	var keys = [];
	for(key in object) 
		if(object.hasOwnProperty(key))
			keys.push(key);
	
	return keys;
};

module.exports.isUndefined = isUndefined; 
function isUndefined(object){
	return typeof object === typeof undefined;
};

module.exports.isObject = isObject;
function isObject(object){
	return typeof object === "object";
};

module.exports.isArray = isArray;
function isArray(object){
	return util.isArray(object); 
};

module.exports.isEmpty = function(object){
	if(typeof object !== "object") return false;
	
    for(var prop in object)
    	if(object.hasOwnProperty(prop)) return false;

    return true;
};

module.exports.isBoolean = function(object) {
	return typeof object === "boolean";
};

module.exports.isString = function(object) {
	return typeof object === "string";
};

module.exports.isNumber = function(object) {
	return !isNaN(parseFloat(object)) && isFinite(object);
};

module.exports.argsToArray = function(args, startingFrom){
	if(isUndefined(startingFrom)) startingFrom = 0;
	
	return Array.prototype.slice.call(args, startingFrom);
};