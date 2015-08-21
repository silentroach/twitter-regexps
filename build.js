var path = require('path');
var fs = require('fs');

var twitterText = require('twitter-text');
var twitterTextPackageInfo = require('twitter-text/package.json');
var jsStringEscape = require('js-string-escape');
var del = require('del');

// twitter text regexen property => regexp filename
var map = {
	validHashtag: 'hashtag',
	validMentionOrList: 'mention',
	extractUrl: 'url'
};

var headerComment = '// generated automatically from twitter-text@' +
	twitterTextPackageInfo.version + ' (' + twitterTextPackageInfo.homepage + ')';

var modules = [];

del.sync(['*.js', '!build.js']);

Object.keys(map).forEach(function(regexenKey) {
	var targetName = map[regexenKey];
	var regexp = twitterText.regexen[regexenKey];

	if (undefined === regexp) {
		throw new Error('Failed to find regexp ' + regexenKey);
	}

	modules.push(targetName);

	var escaped = jsStringEscape(regexp);
	var parts = escaped.match(/\/(.*)\/([^\/]*)/);

	fs.writeFileSync(
		path.resolve(__dirname, targetName + '.js'),
		[
			headerComment,
			'// require(\'twitter-text\').regexen.' + regexenKey,
			'module.exports = new RegExp("' + parts[1] + '", "' + parts[2] + '");'
		].join('\n')
	);
});

fs.writeFileSync(
	path.resolve(__dirname, 'index.js'),
	[
		headerComment,
		'module.exports = {',
		modules.map(function(name) {
			return '\t' + name + ': require(\'./' + name + '.js\')';
		}).join(',\n'),
		'};'
	].join('\n')
);
