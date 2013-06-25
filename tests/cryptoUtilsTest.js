var cryptoUtils = require("../cryptoUtils");

module.exports = {
	"md5: Check that md5 is properly calculated": function(test){
		test.ok(cryptoUtils.md5("gammautils"), "5c46d1c40197fdea3fc01dfca60a6b4e");
		test.ok(cryptoUtils.md5("Gammasoft Desenvolvimento de Software Ltda"), "f2b33e92cdcafc6d8873eb847639b573");
		test.done();
	},
		
	"cipher/decipher: Check that one can cipher and another can decipher properly": function(test){
		var value = "gammautils";
		var password = "password";
		
		var cipher = cryptoUtils.cipher(value, password);
		
		test.equal(value, cryptoUtils.decipher(cipher, password));
		test.done();
	}
};