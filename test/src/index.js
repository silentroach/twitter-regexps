import twitterText from 'twitter-text';
import assert from 'assert';

import regexps from '../..';
import map from '../../src/map';

describe('Generated regexps', () => {

	Object.keys(map).forEach(key => {
		const generatedKey = map[key];

		it(`should generate correct [${generatedKey}] regexp`, () => {
			assert.equal(regexps[generatedKey].source, twitterText.regexen[key].source);
		});
	});

});
