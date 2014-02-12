'use strict';

var validationUtils = require('../lib/validationUtils');

module.exports = {
    'validFormattedEmailAddressRegExp': {
        'Check that RegExp matches major cases': function(test) {
            var regExp = validationUtils.validFormattedEmailAddressRegExp;

            var data = 'Fulano de Tal <fulano_de_tal@example.com>'.match(regExp);

            test.notEqual(data, null);
            test.equal(data[1], 'Fulano de Tal');
            test.equal(data[2], 'fulano_de_tal@example.com');

            test.done();
        }
    },

    'validEmailRegExpForJade': {
        'Check that validEmailRegExpForJade is the same as validEmailRegExp': function(test) {
            test.equal(new RegExp(validationUtils.validEmailRegExpForJade).toString(), validationUtils.validEmailRegExp.toString());
            test.done();
        }
    },

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