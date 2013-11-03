'use strict';

var objectUtils = require('./objectUtils');

module.exports.getRandomItem = function(array){
    return array[Math.floor(Math.random() * array.length)];
};

module.exports.movingAverage = function(array, length){
    var result = [];
    
    if(array.length < length) {
        return result;
    }
    
    var accumulator = 0;
    for(var i = length - 1; i < array.length; i++){
        for(var j = 0; j < length; j++){
            accumulator += parseFloat(array[i - j], 10);
        }
        
        result.push(accumulator/length);
        accumulator = 0;
    }
    
    return result;
};

function getValue(element, property){
    if(objectUtils.isNumber(element)) {
        return parseFloat(element, 10);
    }
    else if(objectUtils.isString(element)) {
        return element;
    }
    else if(property in element) {
        return parseFloat(element[property], 10);
    }
    else {
        throw new Error('Property "' + property + '" was not found on array\'s element');
    }
}

module.exports.multiply = function(array, property){
    return array.reduce(function(a, b){ return getValue(a, property) * getValue(b, property); }, 1);
};

function sum(array, property, fn){
    if(objectUtils.isUndefined(fn)) {
        fn = function(a, b, index){
            if(index === 0 && typeof b === 'string') {
                a = '';
            }
            if(index === 0 && typeof b !== 'string') {
                a = 0;
            }
            
            return getValue(a, property) + getValue(b, property);
        };
    }

    return array.reduce(fn, 0);
}
module.exports.sum = sum;

function removeAt(array, index){
    array.splice(index, 1);
}
module.exports.removeAt = removeAt;

module.exports.removeLast = function(array){
    removeAt(array, array.length - 1);
};


module.exports.insertAt = function(array, index, element){
    array.splice(index, 0, element);
};

module.exports.series = function(from, to){
    var params = [from, to];
    if(from > to) {
        params = [to, from];
    }
    
    var result = [];
    while(params[0] <= params[1]) {
        result.push(params[0]++);
    }

    return from > to ? result.reverse() : result;
};

module.exports.pretty = function(array, lastSeparator){
    if(objectUtils.isUndefined(lastSeparator)) {
        lastSeparator = 'e';
    }

    return array.toString().replace(/,/g, ', ').replace(/,\s([^,]+)$/, ' ' + lastSeparator + ' $1');
};

module.exports.clean = function(array, deleteValue) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] === deleteValue) {
            array.splice(i, 1);
            i--;
        }
    }
    
    return array;
};

module.exports.intersection = function(a, b){
    return b.filter(function(element){
        return a.indexOf(element) !== -1;
    });
};

module.exports.toDictionary = function(array, key){
    var result = {};
    array.forEach(function(element){
        result[element[key]] = element;
    });
    
    return result;
};

module.exports.chop = function(array, quantity){
    var result = [];
    
    var subArray = [];
    var count = 0;
    array.forEach(function(element){
        if(count === quantity){
            result.push(subArray);
            subArray = [];
            count = 0;
        }
        
        subArray.push(element);
        count++;
    });
    
    if(subArray.length > 0) {
        result.push(subArray);
    }

    return result;
};