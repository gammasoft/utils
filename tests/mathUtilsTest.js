'use strict';

var mathUtils = require('../lib/mathUtils');

module.exports = {
    'LinearRegression': {
        'Adding data increments length proplerly': function(test) {
            var linearRegression = new mathUtils.LinearRegression();

            linearRegression.add({ x: 30, y: 430 });
            test.equal(linearRegression.length, 1);

            linearRegression.add({ x: 21, y: 335 });
            test.equal(linearRegression.length, 2);

            linearRegression.add({ x: 35, y: 520 });
            test.equal(linearRegression.length, 3);

            test.done();
        },
        'tests main functionality': function(test) {
            var linearRegression = new mathUtils.LinearRegression();

            linearRegression.add({ x: 30, y: 430 });
            linearRegression.add({ x: 21, y: 335 });
            linearRegression.add({ x: 35, y: 520 });
            linearRegression.add({ x: 42, y: 490 });
            linearRegression.add({ x: 37, y: 470 });
            linearRegression.add({ x: 20, y: 210 });
            linearRegression.add({ x: 8, y: 195 });
            linearRegression.add({ x: 17, y: 270 });
            linearRegression.add({ x: 35, y: 400 });
            linearRegression.add({ x: 25, y: 480});

            test.equal(linearRegression.a().toFixed(2), '117.07');
            test.equal(linearRegression.b().toFixed(2), '9.74');

            test.done();
        }
    },

    'linearRegression': {
        '': function(test) {
            var data = [{ x: 30, y: 430 },
                        { x: 21, y: 335 },
                        { x: 35, y: 520 },
                        { x: 42, y: 490 },
                        { x: 37, y: 470 },
                        { x: 20, y: 210 },
                        { x: 8, y: 195 },
                        { x: 17, y: 270 },
                        { x: 35, y: 400 },
                        { x: 25, y: 480}];

            var linearRegression = mathUtils.linearRegression(data);

            test.equal(linearRegression.a.toFixed(2), '117.07');
            test.equal(linearRegression.b.toFixed(2), '9.74');

            test.equal(linearRegression.fn(30).toFixed(2), '409.21');
            test.equal(linearRegression.fn(21).toFixed(2), '321.57');
            test.equal(linearRegression.fn(35).toFixed(2), '457.91');
            test.equal(linearRegression.fn(42).toFixed(2), '526.07');
            test.equal(linearRegression.fn(37).toFixed(2), '477.38');
            test.equal(linearRegression.fn(20).toFixed(2), '311.83');
            test.equal(linearRegression.fn(8).toFixed(2), '194.98');
            test.equal(linearRegression.fn(17).toFixed(2), '282.62');
            test.equal(linearRegression.fn(35).toFixed(2), '457.91');
            test.equal(linearRegression.fn(25).toFixed(2), '360.52');

            test.done();
        }
    },

    'isPrime': {
        'Indentifies first primes': function(test) {
            test.ok(mathUtils.isPrime(2));
            test.ok(mathUtils.isPrime(3));
            test.ok(mathUtils.isPrime(5));
            test.ok(mathUtils.isPrime(7));
            test.ok(mathUtils.isPrime(11));
            test.ok(mathUtils.isPrime(13));
            test.ok(mathUtils.isPrime(17));
            test.ok(mathUtils.isPrime(19));
            test.ok(mathUtils.isPrime(23));
            test.ok(mathUtils.isPrime(29));
            test.ok(mathUtils.isPrime(31));
            test.ok(mathUtils.isPrime(41));
            test.ok(mathUtils.isPrime(43));
            test.ok(mathUtils.isPrime(47));

            test.done();
        }
    },

    'getPrimeFactors': {
        'Get right results for some known cases': function(test) {
            test.deepEqual(mathUtils.getPrimeFactors(4), [2, 2]);
            test.deepEqual(mathUtils.getPrimeFactors(6), [2, 3]);
            test.deepEqual(mathUtils.getPrimeFactors(8), [2, 2, 2]);
            test.deepEqual(mathUtils.getPrimeFactors(9), [3, 3]);
            test.deepEqual(mathUtils.getPrimeFactors(10), [2, 5]);
            //test.deepEqual(mathUtils.getPrimeFactors(472342734872390487), [3, 7, 827, 978491, 27795571]);

            test.done();
        }
    },

    'bigSum': {
        'Can perform trivial sumations': function(test) {
            test.equal(mathUtils.bigSum(2, 3), '5');
            test.equal(mathUtils.bigSum(3, 8), '11');
            test.equal(mathUtils.bigSum(800, 800), '1600');
            test.equal(mathUtils.bigSum(2347, 2785679), '2788026');
            test.equal(mathUtils.bigSum(23472347, 27856792785679), '27856816258026');
            test.equal(mathUtils.bigSum('2347234723472347', '2785679278567927856792785679'), '2785679278570275091516258026');
            test.equal(mathUtils.bigSum('23472347234723472347234723472347', '27856792785679278567927856792785679278567927856792785679'), '27856792785679278567927880265132914002040275091516258026');

            test.done();
        }
    },

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