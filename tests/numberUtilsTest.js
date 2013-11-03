'use strict';

var numberUtils = require('../lib/numberUtils');

module.exports = {
    'getRandomInteger': {
        'Check that number is between given range': function(test){
            var random = numberUtils.getRandomInteger(0, 10);

            test.ok(random >= 0);
            test.ok(random <= 10);
            test.done();
        },

        'Check that number range is inclusive': function(test){
            var random = numberUtils.getRandomInteger(0, 1);

            test.ok(random === 0 || random === 1);
            test.done();
        }
    },

    'isBetween': {
        'Check that verification is inclusive by default': function(test){
            test.ok(numberUtils.isBetween(1, 1, 2));
            test.ok(numberUtils.isBetween(2.234, 1, 2.234));
            test.done();
        },

        'Check when inclusive is false': function(test){
            test.equal(numberUtils.isBetween(1, 1, 2, false), false);
            test.equal(numberUtils.isBetween(2.234, 1, 2.234, false), false);
            test.done();
        },

        'Check that it works as expected': function(test){
            test.ok(numberUtils.isBetween(0, -5, 5));
            test.ok(numberUtils.isBetween(100, 0, 200));
            test.ok(numberUtils.isBetween(500, 250, 1000));
            test.done();
        }
    }
};