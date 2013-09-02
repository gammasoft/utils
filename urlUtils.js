var path = require("path");
var sUtils = require("./stringUtils.js");

module.exports.getSubpaths = getSubpaths;
module.exports.getParentFolder = getParentFolder; 

function getParentFolder(url, level){
	if(url === "") return "";
	if(typeof level === "undefined") level = 1;
	
	url = path.dirname(url).split("/").filter(function(segment){
		return segment !== "" && segment !== ".";
	});

	if(url.length > 0){
		var index = url.length - level;
		if(index < 0) index = 0;
			
		return "/" + url.splice(index, level).join("/");
	} 
	else 
		return "";
}

function getSubpaths(path){
	var result = [];
	path = path.split("/").filter(function(segment){
		return segment !== "";
	});
	
	path.forEach(function(segment, index){
		if(index === 0) result.push(segment);
		else
			result.push(sUtils.joinUrls(result[index - 1], segment));
	});
	
	return result;
}