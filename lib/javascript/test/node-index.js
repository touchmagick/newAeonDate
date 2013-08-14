var qunit = require('qunit');

qunit.run({
    code: {

		// Include the source code
		path: './lib/javascript/js/newAeonDate.js',

		// What global var should it introduce for your tests?
		namespace: 'newAeonDate'

    },
    tests: [

		// Include the test suite(s)
		'./lib/javascript/test/newAeonDate.test.js'

    ]
});
