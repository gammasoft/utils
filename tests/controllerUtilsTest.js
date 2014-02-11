'use strict';

var controllerUtils = require('../lib/controllerUtils');

function Mock() {
    this.req = { headers: {} };
    this.res = { };
    this.nextWasCalled = false;
    this.next = function() {
        this.nextWasCalled = true;
    }.bind(this);
}

module.exports = {
    'acceptJson': {
        'Verify proper headers were set': function(test) {
            var mock = new Mock();
            controllerUtils.acceptJson(mock.req, mock.res, mock.next);

            test.ok(mock.nextWasCalled);
            test.equal(mock.req.headers.accept, 'application/json');
            test.equal(mock.res.lean, true);
            test.done();
        }
    },

    'acceptXml': {
        'Verify proper headers were set': function(test) {
            var mock = new Mock();
            controllerUtils.acceptXml(mock.req, mock.res, mock.next);

            test.ok(mock.nextWasCalled);
            test.equal(mock.req.headers.accept, 'application/xml');
            test.equal(mock.res.lean, true);
            test.done();
        }
    },

    'acceptCsv': {
        'Verify proper headers were set': function(test) {
            var mock = new Mock();
            controllerUtils.acceptCsv(mock.req, mock.res, mock.next);

            test.ok(mock.nextWasCalled);
            test.equal(mock.req.headers.accept, 'text/csv');
            test.equal(mock.res.lean, true);
            test.done();
        }
    }
};