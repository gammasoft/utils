'use strict';

var util = require('util');

function resolveProperty(object, property, deep) {
    if(typeof deep === 'undefined') {
        deep = true;
    }

    if(typeof property === 'string' && deep) {
        property = property.split('.');
    }

    if(!object) {
        return null;
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

function forEachOwnProperty(object, iterator){
    for(var property in object){
        if(object.hasOwnProperty(property)) {
            if(iterator(property, object[property]) === 'break') {
                break;
            }
        }
    }
}

module.exports.forEachOwnProperty = forEachOwnProperty;

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

function prune(object, blacklist) {
    if(isUndefined(object) || isUndefined(blacklist)) {
        return object;
    }

    if(typeof blacklist === 'string') {
        blacklist = blacklist.split(',').map(function(key) {
            return key.trim();
        });
    }

    var isArray = Array.isArray(object);

    if(!isArray) {
        object = [object];
    }

    object = object.map(function(result) {

        if(result === null || typeof result === 'undefined') {
            return null;
        }

        blacklist.forEach(function(propertyToRemove) {
            delete result[propertyToRemove];
        });

        return result;
    });

    if(isArray) {
        return object;
    } else {
        return object[0];
    }
}
module.exports.prune = prune;

function pick(objects, whitelist){

    if(isUndefined(whitelist)) {
        return {};
    }

    var isArray = Array.isArray(objects),
        blacklist = [];

    if(!isArray) {
        objects = [objects];
    }

    objects.forEach(function(object){

        Object.keys(object).forEach(function(key) {

            if(whitelist.indexOf(key) === -1 && blacklist.indexOf(key) === -1){
                blacklist.push(key);
            }
        });
    });

    objects = prune(objects, blacklist);

    if(isArray) {
        return objects;
    } else {
        return objects[0];
    }
}
module.exports.pick = pick;

module.exports.merge = function(destination, source) {
    if(isUndefined(destination)) {
        destination = {};
    }

    if(isUndefined(source)) {
        source = {};
    }

    forEachOwnProperty(source, function(property, value) {
        destination[property] = value;
    });

    return destination;
};

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