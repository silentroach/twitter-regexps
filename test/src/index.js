const twitterText = require('twitter-text');
const assert = require('assert');

const regexps = require('../..');
const map = require('../../src/map');

describe('Generated regexps', () => {

	Object.keys(map).forEach(key => {
		const generatedKey = map[key];

		it(`should generate correct [${generatedKey}] regexp`, () => {
			assert.equal(regexps[generatedKey].source, twitterText.regexen[key].source);
		});
	});

});
