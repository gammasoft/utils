'use strict';

//Most of these methods are intented to be used with express

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