'use strict';

var objectUtils = require('../lib/objectUtils');

module.exports = {
    'pick': {

        'if whitelist is undefined then returns an empty object': function(test){

            var object = {
                name: 'Father',
                job: 'Developer',
                age: 40
            };

            test.deepEqual(objectUtils.pick(object), {});

            test.done();
        },

        'properly pick whitelisted properties': function(test){

            var object = {
                name: 'Father',
                job: 'Developer',
                age: 40
            };

            test.deepEqual(objectUtils.pick(object, ['name', 'job']), {name: 'Father', job: 'Developer'});

            test.done();
        },

        'if whitelist is a empty array then returns the original object': function(test){

            var object = {
                name: 'Father',
                job: 'Developer',
                age: 40
            };

            test.deepEqual(objectUtils.pick(object, []), {});

            test.done();
        },

        'properly pick whitelisted properties from objects inside an array': function(test) {

            var array = [{
                name: 'Inobrega',
                job: 'Developer',
                age: 40
            },{
                name: 'Gammasoft',
                job: 'Designer',
                age: 37
            }];

            test.deepEqual(objectUtils.pick(array, ['name']), [{name: 'Inobrega'}, {name: 'Gammasoft'}]);

            test.done();
        }
    },
    'prune': {

        'if blacklist is undefined then returns the original object': function(test) {

            var object = {
                name: 'Gammasoft',
                age: 10
            };

            test.deepEqual(objectUtils.prune(object), object);

            test.done();
        },

        'if blacklist is empty array then returns the original object': function(test) {

            var object = {
                name: 'Gammasoft',
                age: 10
            };

            test.deepEqual(objectUtils.prune(object, []), object);

            test.done();
        },

        'properly removes blacklisted properties': function(test) {

            var object = {
                name: 'Gammasoft',
                age: 10
            };

            test.deepEqual(objectUtils.prune(object, ['age']), { name: 'Gammasoft' });

            test.done();
        },

        'properly removes blacklisted properties from objects inside an array': function(test) {

            var array = [{
                name: 'Renato',
                age: 27
            }, {
                name: 'Ilson',
                age: 22
            }];

            test.deepEqual(objectUtils.prune(array, ['age']), [{ name: 'Renato' }, { name: 'Ilson' }]);

            test.done();
        }

    },

    'merge': {
        'can merge properly': function(test) {
            var dest = {
                a: 1,
                b: 'Test',
                c: 'Cant touch this!'
            };


            test.deepEqual(objectUtils.merge(dest, { a: 2, b: 3, d: 4 }), {
                a: 2,
                b: 3,
                c: 'Cant touch this!',
                d: 4
            });

            test.done();
        },

        'can merge with undefined object': function(test) {
            test.deepEqual(objectUtils.merge({a: 1}, undefined), { a: 1 });

            test.done();
        },

        'can handle undefineds': function(test) {
            test.deepEqual(objectUtils.merge(undefined, undefined), { });

            test.done();
        },

        'can have undefined destination': function(test) {
            test.deepEqual(objectUtils.merge(undefined, { a: 1 }), { a: 1 });

            test.done();
        },
    },

    'resolveProperty': {
        'can resolve shallow properties': function(test) {
            var object = {
                'company.name': 'Gammasoft'
            };

            test.equal(objectUtils.resolveProperty(object, 'company.name', false), 'Gammasoft');
            test.done();
        },

        'can resolve shallow properties even if set to deep': function(test) {
            var object = {
                'name': 'Gammasoft'
            };

            test.equal(objectUtils.resolveProperty(object, 'name', true), 'Gammasoft');
            test.done();
        },

        'can resolve shallow properties passing array': function(test) {
            var object = {
                'company.name': 'Gammasoft'
            };

            test.equal(objectUtils.resolveProperty(object, ['company.name', 'this', 'is', 'gonna', 'be', 'ignored'], false), 'Gammasoft');
            test.done();
        },

        'can resolve deep properties by default': function(test) {
            var object = {
                company: {
                    name: 'Gammasoft',
                    founder: {
                        name: 'Renato',
                        preferedNumber: 13
                    },
                    country: 'Brazil',
                    city: 'Brasilia',
                    technologies: [
                        'nodejs', 'mongodb', 'aws'
                    ]
                }
            };

            test.equal(objectUtils.resolveProperty(object, 'company.name'), 'Gammasoft');
            test.equal(objectUtils.resolveProperty(object, 'company.country'), 'Brazil');
            test.equal(objectUtils.resolveProperty(object, 'company.city'), 'Brasilia');
            test.equal(objectUtils.resolveProperty(object, 'company.technologies').length, 3);
            test.equal(objectUtils.resolveProperty(object, 'company.founder.name'), 'Renato');
            test.equal(objectUtils.resolveProperty(object, 'company.founder.preferedNumber'), 13);

            test.done();
        },

        'can resolve deep properties passing an array': function(test) {
            var object = {
                company: {
                    name: 'Gammasoft',
                    founder: {
                        name: 'Renato',
                        preferedNumber: {
                            odd: 13,
                            even: 8
                        }
                    },
                    country: 'Brazil',
                    city: 'Brasilia',
                    technologies: [
                        'nodejs', 'mongodb', 'aws'
                    ]
                }
            };

            test.equal(objectUtils.resolveProperty(object, ['company', 'name']), 'Gammasoft');
            test.equal(objectUtils.resolveProperty(object, ['company', 'country']), 'Brazil');
            test.equal(objectUtils.resolveProperty(object, ['company', 'city']), 'Brasilia');
            test.equal(objectUtils.resolveProperty(object, ['company', 'technologies']).length, 3);
            test.equal(objectUtils.resolveProperty(object, ['company', 'founder', 'name']), 'Renato');
            test.equal(objectUtils.resolveProperty(object, ['company', 'founder', 'preferedNumber', 'odd']), 13);
            test.equal(objectUtils.resolveProperty(object, ['company', 'founder', 'preferedNumber', 'even']), 8);

            test.done();
        },
    },

    'values': {
        'Checks that works properly': function(test){
            var values = objectUtils.values({a: '1', b: '2', c:'3'});
            test.deepEqual(values, ['1', '2', '3']);
            test.done();
        }
    },

    'keys': {
        'Detects every key in a given object': function(test){
            var keys = objectUtils.keys({a: '', b: '', c:''});
            test.deepEqual(keys, ['a', 'b', 'c']);
            test.done();
        },

        'keys: Throws if type is not object': function(test){
            test.throws(function(){
                objectUtils.keys('');
            });

            test.throws(function(){
                objectUtils.keys(true);
            });

            test.throws(function(){
                objectUtils.keys(123);
            });

            test.throws(function(){
                objectUtils.keys([]);
            });

            test.doesNotThrow(function(){
                objectUtils.keys(new Date());
            });

            test.doesNotThrow(function(){
                objectUtils.keys({});
            });

            test.done();
        }
    },

    'isObject': {
        'Check that it detects regular objects and arrays': function(test){
            test.ok(objectUtils.isObject({}));
            test.ok(objectUtils.isObject([]));

            test.done();
        }
    },

    'isUndefined': {
        'Check if isUndefined works as expected': function(test){
            test.ok(objectUtils.isUndefined(undefined));
            test.ok(objectUtils.isUndefined(void 0));
            test.equal(objectUtils.isUndefined(100), false);

            test.done();
        }
    },

    'isArray': {
        'Check that it detects arrays': function(test){
            test.ok(objectUtils.isArray([]));
            test.equal(objectUtils.isArray({}), false);
            test.equal(objectUtils.isArray('this is not an array'), false);

            test.done();
        }
    },

    'isBoolean': {
        'Check that detects booleans': function(test){
            test.ok(objectUtils.isBoolean(true));
            test.equal(objectUtils.isBoolean(1), false);
            test.equal(objectUtils.isBoolean(0), false);

            test.done();
        }
    },

    'isString': {
        'Check that detects strings': function(test){
            test.ok(objectUtils.isString('Gammasoft'));
            test.equal(objectUtils.isString(1), false);
            test.equal(objectUtils.isString(/as/g), false);

            test.done();
        }
    },

    'isEmpty': {
        'Check that detects empty objects': function(test){
            test.ok(objectUtils.isEmpty({}));

            test.done();
        },

        'Check that if detects non empty objects': function(test){
            test.equal(objectUtils.isEmpty({ a: 1, b: 2 }), false);

            test.done();
        }
    },

    'isNumber': {
        'Check that it detects regular numbers': function(test){
            test.ok(objectUtils.isNumber(1234.45));
            test.ok(objectUtils.isNumber(121343.34));
            test.ok(objectUtils.isNumber(Number.MAX_VALUE));
            test.ok(objectUtils.isNumber(Number.MIN_VALUE));

            test.done();
        },

        'Check that it detects numbers in strings': function(test){
            test.ok(objectUtils.isNumber('123'));
            test.ok(objectUtils.isNumber('123.234'));
            test.ok(objectUtils.isNumber('121343.34'));
            test.ok(objectUtils.isNumber('1.7976931348623157e+308'));
            test.ok(objectUtils.isNumber('5e-324'));

            test.done();
        },

        'Check that it rejects non numbers': function(test){
            test.equal(objectUtils.isNumber(''), false);
            test.equal(objectUtils.isNumber(1/0), false);
            test.equal(objectUtils.isNumber('1,89'), false);
            test.equal(objectUtils.isNumber('12345.2345.656'), false);

            test.done();
        }
    },

    'argsToArray': {
        'Parses arguments to array correctly': function(test){
            function fn(){
                test.deepEqual(['param1', 'param2', 3, true], objectUtils.argsToArray(arguments));
                test.done();
            }

            fn('param1', 'param2', 3, true);
        },

        'Parses arguments to array returning elements only from the given index': function(test){
            function fn(){
                test.deepEqual([3, true], objectUtils.argsToArray(arguments, 2));
                test.done();
            }

            fn('param1', 'param2', 3, true);
        }
    },

    'forEachOwnProperty': {
        'Iterates through every own property': function(test){
            test.expect(3);
            objectUtils.forEachOwnProperty({a: 1, b: 'foo', c: /regexp/i}, function(property){
                test.ok(property);
            });

            test.done();
        },

        'Can break the loop': function(test){
            test.expect(1);
            objectUtils.forEachOwnProperty({a: 1, b: 'foo', c: /regexp/i}, function(property){
                test.equal(property, 'a');
                return 'break';
            });

            test.done();
        }
    }
};