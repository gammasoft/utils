'use strict';

var validEmailRegExp = (/^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?/),
    validFormattedEmailAddressRegExp = (/^(.+)\s<([A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?)>$/),
    validEmailRegExpForJade = '^[A-Za-z0-9_\\-\\.]+@[A-Za-z0-9_\\-\\.]{2,}\\.[A-Za-z0-9]{2,}(\\.[A-Za-z0-9])?';

module.exports.validEmailRegExp = validEmailRegExp;
module.exports.validFormattedEmailAddressRegExp = validFormattedEmailAddressRegExp;
module.exports.validEmailRegExpForJade = validEmailRegExpForJade;

module.exports.isValidEmail = function(email) {
    return validEmailRegExp.test(email);
};

module.exports.isNumericString = function(text){
    return (/^[0-9]+$/).test(text);
};