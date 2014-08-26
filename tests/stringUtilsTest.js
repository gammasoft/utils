'use strict';

var stringUtils = require('../lib/stringUtils');

module.exports = {
    'capitalize': {
        'Test that it works': function(test) {
            test.equal(stringUtils.capitalize('renato'), 'Renato');
            test.equal(stringUtils.capitalize('gammasoft'), 'Gammasoft');
            test.done();
        },

        'Wont throw any error if not string and value will pass': function(test) {
            test.equal(stringUtils.capitalize(null), null);
            test.equal(stringUtils.capitalize(undefined), undefined);
            test.equal(stringUtils.capitalize(123), 123);
            test.done();
        },
    },
    'Line': {
        '"add" property exposes defaults parsers': function(test) {
            var line = new stringUtils.Line();

            test.equal(typeof line.add.value, 'function');

            test.done();
        },

        'Can pass custom parsers': function(test) {
            var line = new stringUtils.Line({
                numericValue: function(){}
            });

            test.equal(typeof line.add.numericValue, 'function');

            test.done();
        },

        'Can add values and retrieve': function(test) {
            var line = new stringUtils.Line();

            line.add.value('this');
            line.add.value('is');
            line.add.value('a');
            line.add.value('test');

            test.equal(line.toString(), 'thisisatest');
            test.done();
        },

        'Can add values and retrieve with separator': function(test) {
            var line = new stringUtils.Line();

            line.add.value('this');
            line.add.value('is');
            line.add.value('a');
            line.add.value('test');

            test.equal(line.toString(' '), 'this is a test');
            test.done();
        },

        'Can pass size limiter for a line': function(test) {
            var line = new stringUtils.Line(5);

            test.throws(function() {
                line.add.value('Gammasoft');
            });

            test.done();
        },

        'Verify that custom parsers works': function(test) {
            var line = new stringUtils.Line({
                number: function(value) {
                    return 'NUMBER: ' + value;
                },
                string: function(value) {
                    return 'STRING: ' + value;
                }
            });

            line.add.number(42);
            line.add.string('OK');

            test.equal(line.toString(' - '), 'NUMBER: 42 - STRING: OK');
            test.done();
        },

        'Verify that size limit is applied after value goes though the custom parsers': function(test) {
            var line = new stringUtils.Line(3, {
                number: function(value) {
                    return 'NUMBER: ' + value;
                }
            });

            test.throws(function() {
                line.add.number(42);
            });

            test.done();
        },

        'Verify that can add a label to a value and can export it': function(test) {
            var line = new stringUtils.Line();

            line.add.value('Gammasoft').labeled('Company Name');
            line.add.value(1).labeled('Number Of Employees');

            test.equal(line.toString(';', true), 'Company Name;Number Of Employees\nGammasoft;1');
            test.done();
        },

        'Verify that "parsers" object is not modified in a way they feed the same "records" array': function(test) {
            var parsers = {
                    lowerCaseString: function(value) {
                        return value.toLowerCase();
                    }
                },
                line1 = new stringUtils.Line(5, parsers),
                line2 = new stringUtils.Line(5, parsers);

            line1.add.lowerCaseString('Gamma');

            test.doesNotThrow(function() {
                line2.add.lowerCaseString('soft');
            });

            test.done();
        }
    },

    'truncate': {
        'Verifiy that words are keep intact if length is ok': function(test) {
            test.equal(stringUtils.truncate('Gammasoft', 100), 'Gammasoft');
            test.equal(stringUtils.truncate('123', 5), '123');

            test.done();
        },

        'Verifiy that words are properly truncated': function(test) {
            test.equal(stringUtils.truncate('Gammasoft', 5), 'Gamma');
            test.equal(stringUtils.truncate('12345', 1), '1');

            test.done();
        },

        'Verifiy that length can be passed as a string': function(test) {
            test.equal(stringUtils.truncate('Gammasoft', '5'), 'Gamma');

            test.done();
        },

        'Verifiy that string can be passaed as a number': function(test) {
            test.equal(stringUtils.truncate(12345, '2'), '12');

            test.done();
        }
    },

    'slugify': {
        //Taken from underscore.string, all credits to them
        'Testing basic functionality': function(test) {
            test.equal(stringUtils.slugify('Jack & Jill like numbers 1,2,3 and 4 and silly characters ?%.$!/'), 'jack-jill-like-numbers-123-and-4-and-silly-characters');
            test.equal(stringUtils.slugify('Un éléphant à l\'orée du bois'), 'un-elephant-a-loree-du-bois');
            test.equal(stringUtils.slugify('I know latin characters: á í ó ú ç ã õ ñ ü ă ș ț'), 'i-know-latin-characters-a-i-o-u-c-a-o-n-u-a-s-t');
            test.equal(stringUtils.slugify('I am a word too, even though I am but a single letter: i!'), 'i-am-a-word-too-even-though-i-am-but-a-single-letter-i');
            test.equal(stringUtils.slugify(''), '');
            test.equal(stringUtils.slugify(null), '');
            test.equal(stringUtils.slugify(undefined), '');
            test.done();
        }
    },

    'dasherize': {
        //Taken from underscore.string, all credits to them
        'Testing basic functionality': function(test) {
            test.equal(stringUtils.dasherize('the_dasherize_string_method'), 'the-dasherize-string-method');
            test.equal(stringUtils.dasherize('TheDasherizeStringMethod'), '-the-dasherize-string-method');
            test.equal(stringUtils.dasherize('thisIsATest'), 'this-is-a-test');
            test.equal(stringUtils.dasherize('this Is A Test'), 'this-is-a-test');
            test.equal(stringUtils.dasherize('thisIsATest123'), 'this-is-a-test123');
            test.equal(stringUtils.dasherize('123thisIsATest'), '123this-is-a-test');
            test.equal(stringUtils.dasherize('the dasherize string method'), 'the-dasherize-string-method');
            test.equal(stringUtils.dasherize('the  dasherize string method  '), 'the-dasherize-string-method');
            test.equal(stringUtils.dasherize('téléphone'), 'téléphone');
            test.equal(stringUtils.dasherize('foo$bar'), 'foo$bar');
            test.equal(stringUtils.dasherize(''), '');
            test.equal(stringUtils.dasherize(null), '');
            test.equal(stringUtils.dasherize(undefined), '');
            test.equal(stringUtils.dasherize(123), '123');
            test.done();
        }
    },

    'parseFormattedEmailAddress': {
        'Check that parses correctly': function(test) {
            var email = 'Renato Gama <renatogama@example.com>',
                data = stringUtils.parseFormattedEmailAddress(email);

            test.equal(data.name, 'Renato Gama');
            test.equal(data.email, 'renatogama@example.com');
            test.done();
        },

        'Return same thing if no formatted email detected': function(test) {
            test.equal(stringUtils.parseFormattedEmailAddress(42), 42);
            test.equal(stringUtils.parseFormattedEmailAddress(undefined), undefined);
            test.equal(stringUtils.parseFormattedEmailAddress('Not a formatted email address'), 'Not a formatted email address');

            test.done();
        }
    },
    'getSearchString': {
        'Check that search string is generated properly': function(test) {
            test.equal(stringUtils.getSearchString('São Paulo'), 'saopaulo');
            test.equal(stringUtils.getSearchString(' São-Paulo. Rio-de-Janeiro.'), 'saopauloriodejaneiro');

            test.done();
        }
    },

    'generateGuid': {
        //too random to test
    },

    'pad': {
        'Check that pads left/right/both positions': function(test){
            test.equal(stringUtils.pad('1', 5, '0'), '00001');
            test.equal(stringUtils.pad('1', 5, '0', 'left'), '00001');
            test.equal(stringUtils.pad('1', 5, '0', 'right'), '10000');
            test.equal(stringUtils.pad('1', 5, '0', 'both'), '00100');

            test.done();
        }
    },

    'removeDiacritics': {
        'Can remove most commom diacritics': function(test){
            test.equal(stringUtils.removeDiacritics('áâàãÁÂÀÃéêèÉÊÈíîìÍÎÌóôòõÓÔÒÕúûùÚÛÙ'), 'aaaaAAAAeeeEEEiiiIIIooooOOOOuuuUUU');
            test.done();
        }
    },

    'reverseString': {
        'Can reverse a string': function(test){
            test.equal(stringUtils.reverseString('Gammasoft Desenvolvimento de Software Ltda'), 'adtL erawtfoS ed otnemivlovneseD tfosammaG');
            test.done();
        }
    },

    'findSuffix': {
        'Returns expected results': function(test){
            var data;

            data = [
                    'Metallica - Ride The Lightning - Uploaded by John Doe',
                    'Metallica - Master Of Puppets - Uploaded by John Doe',
                    'Metallica - ...And Justice For All - Uploaded by John Doe',
                ];

            test.equal(stringUtils.findSuffix(data), ' - Uploaded by John Doe');

            data = [
                    '12346',
                    '123546',
                    '1246',
                ];

            test.equal(stringUtils.findSuffix(data), '46');

            test.done();
        }
    },

    'findPrefix': {
        'Returns expected results': function(test){
            var data;

            data = [
                    'Metallica - Ride The Lightning',
                    'Metallica - Master Of Puppets',
                    'Metallica - ...And Justice For All',
                ];

            test.equal(stringUtils.findPrefix(data), 'Metallica - ');

            data = [
                    '1234',
                    '1235',
                    '12',
                ];

            test.equal(stringUtils.findPrefix(data), '12');

            test.done();
        }
    },

    'removePrefix': {
        'Returns expected results': function(test){
            var data;

            data = [
                    'Metallica - Ride The Lightning',
                    'Metallica - Master Of Puppets',
                    'Metallica - ...And Justice For All'
                ];

            test.deepEqual(stringUtils.removePrefix(data), [
                'Ride The Lightning',
                'Master Of Puppets',
                '...And Justice For All'
            ]);

            data = [
                    '1234',
                    '1235',
                    '12',
                ];

            test.deepEqual(stringUtils.removePrefix(data), ['34', '35', '']);

            test.done();
        }
    },

    'startsWith': {
        'Returns expected results': function(test){
            test.ok(stringUtils.startsWith('startsWith', 'starts'));
            test.done();
        }
    },


    'endsWith': {
        'Returns expected results': function(test){
            test.ok(stringUtils.endsWith('endsWith', 'With'));
            test.done();
        }
    },

    'isIp': {
        'Check some correct IPs': function(test){
            test.ok(stringUtils.isIp('192.168.0.1'));
            test.ok(stringUtils.isIp('192.168.1.100'));
            test.ok(stringUtils.isIp('187.104.237.90'));

            test.done();
        },

        'Not IPs': function(test){
            test.ok(!stringUtils.isIp('foobar'));
            test.ok(!stringUtils.isIp('192.1681.100'));
            test.ok(!stringUtils.isIp('187.a.237.90'));

            test.done();
        },
    },

    'getUrlSubpaths': {
        'Returns expected results': function(test){
            test.deepEqual(stringUtils.getUrlSubpaths('/this/is/a/good/test/'), [
                'this',
                'this/is',
                'this/is/a',
                'this/is/a/good',
                'this/is/a/good/test',
            ]);

            test.done();
        }
    },

    'joinUrls': { //move to urlUtils
        'Returns expected results': function(test){
            test.equal(stringUtils.joinUrls('', '/is/good'), '/is/good');
            test.equal(stringUtils.joinUrls('/testing', ''), '/testing');
            test.equal(stringUtils.joinUrls('/testing', '/is/good'), '/testing/is/good');
            test.equal(stringUtils.joinUrls('/testing/', '/is/good'), '/testing/is/good');
            test.equal(stringUtils.joinUrls('/testing/', 'is/good'), '/testing/is/good');
            test.equal(stringUtils.joinUrls('/testing', 'is/good'), '/testing/is/good');
            test.done();
        }
    },

    'nextSizeType': {
        'Returns expected results': function(test){
            test.equal(stringUtils.nextSizeType('b'), 'Kb');
            test.equal(stringUtils.nextSizeType('Kb'), 'Mb');
            test.equal(stringUtils.nextSizeType('Mb'), 'Gb');
            test.equal(stringUtils.nextSizeType('Gb'), 'Tb');
            test.equal(stringUtils.nextSizeType('Tb'), 'Pb');
            test.equal(stringUtils.nextSizeType('Pb'), 'Pb');

            test.done();
        },

        'Returns null if not expected value is passed': function(test){
            test.equal(stringUtils.nextSizeType('thisIsNotValid'), null);
            test.equal(stringUtils.nextSizeType('fooBar'), null);
            test.equal(stringUtils.nextSizeType('123'), null);
            test.equal(stringUtils.nextSizeType('asdfg'), null);

            test.done();
        }
    },

    'formatFileSize': {
        'Formats as expected': function(test){
            test.equal(stringUtils.formatFileSize(0, 'b'), '0.00b');
            test.equal(stringUtils.formatFileSize(500, 'b'), '500.00b');
            test.equal(stringUtils.formatFileSize(500, 'b', 0), '500b');
            test.equal(stringUtils.formatFileSize(1024, 'b', 2), '1.00Kb');
            test.equal(stringUtils.formatFileSize(1024, 'b'), '1.00Kb');
            test.equal(stringUtils.formatFileSize(2048, 'b', 3), '2.000Kb');
            test.equal(stringUtils.formatFileSize(2013, 'Mb', 4), '1.9658Gb');
            test.equal(stringUtils.formatFileSize(2912, 'Gb', 5), '2.84375Tb');
            test.equal(stringUtils.formatFileSize(1025, 'Tb', 1), '1.0Pb');
            test.equal(stringUtils.formatFileSize(2048, 'Pb', 0), '2048Pb');
            test.done();
        }
    },

    'parseSequence': {
        'Correctly parses a sequence (segment length can be number string)': function(test){
            var sd = {
                    'Valor Fixo': 3,
                    'Codigo da Uf': 2,
                    'AAMM da Emissao': '4',
                    'CNPJ do Emitente': 14,
                    'Modelo': 2,
                    'Serie': '3',
                    'Numero da NFe': 9,
                    'Codigo Numerico': '9',
                    'DV': 1
                };

            stringUtils.parseSequence('NFe52110200132781000178550010000005480000005481', sd);

            test.equal(sd['Valor Fixo'], 'NFe');
            test.equal(sd['Codigo da Uf'], '52');
            test.equal(sd['AAMM da Emissao'], '1102');
            test.equal(sd['CNPJ do Emitente'], '00132781000178');
            test.equal(sd.Modelo, '55');
            test.equal(sd.Serie, '001');
            test.equal(sd['Numero da NFe'], '000000548');
            test.equal(sd['Codigo Numerico'], '000000548');
            test.equal(sd.DV, '1');
            test.done();
        }
    },

    'onlyLettersAndNumbers': {
        'Check that only contains letters and numbers': function(test){
            test.ok(stringUtils.onlyLettersAndNumbers('AaBbCc1872817873aodsiufh'));
            test.ok(stringUtils.onlyLettersAndNumbers('AOIUHAoiuhi3429876492iuyegfwuadiu'));

            test.equal(stringUtils.onlyLettersAndNumbers('abcdefgh_32234'), false);
            test.equal(stringUtils.onlyLettersAndNumbers('!@#$%ˆ&*()'), false);
            test.equal(stringUtils.onlyLettersAndNumbers('{}|{}|\':A\': çdc'), false);

            test.done();
        },

        'Check that only contains letters and numbers of a given size': function(test){
            test.ok(stringUtils.onlyLettersAndNumbers('abc123', '6'));
            test.ok(stringUtils.onlyLettersAndNumbers('abc123', 6));
            test.ok(stringUtils.onlyLettersAndNumbers('abcedfghi', '9'));
            test.ok(stringUtils.onlyLettersAndNumbers('abcedfghi', 9));
            test.ok(stringUtils.onlyLettersAndNumbers('', '*'));
            test.ok(stringUtils.onlyLettersAndNumbers('1', '+'));
            test.ok(stringUtils.onlyLettersAndNumbers('a', '+'));
            test.ok(stringUtils.onlyLettersAndNumbers('1324wef234efwga', '+'));

            test.equal(stringUtils.onlyLettersAndNumbers('', '+'), false);
            test.equal(stringUtils.onlyLettersAndNumbers('123asd', '1'), false);
            test.equal(stringUtils.onlyLettersAndNumbers('{}|{}|\':A\': çdc', '5'), false);

            test.done();
        }
    },

    'getRandomString': {
        'Check length of string': function(test){
            test.ok(stringUtils.getRandomString(10).length === 10);
            test.ok(stringUtils.getRandomString(5).length === 5);
            test.done();
        },

        'Check that string contains only numbers': function(test){
            test.ok(/^\d+$/.test(stringUtils.getRandomString(5, '1234567890')));
            test.ok(/^\d+$/.test(stringUtils.getRandomString(5, '1234567890')));
            test.ok(/^\d+$/.test(stringUtils.getRandomString(5, '1234567890')));
            test.ok(/^\d+$/.test(stringUtils.getRandomString(5, '1234567890')));
            test.ok(/^\d+$/.test(stringUtils.getRandomString(5, '1234567890')));
            test.ok(/^\d+$/.test(stringUtils.getRandomString(5, '1234567890')));
            test.ok(/^\d+$/.test(stringUtils.getRandomString(5, '1234567890')));
            test.ok(/^\d+$/.test(stringUtils.getRandomString(5, '1234567890')));
            test.ok(/^\d+$/.test(stringUtils.getRandomString(5, '1234567890')));
            test.ok(/^\d+$/.test(stringUtils.getRandomString(5, '1234567890')));

            test.done();
        }
    },

    'shortenName': {
        'Check that names are properly shortened with level 0': function(test){
            test.equal('Elizabeth C. Finnegan', stringUtils.shortenName('Elizabeth Claire Finnegan'));
            test.equal('Hannah J. Whittaker', stringUtils.shortenName('Hannah Jocelyn Whittaker'));
            test.equal('Madeline Eve Cooper', stringUtils.shortenName('Madeline Eve Cooper'));
            test.equal('Alyssa Marie', stringUtils.shortenName('Alyssa Marie'));
            test.equal('Catherine F. M. C. Galon', stringUtils.shortenName('Catherine Françoise Marie Christine Galon'));
            test.equal('Armand-Jean Du Plessis', stringUtils.shortenName('Armand-Jean Du Plessis'));

            test.done();
        },

        'shortenName: Check that names are properly shortened with level 1': function(test){
            test.equal('Elizabeth Finnegan', stringUtils.shortenName('Elizabeth Claire Finnegan', 1));
            test.equal('Hannah Whittaker', stringUtils.shortenName('Hannah Jocelyn Whittaker', 1));
            test.equal('Madeline Cooper', stringUtils.shortenName('Madeline Eve Cooper', 1));
            test.equal('Alyssa Marie', stringUtils.shortenName('Alyssa Marie', 1));
            test.equal('Catherine Galon', stringUtils.shortenName('Catherine Françoise Marie Christine Galon', 1));
            test.equal('Armand-Jean Plessis', stringUtils.shortenName('Armand-Jean Du Plessis', 1));

            test.done();
        }
    },

    'splitWords': {
        'Check no whitespace characters are included': function(test){
            test.deepEqual(['This', 'is', 'the', 'expected', 'result'], stringUtils.splitWords(' This   is the    expected        result    '));

            test.done();
        }
    },

    'getLink': {
        'Generates a proper link': function(test){
            test.equal('<a href="/test.html">test</a>', stringUtils.getLink('test', {href: '/test.html'}));

            test.equal('<a title="The Title" href="/test.html">test</a>', stringUtils.getLink('test', {
                href: '/test.html',
                title: 'The Title'
            }));

            test.equal('<a target="_blank" href="/test.html">test</a>', stringUtils.getLink('test', {
                href: '/test.html',
                target: '_blank'
            }));

            test.equal('<a title="The Title" target="_blank" href="/test.html">test</a>', stringUtils.getLink('test', {
                href: '/test.html',
                title: 'The Title',
                target: '_blank'
            }));

            test.done();
        }
    }
};