'use strict';

var cryptoUtils = require('../lib/cryptoUtils');

function testForCipherAndDecipher(test){
    var value = 'gammautils';
    var password = 'password';

    var cipher = cryptoUtils.cipher(value, password);

    test.equal(value, cryptoUtils.decipher(cipher, password));
    test.done();
}

module.exports = {
    'md5': {
        'Check that md5 is properly calculated': function(test){
            test.ok(cryptoUtils.md5('gammautils'), '5c46d1c40197fdea3fc01dfca60a6b4e');
            test.ok(cryptoUtils.md5('Gammasoft Desenvolvimento de Software Ltda'), 'f2b33e92cdcafc6d8873eb847639b573');
            test.done();
        }
    },

    'cipher': {
        'Check that can cipher and decipher properly': function(test) {
            testForCipherAndDecipher(test);
        }
    },

    'decipher': {
        'Check that can cipher and decipher properly': function(test) {
            testForCipherAndDecipher(test);
        }
    }
};