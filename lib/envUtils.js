'use strict';

var objectUtils = require('./objectUtils'),
    NODE_ENV = process.env.NODE_ENV;

function is(desired) {

    if(!Array.isArray(desired)) {
        desired = [desired];
    }

    return desired.indexOf(NODE_ENV) > -1 || (objectUtils.isUndefined(NODE_ENV) && desired.indexOf('development') > -1);
}

module.exports.is = is;

module.exports.ifEnvIs = function(desired) {

    desired = [desired];

    var that = {};

    that.then = function(fn) {

        if(is(desired)) {
            fn();
        }

        return that;
    };

    that.or = function(env) {
        desired.push(env);

        return that;
    };

    that.otherwise = function(fn) {

        if(!is(desired)) {
            fn();
        }

        return that;
    };

    that.log = function(text) {
        if(is(desired)) {
            console.log(text);
        }

        return that;
    };

    return that;
};