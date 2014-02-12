'use strict';

var crypto = require('crypto');

module.exports.hmac = function(algorithm, key, text, encoding) {
    if(typeof encoding === 'undefined') {
        encoding = 'base64';
    }

    var hmac = crypto.createHmac(algorithm, key);

    hmac.setEncoding(encoding);
    hmac.write(text);
    hmac.end();

    return hmac.read();
};

module.exports.sha1 = function(value){
    return crypto.createHash('sha1').update(value).digest('hex');
};

module.exports.md5 = function(value){
    return crypto.createHash('md5').update(value).digest('hex');
};

module.exports.cipher = function(value, password, algorithm){
    algorithm = algorithm || 'aes256';

    var cipher = crypto.createCipher(algorithm, password);
    return cipher.update(value, 'utf8', 'hex') + cipher.final('hex');
};

module.exports.decipher = function(value, password, algorithm){
    algorithm = algorithm || 'aes256';

    var decipher = crypto.createDecipher(algorithm, password);
    return decipher.update(value, 'hex', 'utf8') + decipher.final('utf8');
};