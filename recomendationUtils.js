var mathUtils = require("./mathUtils");

module.exports.similarityByEuclideanDistance = function(a, b){
	//Returns a number between 0 and 1,
	return 1/(1 + mathUtils.euclideanDistance(a, b));
};

module.exports.similarityByPearsonCoefficient = function(a, b){
	//Return a number between -1 and 1
	return mathUtils.pearsonCoefficient(a, b);
};