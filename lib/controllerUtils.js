'use strict';

//Most of these methods are intented to be used with express

var path = require('path');

module.exports.acceptJson = function(req, res, next) {
    req.headers.accept = 'application/json';
    res.lean = true;

    next();
};

module.exports.acceptXml = function(req, res, next) {
    req.headers.accept = 'application/xml';
    res.lean = true;

    next();
};

module.exports.acceptCsv = function(req, res, next) {
    req.headers.accept = 'text/csv';
    res.lean = true;

    next();
};

var corsDefaults = {
    allowOrigin: '*',
    allowMethods: 'GET,PUT,POST,DELETE,HEAD,OPTIONS',
    allowHeaders: 'Content-Type, Authorization, Content-Length, X-Requested-With'
};

module.exports.allowCORS = function(params) {
    if(typeof params === 'undefined') {
        params = corsDefaults;
    }

    return function(req, res, next) {
        res.header('Access-Control-Allow-Origin', params.allowOrigin || corsDefaults.allowOrigin);
        res.header('Access-Control-Allow-Methods', params.allowMethods || corsDefaults.allowMethods);
        res.header('Access-Control-Allow-Headers', params.allowHeaders || corsDefaults.allowHeaders);

        if ('OPTIONS' === req.method) {
            return res.send(200);
        }

        next();
    };
};

module.exports.loadAction = function(name, options) {
    return require(path.join(__dirname, './actions/' + name + 'Action'))(options);
};