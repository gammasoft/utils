var mathUtils = require("./mathUtils");

module.exports.similarity = function(a, b){
	//Returns a number between 0 and 1,
	//1 mean completely similar
	//0 means they have nothing in common
	return 1/(1 + mathUtils.euclideanDistance(a, b));
}; 