var util = require("util");

module.exports.isUndefined = isUndefined; 
function isUndefined(object){
	return typeof object === typeof undefined;
};

module.exports.isArray = function(object){
	return util.isArray(object); 
};

module.exports.isEmpty = function(object){
	if(typeof object !== "object") return false;
	
    for(var prop in object)
    	if(object.hasOwnProperty(prop)) return false;

    return true;
};

module.exports.isNumber = function(object) {
	return !isNaN(parseFloat(object)) && isFinite(object);
};

module.exports.argsToArray = function(args, startingFrom){
	if(isUndefined(startingFrom)) startingFrom = 0;
	
	return Array.prototype.slice.call(args, startingFrom);
};