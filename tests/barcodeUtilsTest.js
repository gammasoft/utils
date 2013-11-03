'use strict';

var barcodeUtils = require('../lib/barcodeUtils');

module.exports = {
    'barcode128c': function(test){

        test.throws(function(){
            barcodeUtils.barcode128c('123');
        });

        test.throws(function(){
            barcodeUtils.barcode128c('123s');
        });

        var barcode1 = barcodeUtils.barcode128c('123456');
        test.equal(barcode1.checkDigit, 44);
        test.equal(barcode1.asciiString, 'Ò,BXLÓ');
        test.equal(barcode1.originalString, '123456');

        var barcode2 = barcodeUtils.barcode128c('012345678912');
        test.equal(barcode2.checkDigit, 42);
        test.equal(barcode2.asciiString, 'Ò!7Mcy,JÓ');
        test.equal(barcode2.originalString, '012345678912');

        var barcode3 = barcodeUtils.barcode128c('52060433009911002506550120000007800267301615');
        test.equal(barcode3.checkDigit, 13);
        test.equal(barcode3.asciiString, 'ÒT&$A Ì+ 9&W!4  \'p\'c>0/-Ó');
        test.equal(barcode3.originalString, '52060433009911002506550120000007800267301615');

        test.done();
    }
};