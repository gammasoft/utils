var numberUtils = require("./numberUtils");

module.exports.getRandomString = function(length, chars) {
	if(typeof chars === "undefined")
		chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%ˆ&*()-=+';
	
	var result = '';
	while (length > 0) {
		result += chars[numberUtils.getRandomInteger(0, chars.length - 1)];
		length--;
	}

	return result;
};