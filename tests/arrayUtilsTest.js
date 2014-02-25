'use strict';

var arrayUtils = require('../lib/arrayUtils');

module.exports = {
    'groupBySync': {
        'Check that items are properly grouped': function(test) {
            var items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

            function groupingFunction(item) {
                return item % 2 ? 'odd' : 'even';
            }

            test.deepEqual(arrayUtils.groupBySync(items, groupingFunction), {
                odd: [1, 3, 5, 7, 9],
                even: [0, 2, 4, 6, 8, 10]
            });

            test.done();
        },

        'Check that items are properly placed within an array and grouped as expected': function(test) {
            var items = ['Gammasoft', 'Renato', 'Gama', 'Node'];

            function groupingFunction(item) {
                var group;

                if(item.length > 8) {
                    group = 'length more than 8 characters';
                } else if(item.length >= 5 && item.length <= 8) {
                    group = 'length between 5 and 8 characters';
                } else if(item.length > 0 && item.length <= 4){
                    group = 'length between 1 and 4 characters';
                } else {
                    group = 'length equals 0';
                }

                return group;
            }

            function toArray(group, items) {
                return {
                    group: group,
                    items: items,
                    length: items.length
                };
            }

            var groupedItems = arrayUtils.groupBySync(items, groupingFunction, toArray),
                expected = [{
                    group: 'length more than 8 characters',
                    items: ['Gammasoft'],
                    length: 1
                }, {
                    group: 'length between 5 and 8 characters',
                    items: ['Renato'],
                    length: 1
                }, {
                    group: 'length between 1 and 4 characters',
                    items: ['Gama', 'Node'],
                    length: 2
                }];

            test.ok(Array.isArray(groupedItems));
            test.deepEqual(groupedItems, expected);
            test.done();
        }
    },
    'groupBy': {
        'Check that items are properly grouped': function(test) {
            var items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

            function groupingFunction(item, cb) {
                return cb(null, item % 2 ? 'odd' : 'even');
            }

            arrayUtils.groupBy(items, groupingFunction, function(err, groupedItems) {
                test.ifError(err);
                test.deepEqual(groupedItems, {
                    odd: [1, 3, 5, 7, 9],
                    even: [0, 2, 4, 6, 8, 10]
                });
                test.done();
            });
        },

        'Check that items are properly placed within an array and grouped as expected': function(test) {
            var items = ['Gammasoft', 'Renato', 'Gama', 'Node'];

            function groupingFunction(item, cb) {
                var group;

                if(item.length > 8) {
                    group = 'length more than 8 characters';
                } else if(item.length >= 5 && item.length <= 8) {
                    group = 'length between 5 and 8 characters';
                } else if(item.length > 0 && item.length <= 4){
                    group = 'length between 1 and 4 characters';
                } else {
                    group = 'length equals 0';
                }

                return cb(null, group);
            }

            function toArray(group, items) {
                return {
                    group: group,
                    items: items,
                    length: items.length
                };
            }

            arrayUtils.groupBy(items, groupingFunction, toArray, function(err, groupedItems) {
                test.ifError(err);
                test.ok(Array.isArray(groupedItems));

                var expected = [{
                    group: 'length more than 8 characters',
                    items: ['Gammasoft'],
                    length: 1
                }, {
                    group: 'length between 5 and 8 characters',
                    items: ['Renato'],
                    length: 1
                }, {
                    group: 'length between 1 and 4 characters',
                    items: ['Gama', 'Node'],
                    length: 2
                }];

                test.deepEqual(groupedItems, expected);
                test.done();
            });
        }
    },

    'toUpperCase': {
        'Verify all items are in upper case': function(test) {
            var data = ['this', 'is', 42, 'a', 'test'];

            data = arrayUtils.toUpperCase(data);

            test.deepEqual(data, ['THIS', 'IS', 42, 'A', 'TEST']);
            test.done();
        }
    },

    'toLowerCase': {
        'Verify all items are in lower case': function(test) {
            var data = ['THIS', 'IS', 42, 'A', 'TEST'];

            data = arrayUtils.toLowerCase(data);

            test.deepEqual(data, ['this', 'is', 42, 'a', 'test']);
            test.done();
        }
    },

    'getRandomItem': {
        'Item returned is within the original array': function(test){
            var array = [1, 2, 3, 4];
            test.ok(array.indexOf(arrayUtils.getRandomItem(array)) !== -1);
            test.ok(array.indexOf(arrayUtils.getRandomItem(array)) !== -1);
            test.ok(array.indexOf(arrayUtils.getRandomItem(array)) !== -1);
            test.ok(array.indexOf(arrayUtils.getRandomItem(array)) !== -1);

            var array2 = ['Fulano', 'Ciclano', 'Beltrano'];
            test.ok(array2.indexOf(arrayUtils.getRandomItem(array2)) !== -1);
            test.ok(array2.indexOf(arrayUtils.getRandomItem(array2)) !== -1);
            test.ok(array2.indexOf(arrayUtils.getRandomItem(array2)) !== -1);

            test.done();
        }
    },

    'movingAverage': {
        'Testing with length 1 should return same array': function(test){
            var array = [1, 2, 3, 4];

            test.deepEqual([1, 2, 3, 4], arrayUtils.movingAverage(array, 1));
            test.done();
        },

        'Testing with length 2': function(test){
            var array = [1, 2, 3, 4];

            test.deepEqual([1.5, 2.5, 3.5], arrayUtils.movingAverage(array, 2));
            test.done();
        },

        'Testing with length 3': function(test){
            var array = [1, 2, 3, 4];

            test.deepEqual([2, 3], arrayUtils.movingAverage(array, 3));
            test.done();
        },

        'Testing with length 4': function(test){
            var array = [1, 2, 3, 4];

            test.deepEqual([2.5], arrayUtils.movingAverage(array, 4));
            test.done();
        },

        'Testing with bigger length than array\'s length will return empty array': function(test){
            var array = [1, 2, 3, 4];

            test.deepEqual([], arrayUtils.movingAverage(array, 5));
            test.done();
        },

        'Will work with numeric string arrays': function(test){
            var array = ['1', '2', '3', '4'];

            test.deepEqual([2, 3], arrayUtils.movingAverage(array, 3));
            test.deepEqual([2.5], arrayUtils.movingAverage(array, 4));
            test.done();
        },
    },


    'multiply': {
        'Multiply correct when elements are numbers': function(test){
            var array = [1, 2, 3];
            test.equal(6, arrayUtils.multiply(array));
            test.done();
        },

        'Multiply correctly when elements are string numbers': function(test){
            var array = ['1', '2', '3'];
            test.equal(6, arrayUtils.multiply(array));
            test.done();
        },

        'Multiply correctly when elements are objects': function(test){
            var array = [{ price: 2 }, { price: 3 }, { price: 4}];
            test.equal(arrayUtils.multiply(array, 'price'), 24);
            test.done();
        }
    },

    'sum': {
        'Sums correctly when elements are objects': function(test){
            var array = [{ price: 12.50 }, { price: 0.50 }, { price: 7}];
            test.equal(20, arrayUtils.sum(array, 'price'));
            test.done();
        },

        'Sums correctly when there is only one objects': function(test){
            var array = [{ price: 7}];
            test.equal(arrayUtils.sum(array, 'price'), 7);
            test.done();
        },

        'Sums correctly when elements are number strings into objects': function(test){
            var array = [{ price: '12.50' }, { price: '0.50' }, { price: '7' }];
            test.equal(20, arrayUtils.sum(array, 'price'));
            test.done();
        },

        'Sums correctly when elements are numbers': function(test){
            var array = [1, 2, 3, 4];
            test.equal(10, arrayUtils.sum(array));
            test.done();
        },

        'Sums correctly when elements are string numbers': function(test){
            var array = ['1', '2', '3', '4'];
            test.equal(10, arrayUtils.sum(array));
            test.done();
        },

        'Join strings if content of at least one element is a not a number string': function(test){
            var array;

            array = ['G', 'a', 'm', 'm', 'a', 's', 'o', 'f', 't'];
            test.equal('Gammasoft', arrayUtils.sum(array));

            array = [1, '2', 'Gammasoft', 3, 4, '5'];
            test.equal('3Gammasoft345', arrayUtils.sum(array));

            test.done();
        },

        'Throws exception if property parameter is not present in at least on array element': function(test){
            var array = [{price: 1}, {}];
            test.throws(function(){
                arrayUtils.sum(array);
            });

            test.done();
        }
    },

    'removeAt': {
        'Correctly removes value from array at given index': function(test){
            var array = ['foo', 'bar'];
            arrayUtils.removeAt(array, 1);

            test.deepEqual(array, ['foo']);
            test.done();
        },

        'Correctly removes value from array at given index 2': function(test){
            var array = ['foo', 'bar'];
            arrayUtils.removeAt(array, 0);

            test.deepEqual(array, ['bar']);
            test.done();
        },

        'Does not throw if index is out of bounds': function(test){
            var array = ['foo', 'bar'];

            test.doesNotThrow(function(){
                arrayUtils.removeAt(array, 5);
                test.deepEqual(array, ['foo', 'bar']);
            });

            test.done();
        }
    },

    'removeLast': {
        'Does not throw if array is empty': function(test){
            test.doesNotThrow(function(){
                arrayUtils.removeLast([]);
            });

            test.done();
        },

        'Correctly remove at the last index': function(test){
            var array = ['foo', 'bar'];
            arrayUtils.removeLast(array);

            test.deepEqual(array, ['foo']);

            test.done();
        }
    },

    'insertAt': {
        'Correctly inserts value at desired position': function(test){
            var array = ['foo', 'bar'];
            arrayUtils.insertAt(array, 1, 'bang');

            test.deepEqual(array, ['foo', 'bang', 'bar']);
            test.done();
        }
    },

    'series': {
        'Check that array is created in correct ascending order': function(test){
            test.deepEqual(arrayUtils.series(0, 10), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
            test.deepEqual(arrayUtils.series(-2, 2), [-2, -1, 0, 1, 2]);
            test.deepEqual(arrayUtils.series(-10, -5), [-10, -9, -8, -7, -6, -5]);

            test.done();
        },

        'Check that array is created in correct descending order': function(test){
            test.deepEqual(arrayUtils.series(10, 0), [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]);
            test.deepEqual(arrayUtils.series(2, -2), [2, 1, 0, -1, -2]);
            test.deepEqual(arrayUtils.series(-5, -10), [-5, -6, -7, -8, -9, -10]);

            test.done();
        }
    },

    'pretty': {
        'Check that it produces the right result with default value': function(test){
            test.equal('Foo, Bar e FooBar', arrayUtils.pretty(['Foo', 'Bar', 'FooBar']));

            test.done();
        },

        'Check that it produces the right result with not default value': function(test){
            test.equal('Foo, Bar and FooBar', arrayUtils.pretty(['Foo', 'Bar', 'FooBar'], 'and'));

            test.done();
        }
    },

    'clean': {
        'Check that right values are removed from array': function(test){
            test.deepEqual(['foo', 'bar'], arrayUtils.clean(['foo', undefined, undefined, 'bar', undefined], undefined));
            test.deepEqual(['this', 2, 'is', 'it'], arrayUtils.clean([false, 'this', 2, 'is', false, 'it'], false));

            test.done();
        }
    },

    'intersection': {
        'Check that results are correct': function(test){
            var a = [1, 2, 3, 4];
            var b = [2, 3, 4, 5];

            test.deepEqual(arrayUtils.intersection(b, a), [2, 3, 4]);
            test.done();
        },

        'Check that results are the same no matter the order of the parameters': function(test){
            var a = [1, 2, 3, 4];
            var b = [2, 3, 4, 5];

            test.deepEqual(arrayUtils.intersection(a, b), arrayUtils.intersection(b, a));
            test.done();
        },
    },

    'toDictionary': {
        'Check that it works': function(test){
            var array = [{id: 1, name: 'foo'}, {id: 2, name: 'bar'}];
            test.deepEqual(arrayUtils.toDictionary(array, 'id'), {'1': {id: 1, name: 'foo'}, '2': {id: 2, name: 'bar'}});

            test.done();
        },

        'Check that object gets overwritten if there is another array element with same value for the given key': function(test){
            var array = [{id: 1, name: 'foo'}, {id: 2, name: 'bar'}, {id: 2, name: 'fuark'}];
            test.deepEqual(arrayUtils.toDictionary(array, 'id'), {'1': {id: 1, name: 'foo'}, '2': {id: 2, name: 'fuark'}});

            test.done();
        },
    },

    'chop': {
        'Check that result includes elements when `array.length % quantity !== 0`': function(test){
            var array = [1, 2, 3, 4, 5];
            test.deepEqual([[1, 2, 3, 4], [5]], arrayUtils.chop(array, 4));
            test.deepEqual([[1, 2, 3], [4, 5]], arrayUtils.chop(array, 3));
            test.deepEqual([[1, 2], [3, 4], [5]], arrayUtils.chop(array, 2));
            test.deepEqual([[1], [2], [3], [4], [5]], arrayUtils.chop(array, 1));
            test.done();
        }
    }
};