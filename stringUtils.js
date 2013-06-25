var 
	numberUtils = require("./numberUtils"),
	net = require("net");

module.exports.getLink = function(text, options){
	var link = text.link(options.href);
	
	if(options.title)
		link = link.replace("href=", 'title="' + options.title + '" href=');
	
	if(options.target)
		link = link.replace("href=", 'target="' + options.target + '" href=');
	
	return link;
};

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

module.exports.isIp = function(value){
	var isIp = net.isIP(value);
	return isIp || false;
};

module.exports.shortenName = function(name, level){
	if(typeof level === "undefined") level = 0;
	
    var array = name.split(" ");
    return array.map(function(part, i){
        if(i === 0 || i === array.length - 1 || (part.length <= 3 && level === 0)) return part;
        else if(level === 0) return part.substring(0, 1).toUpperCase() + ".";
        else return "";
    }).join(" ").replace(/\s{2,}/g, " ");
};

module.exports.splitWords = function(text){
	return text.split(" ").filter(function(word){
		return word.length > 0;
	});
};
