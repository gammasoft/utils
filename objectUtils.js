var util = require("util");

module.exports.isUndefined = function(object){
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