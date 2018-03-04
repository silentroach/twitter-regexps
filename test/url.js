const test = require('ava').test;

const regexp = require('../url');

function testCashtag(original, rawResults) {

	const results = [].concat(rawResults);

	test(`Should process [${original}]`, t => {
		const extracted = [];
		while (regexp.exec(original)) {
			extracted.push([RegExp.$3, RegExp.$4, RegExp.$5, RegExp.$7]);
		}

		t.deepEqual(results, extracted);
	});

}

testCashtag('Some tweet with https://www.wikipedia.org/wiki/twitter link', [
	[
		'https://www.wikipedia.org/wiki/twitter',
		'https://', 'www.wikipedia.org', '/wiki/twitter'
	]
]);

testCashtag('Some tweet with multiple links, https://www.wikipedia.org/wiki/twitter and https://ya.ru', [
	[
		'https://www.wikipedia.org/wiki/twitter',
		'https://', 'www.wikipedia.org', '/wiki/twitter'
	], [
		'https://ya.ru',
		'https://', 'ya.ru', ''
	]
]);
