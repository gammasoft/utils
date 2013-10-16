validEmailRegExp = /^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?/;

module.exports.validEmailRegExp = validEmailRegExp;

module.exports.isValidEmail = function(email) {
    return validEmailRegExp.test(email);
};