const path = require('path');
const fs = require('fs');

const twitterText = require('twitter-text');
const twitterTextPackageInfo = require('twitter-text/package.json');
const jsStringEscape = require('js-string-escape');
const del = require('del');

const map = require('./map');

const headerComment = `// generated automatically from twitter-text@${twitterTextPackageInfo.version} (${twitterTextPackageInfo.homepage})`;

const outputPath = path.resolve(__dirname, '..');

const modules = [];

del.sync([path.resolve(__dirname, '../*.js')]);

Object.keys(map).forEach(regexenKey => {
	const targetName = map[regexenKey];
	const regexp = twitterText.regexen[regexenKey];

	if (undefined === regexp) {
		throw new Error('Failed to find regexp ' + regexenKey);
	}

	modules.push(targetName);

	const escaped = jsStringEscape(regexp);
	const [fake, escapedRegexp, escapedRegexpFlags] = escaped.match(/\/(.*)\/([^\/]*)/);

	const moduleContent = `${headerComment}

// require('twitter-text').regexen.${regexenKey}
module.exports = new RegExp("${escapedRegexp}", "${escapedRegexpFlags}");
`;

	fs.writeFileSync(path.resolve(outputPath, targetName + '.js'), moduleContent);
});

const indexModuleContent = `${headerComment}

${modules.map(name => {
	return `exports.${name} = require('./${name}.js');`
}).join('\n')}
`;

fs.writeFileSync(path.resolve(outputPath, 'index.js'), indexModuleContent);
