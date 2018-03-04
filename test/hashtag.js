const test = require('ava').test;

const regexp = require('../hashtag');

function testCashtag(original, rawResults) {

	const results = [].concat(rawResults);

	test(`Should process [${original}]`, t => {
		const extracted = [];
		while (regexp.exec(original)) {
			t.is(RegExp.$2, '#');

			extracted.push(RegExp.$3);
		}

		t.deepEqual(results, extracted);
	});

}

testCashtag('Some text with #hashtag', 'hashtag');
testCashtag('Multiple tags, for example #hashtag and #hashtag2', ['hashtag', 'hashtag2']);
