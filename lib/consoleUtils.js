'use strict';

module.exports.clearScreen = function(){ process.stdout.write('\u001B[2J\u001B[0;0f'); };