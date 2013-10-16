var validationUtils = require("../validationUtils");

module.exports = {
	"Check that valid emails are valid": function(test) {
		test.ok(validationUtils.isValidEmail("renatoargh@gmail.com"));
		test.ok(validationUtils.isValidEmail("contact@gammasoft.com.br"));
		test.ok(validationUtils.isValidEmail("fulano_de_tal@gmail.com"));
		test.ok(validationUtils.isValidEmail("renato@prv.ind.br"));
		
		test.done();
	},
	
	"Check that invalid emails are invalid": function(test) {
		test.ok(!validationUtils.isValidEmail("this is not an email"));
		test.ok(!validationUtils.isValidEmail("neither@this"));
		test.ok(!validationUtils.isValidEmail("not_an_email@gmail com"));
		test.ok(!validationUtils.isValidEmail("one-more%@gmail.com"));
		
		test.done();
	}
};