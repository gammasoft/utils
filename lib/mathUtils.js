'use strict';

var objectUtils = require('./objectUtils'),
    arrayUtils = require('./arrayUtils'),
    stringUtils = require('./stringUtils'),
    mathUtilsNonStrict = require('./mathUtilsNonStrict');

module.exports.bigSum = function(a, b) {
    a = a.toString();
    b = b.toString();

    var biggest = (a.length > b.length ? a : b),
        smallest = (a.length <= b.length ? a : b),
        rest,
        result = '';

    a = stringUtils.pad(smallest, biggest.length, '0').split('');
    b = biggest.split('');

    rest = b.reduceRight(function(rest, current, index){
        var aDigit = parseInt(a[index], 10),
            bDigit = parseInt(b[index], 10),
            sum = aDigit + bDigit + rest;

        result = (sum > 9 ? sum - 10 : sum) + result;
        return sum > 9 ? 1 : 0;
    }, 0);

    return rest === 0 ? result : '1' + result;
};

module.exports.median = function(array) {
    return array.reduce(function(a, b) {
        return a + b;
    }) / array.length;
};

module.exports.pearsonCoefficient = function(a, b) {
    var sumA = 0,
        sumB = 0,
        sumASquared = 0,
        sumBSquared = 0,
        sumAB = 0,
        intersection = 0,

        property;

    for(property in a) {
        if(a.hasOwnProperty(property) && b && b.hasOwnProperty(property)){
            sumA += a[property];
            sumB += b[property];

            sumASquared += Math.pow(a[property], 2);
            sumBSquared += Math.pow(b[property], 2);

            sumAB += a[property] * b[property];
            intersection++;
        }
    }

    if(intersection === 0) {
        return 0;
    }

    var num = sumAB - (sumA * sumB / intersection);
    var den = Math.sqrt((sumASquared - Math.pow(sumA, 2) / intersection) *
                        (sumBSquared - Math.pow(sumB, 2) / intersection));

    return den === 0 ? 0 : num / den;
};

module.exports.euclideanDistance = function(a, b){
    var sum = 0,

        property;

    for(property in a) {
        if(a.hasOwnProperty(property) && b && b.hasOwnProperty(property)) {
            sum += Math.pow(a[property] - b[property], 2);
        }
    }

    return Math.sqrt(sum);
};


module.exports.solve = mathUtilsNonStrict.solve;

module.exports.mod = function(value, factors, divider){
    if(objectUtils.isUndefined(divider)) {
        divider = 11;
    }
    if(objectUtils.isUndefined(factors)) {
        factors = arrayUtils.series(2, 9);
    }

    var i = 0;
    return value.split('').reduceRight(function(last, current){
        if(i > factors.length - 1) {
            i = 0;
        }
        return (factors[i++] * parseInt(current, 10)) + last;
    }, 0) % divider;
};

function convolve(signal1, signal2){
    var signal1Length = signal1.length,
        signal2Length = signal2.length,
        finalSize = signal1Length + signal2Length - 1;

    var result = new Array(finalSize);

    for (var i = 0; i < finalSize; i++) {
        result[i] = 0;

        for (var j = 0; j < signal2Length; j++) {
            if(i - j < 0) {
                continue;
            }
            if(i - j >= signal1Length) {
                continue;
            }

            result[i] += signal2[j] * signal1[i - j];
        }
    }

    return result;
}

module.exports.convolve = convolve;
module.exports.multiplyPolynomials = convolve;