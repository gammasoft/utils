'use strict';

var _ = require('underscore'),
    fs = require('fs'),
    utils = require('./index'),
    glob = require('glob'),
    marked = require('marked'),
    pack = require('./package.json');

module.exports = function(grunt) {

    grunt.initConfig({
        htmlmin: {
            html: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'docs/index.html': 'docs/index.html'
                }
            }
        },

        nodeunit : {
            all : ['tests/*.js']
        },

        jshint: {
            all: [
                'Gruntfile.js',
                'index.js',
                'tests/**/*.js',
                'lib/**/*.js'
            ],
            options: {
                node: true,
                camelcase: true,
                curly: true,
                eqeqeq: true,
                bitwise: true,
                forin: true,
                immed: true,
                indent: 4,
                latedef: true,
                newcap: true,
                noarg: true,
                noempty: true,
                nonew: true,
                plusplus: false,
                quotmark: 'single',
                undef: true,
                unused: true,
                strict: true,
                trailing: true,
                maxparams: 4,
                maxdepth: 3
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    grunt.registerTask('test', [
        'jshint',
        'nodeunit'
    ]);

    grunt.registerTask('generateDocs', function() {
        var allTogetherTemplate = _.template(fs.readFileSync('./docs/allTogetherTemplate.html').toString()),
            moduleTemplate = _.template(fs.readFileSync('./docs/moduleTemplate.html').toString()),
            //sidebarTemplate = _.template(fs.readFileSync('./docs/sidebarTemplate.html').toString()),
            index = [],
            body = '';

        glob.sync(__dirname + '/lib/*Utils.js').forEach(function(modulePath) {
            var module = require(modulePath),
                tests = require(modulePath.replace('/lib/', '/tests/').replace('.js', 'Test.js'));

            delete tests.__name;
            delete tests.__description;

            var lengthOfFunctions = Object.keys(tests).length,
                functionPluralization = lengthOfFunctions === 1 ? 'function' : 'functions';

            if(lengthOfFunctions === 0) {
                return;
            }

            index.push([
                '<a href="#',
                module.__name,
                '" title="',
                module.__description || '',
                '">',
                module.__name,
                ' (',
                lengthOfFunctions,
                '<span class="hidden-xs">&nbsp;',
                functionPluralization,
                '</span>)',
                '</a>'
            ].join(''));

            body += moduleTemplate({
                name: module.__name,
                description: module.__description || '',
                tests: tests
            });
        });

        pack.contributors = pack.contributors.map(function(contributor) {
            contributor.avatar = [
                'http://gravatar.com/avatar/',
                utils.crypto.md5(contributor.email),
                '?s=40&d=identicon'
            ].join('');

            return contributor;
        }).sort(function(a, b) {
            return a.contributions < b.contributions;
        });

        pack.author = utils.string.parseFormattedEmailAddress(pack.author);
        pack.author.avatar = [
            'http://gravatar.com/avatar/',
            utils.crypto.md5(pack.author.email),
            '?s=15&d=identicon'
        ].join('');

        fs.writeFileSync('./docs/index.html', allTogetherTemplate({
            pack: pack,
            index: index,
            body: body,
            license: marked(fs.readFileSync('./LICENSE.md').toString())
        }));
    });

    grunt.registerTask('docs', [
        'generateDocs',
        'htmlmin'
    ]);
};