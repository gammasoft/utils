var 
	accentMap = require("./accentMap"), 
	numberUtils = require("./numberUtils"),
	net = require("net");

module.exports.generateGuid = generateGuid; 
function generateGuid(separators){
    if(typeof separators === "undefined") separators = true;
 
    var S4 = function (){
        return Math.floor(Math.random() * 0x10000).toString(16);
    };
 
    return (S4() + S4() + (separators? "-" : "") +
            S4() + (separators ? "-" : "") +
            S4() + (separators ? "-" : "") +
            S4() + (separators ? "-" : "") +
            S4() + S4() + S4());
};

//this algorithm was taken from underscore.string module
//all credits to them
module.exports.pad = pad;
function pad(str, length, padStr, type) {
	str = str == null ? '' : String(str);
	length = ~~length;

	var padlen  = 0;

	if (!padStr)
		padStr = ' ';
	else if (padStr.length > 1)
		padStr = padStr.charAt(0);

	switch(type) {
		case 'right':
			padlen = length - str.length;
			return str + strRepeat(padStr, padlen);
		case 'both':
			padlen = length - str.length;
			return strRepeat(padStr, Math.ceil(padlen/2)) + str
                  + strRepeat(padStr, Math.floor(padlen/2));
		default: // 'left'
			padlen = length - str.length;
			return strRepeat(padStr, padlen) + str;
	}
	
	function strRepeat(str, qty){
		if (qty < 1) return '';
		var result = '';
		while (qty > 0) {
			if (qty & 1) result += str;
				qty >>= 1, str += str;
			}
		
		return result;
	};
}

module.exports.removeDiacritics = removeDiacritics;
function removeDiacritics(string) {
	if (!string) return '';
  
  	var result = '';
  	for (var i = 0; i < string.length; i++) {
  		result += accentMap[string.charAt(i)] || string.charAt(i);
  	}
  
  	return result;
};

module.exports.reverseString = reverseString; 
function reverseString(string){
	return string.split("").reverse().join("");
}

module.exports.findSuffix = findSuffix;
function findSuffix(strings, prefix){
	var reversed = [];
	strings.forEach(function(string){
		reversed.push(reverseString(string));
	});
	
	return reverseString(findPrefix(reversed));
}

module.exports.findPrefix = findPrefix;
function findPrefix(strings){
	if(strings && strings.length > 0){
		var prefix = "";
		
		var characters = strings[0].split("");
		for(var i = 0; i < characters.length; i++){
			var isPrefix = true;
			var character = characters[i];
			
			for(var j = 0; j < strings.length; j++) {
				var string = strings[j];

				isPrefix = isPrefix && (string.length >= i + 1 && string[i] === character);
			}
			
			if(isPrefix) prefix += character; 
			else return prefix;
		}
	}
	else return null;
}

module.exports.removePrefix = removePrefix;
function removePrefix(strings){
	var prefix = findPrefix(strings);
	
	var result = [];
	strings.forEach(function(string){
		result.push(string.replace(prefix, ""));
	});
	
	return result;
}

module.exports.startsWith = startsWith; 
function startsWith(str, starts){
	if (starts === '') return true;
    if (str == null || starts == null) return false;
    str = String(str); starts = String(starts);
    return str.length >= starts.length && str.slice(0, starts.length) === starts;
}

module.exports.endsWith = endsWith;
function endsWith(str, ends){
	if (ends === '') return true;
    if (str == null || ends == null) return false;
    str = String(str); ends = String(ends);
    return str.length >= ends.length && str.slice(str.length - ends.length) === ends;
}

module.exports.joinUrls = joinUrls;
function joinUrls(a, b){
	if(a === "") return b;
	else if(b === "") return a;
	else if(endsWith(a, "/") && startsWith(b, "/"))
		return a + b.substr(1);
	else if(endsWith(a, "/") && !startsWith(b, "/"))
		return a + b;
	else if(!endsWith(a, "/") && startsWith(b, "/"))
		return a + b;
	else if(!endsWith(a, "/") && !startsWith(b, "/"))
		return a + "/" + b;
}

module.exports.getUrlSubpaths = getUrlSubpaths;
function getUrlSubpaths(path){
	var result = [];
	path = path.split("/").filter(function(segment){
		return segment !== "";
	});
	
	path.forEach(function(segment, index){
		if(index === 0) result.push(segment);
		else result.push(joinUrls(result[index - 1], segment));
	});
	
	return result;
}

module.exports.nextSizeType = nextSizeType; 
function nextSizeType(type){
	if(type === "b")
		return "Kb";
	else if(type === "Kb")
		return "Mb";
	else if(type === "Mb")
		return "Gb";
	else if(type === "Gb")
		return "Tb";
	else if(type === "Tb" || type === "Pb")
		return "Pb";
	else 
		return null;
}

module.exports.formatFileSize = formatFileSize;
function formatFileSize(size, type, precision){
	if(typeof precision === "undefined") precision = 2;
	
	if(size < 1024 || type === "Pb")
		return size.toFixed(precision) + type;
	else
		return formatFileSize(size/1024, nextSizeType(type), precision);
};

module.exports.parseSequence = function(string, sequenceDescriptor){
	var start = 0;
	for(property in sequenceDescriptor){
		if(sequenceDescriptor.hasOwnProperty(property)){
			var length = parseInt(sequenceDescriptor[property], 10);
			sequenceDescriptor[property] = string.substr(start, length);
			start += length;
		}
	}
	
	return sequenceDescriptor;
};

module.exports.onlyLettersAndNumbers = function(string, size){
	if(typeof size === "undefined") size = "+";
	
	if(["+", "*"].indexOf(size) === -1)
		size = "{" + size + "}";
	
	return new RegExp("^[0-9a-zA-Z]" + size + "$").test(string);
};

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
