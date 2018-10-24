const path = require('path');
const fs = require('fs');
const del = require('del');
const chalk = require('chalk');
const {optimize} = require('regexp-tree');

require('babel-register')({
	only: '/original',
	plugins: [
		'transform-es2015-modules-commonjs'
	]
});

const twitterTextPackageInfo = require('../original/js/package.json');

const regexps = require('../original/js/src/regexp').default;
regexps.extractUrl = require('../original/js/src/regexp/extractUrl').default;

const map = require('./map');

const headerComment = `// generated automatically from twitter-text@${twitterTextPackageInfo.version} (${twitterTextPackageInfo.homepage})`;

const outputPath = path.resolve(__dirname, '..');

const modules = [];

del.sync([path.resolve(__dirname, '../*.js')]);

Object.keys(map).forEach(regexenKey => {
	const targetName = map[regexenKey];
	const regexp = regexps[regexenKey];

	if (undefined === regexp) {
		throw new Error('Failed to find regexp ' + regexenKey);
	}

	modules.push(targetName);

	console.log(`${chalk.grey('›')} ${chalk.green(`optimizing ${targetName}...`)}`);

	const optimized = optimize(regexp).toString();

	const moduleContent = [
		`${headerComment}`,
		'',
		`// [twitter-text/src/regexp]::${regexenKey}`,
		`module.exports = ${optimized};`
	].join('\n');

	fs.writeFileSync(path.resolve(outputPath, targetName + '.js'), moduleContent);
});

const indexModuleContent = `${headerComment}

${modules.map(name => {
	return `exports.${name} = require('./${name}.js');`
}).join('\n')}
`;

fs.writeFileSync(path.resolve(outputPath, 'index.js'), indexModuleContent);
