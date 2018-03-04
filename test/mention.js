const test = require('ava').test;

const regexp = require('../mention');

function testCashtag(original, rawResults) {

	const results = [].concat(rawResults);

	test(`Should process [${original}]`, t => {
		const extracted = [];
		while (regexp.exec(original)) {
			t.is(RegExp.$2, '@');

			extracted.push(RegExp.$3);
		}

		t.deepEqual(results, extracted);
	});

}

testCashtag('Some @username mention', 'username');
testCashtag('Some @username and @othername mentions', ['username', 'othername']);
