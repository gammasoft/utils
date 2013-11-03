'use strict';

var mathUtils = require('../lib/mathUtils');

module.exports = {
    'median': {
        'Check that median is correctly calculated': function(test){
            test.equal(mathUtils.median([5, 10]), 7.5);
            test.equal(mathUtils.median([5, 5]), 5);
            test.equal(mathUtils.median([10, 20, 30]), 20);

            test.done();
        }
    },

    'pearsonCoefficient': {
        'Calculate pearson coefficient properly': function(test){

            test.equal(mathUtils.pearsonCoefficient({
                age: 43,
                glucose: 99
            }, {
                age: 21,
                glucose: 65
            }), 1);

            test.done();
        }
    },

    'euclideanDistance': {
        'Check that calculation can be done with "n" domensions and that they yield right result': function(test){
            test.equal(mathUtils.euclideanDistance({x: 5, y: 4}, {x: 4, y: 1}), 3.1622776601683795);
            test.equal(mathUtils.euclideanDistance({'x axis': 2, 'y axis': 5}, {'x axis': 3, 'y axis': 4}), 1.4142135623730951);
            test.equal(mathUtils.euclideanDistance({i: 2, j: 4, w: 5}, {i: 3, j: 3, w: 3}), 2.449489742783178);
            test.equal(mathUtils.euclideanDistance({a: 10}, {a: 8}), 2);
            test.equal(mathUtils.euclideanDistance({a: 8}, {a: 10}), 2);
            test.equal(mathUtils.euclideanDistance({a: 8, b: 10}, {a: 10}), 2);
            test.equal(mathUtils.euclideanDistance({a: 8}, {a: 10, b: 10}), 2);
            test.equal(mathUtils.euclideanDistance({}, {}), 0);
            test.equal(mathUtils.euclideanDistance(null, null), 0);
            test.equal(mathUtils.euclideanDistance({a: 8}, null), 0);

            test.done();
        }
    },

    'mod': {
        'Check that it calculates the right values': function(test){
            test.equal(mathUtils.mod('036532', [2, 3, 4, 5, 6, 7]), 4);
            test.equal(mathUtils.mod('347389', [2, 3, 4, 5, 6, 7]), 2);
            test.done();
        }
    },

    'convolve': {
        'Check that convolves properly': function(test){
            test.deepEqual(mathUtils.convolve([1, 1, 1], [0.5, 2, 2.5, 1]), [0.5, 2.5, 5, 5.5, 3.5, 1]);
            test.deepEqual(mathUtils.convolve([3, 4, 5], [2, 1]), [6, 11, 14, 5]);
            test.deepEqual(mathUtils.convolve([2, -2, 1], [1, 3, 0.5, -1]), [2, 4, -4, 0, 2.5, -1]);
            test.deepEqual(mathUtils.convolve([1, 2, 3, 4], [-1, 5, 3]), [-1, 3, 10, 17, 29, 12]);
            test.deepEqual(mathUtils.convolve([1, 2], [2, 1, 1, 1]), [2, 5, 3, 3, 2]);
            test.deepEqual(mathUtils.convolve([1, 2, 3, 4, 5], [1]), [1, 2, 3, 4, 5]);
            test.done();
        }
    },

    'multiplyPolynomials': {
        'Check that polynomials are multiplied properly': function(test){
            test.deepEqual(mathUtils.multiplyPolynomials([1, 1, 1], [0.5, 2, 2.5, 1]), [0.5, 2.5, 5, 5.5, 3.5, 1]);
            test.deepEqual(mathUtils.multiplyPolynomials([3, 4, 5], [2, 1]), [6, 11, 14, 5]);
            test.deepEqual(mathUtils.multiplyPolynomials([2, -2, 1], [1, 3, 0.5, -1]), [2, 4, -4, 0, 2.5, -1]);
            test.deepEqual(mathUtils.multiplyPolynomials([1, 2, 3, 4], [-1, 5, 3]), [-1, 3, 10, 17, 29, 12]);
            test.deepEqual(mathUtils.multiplyPolynomials([1, 2], [2, 1, 1, 1]), [2, 5, 3, 3, 2]);
            test.deepEqual(mathUtils.multiplyPolynomials([1, 2, 3, 4, 5], [1]), [1, 2, 3, 4, 5]);
            test.done();
        }
    },

    'solve': {
        //tested by mathUtilsNonStrictTest.js
    }
};