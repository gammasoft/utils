'use strict';

var validationUtils = require('../lib/validationUtils');

module.exports = {
    'validEmailRegExp': {
        //tested by isValidEmail tests above
    },

    'isValidEmail': {
        'Check that valid emails are valid': function(test) {
            test.ok(validationUtils.isValidEmail('renatoargh@gmail.com'));
            test.ok(validationUtils.isValidEmail('contact@gammasoft.com.br'));
            test.ok(validationUtils.isValidEmail('fulano_de_tal@gmail.com'));
            test.ok(validationUtils.isValidEmail('renato@prv.ind.br'));

            test.done();
        },

        'Check that invalid emails are invalid': function(test) {
            test.ok(!validationUtils.isValidEmail('this is not an email'));
            test.ok(!validationUtils.isValidEmail('neither@this'));
            test.ok(!validationUtils.isValidEmail('not_an_email@gmail com'));
            test.ok(!validationUtils.isValidEmail('one-more%@gmail.com'));

            test.done();
        }
    },

    'isNumericString': {
        'Contains only numbers': function(test){
            test.ok(validationUtils.isNumericString('0123'));
            test.ok(validationUtils.isNumericString('134135'));
            test.ok(validationUtils.isNumericString('0000001223'));
            test.ok(!validationUtils.isNumericString('012x3'));
            test.ok(!validationUtils.isNumericString('afds12'));
            test.ok(!validationUtils.isNumericString('0000001223_!'));

            test.done();
        }
    }
};