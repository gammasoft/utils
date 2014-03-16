'use strict';

module.exports.escape = function(regExpString) {
    var regexpSpecialChars = /([\[\]\^\$\|\(\)\\\+\*\?\{\}])/gi;

    return new RegExp(regExpString.replace(regexpSpecialChars, '\\$1'));
};