/* jshint ignore:start */

var httpUtils = require('./httpUtils');

function HttpClientError(messageToClient, statusCode) {
    Error.call(this);
    Error.captureStackTrace(this, arguments.callee);

    if(typeof statusCode === 'undefined') {
        statusCode = 400;
    }

    if(typeof statusCode !== 'number' || statusCode < 400 || statusCode >= 500) {
        throw new Error('Status code should be a number between 400 and 499');
    }

    this.messageToClient = messageToClient || httpUtils.statuses[statusCode];
    this.statusCode = statusCode,
    this.message = 'Error caused by used behavior: ' + (messageToClient || 'no details given');
    this.name = 'HttpClientError';
}

HttpClientError.prototype.__proto__ = Error.prototype;

module.exports.HttpClientError = HttpClientError;
/* jshint ignore:end */