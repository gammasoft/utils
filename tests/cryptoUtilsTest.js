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
    'hmac': {
        //too random to test
    },

    'sha1': {
        'Check that sha1 is properly calculated': function(test){
            test.ok(cryptoUtils.sha1('gammautils'), '87d70d555f99168adcb987e0ce6a29f4aa7de885');
            test.ok(cryptoUtils.sha1('Gammasoft Desenvolvimento de Software Ltda'), 'ec4748010cca99c353e32dfc1b03baa9625713b6');
            test.done();
        }
    },

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