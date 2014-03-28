'use strict';

var util = require('util');

function resolveProperty(object, property, deep) {
    if(typeof deep === 'undefined') {
        deep = true;
    }

    if(typeof property === 'string' && deep) {
        property = property.split('.');
    }

    if(!deep) {
        property = Array.isArray(property) ? property[0] : property;

        if(typeof property === 'undefined') {
            return object;
        } else {
            return object[property];
        }
    }

    return resolveProperty(object[property.shift()], property, property.length > 1);
}

module.exports.resolveProperty = resolveProperty;

module.exports.forEachOwnProperty = function(object, iterator){
    for ( var property in object ) {
        if ( object.hasOwnProperty(property) ) {
            if(iterator(property) === 'break') {
                break;
            }
        }
    }
};

function isObject(object){
    return typeof object === 'object';
}
module.exports.isObject = isObject;

function isArray(object){
    return util.isArray(object);
}
module.exports.isArray = isArray;

module.exports.values = function(object){
    var key,
        values = [];

    if(!isObject(object) || isArray(object)) {
        throw new Error('Invalid parameter');
    }

    for(key in object) {
        if(object.hasOwnProperty(key)) {
            values.push(object[key]);
        }
    }

    return values;
};

module.exports.keys = function(object){
    var key,
        keys = [];

    if(!isObject(object) || isArray(object)) {
        throw new Error('Invalid parameter');
    }

    for(key in object) {
        if(object.hasOwnProperty(key)) {
            keys.push(key);
        }
    }

    return keys;
};

function isUndefined(object){
    return typeof object === typeof undefined;
}
module.exports.isUndefined = isUndefined;

module.exports.isEmpty = function(object){
    if(typeof object !== 'object') {
        return false;
    }

    for(var prop in object) {
        if(object.hasOwnProperty(prop)) {
            return false;
        }
    }

    return true;
};

module.exports.isBoolean = function(object) {
    return typeof object === 'boolean';
};

module.exports.isString = function(object) {
    return typeof object === 'string';
};

module.exports.isNumber = function(object) {
    return !isNaN(parseFloat(object)) && isFinite(object);
};

module.exports.argsToArray = function(args, startingFrom){
    if(isUndefined(startingFrom)) {
        startingFrom = 0;
    }

    return Array.prototype.slice.call(args, startingFrom);
};