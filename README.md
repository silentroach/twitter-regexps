# Twitter precompiled regular expressions

[![npm](https://img.shields.io/npm/v/twitter-regexps.svg)](https://www.npmjs.com/package/twitter-regexps)
[![Travis](https://img.shields.io/github/actions/workflow/status/silentroach/twitter-regexps/test.yml?branch=master)](https://github.com/silentroach/twitter-regexps/actions)
[![install size](https://packagephobia.now.sh/badge?p=twitter-regexps)](https://packagephobia.now.sh/result?p=twitter-regexps)

Some regular expressions extracted from [twitter-text package](https://www.npmjs.com/package/twitter-text) and optimized with [regexp-tree](https://www.npmjs.com/package/regexp-tree).

The reason I create this package is the `twitter-text` original package size (about 2Mb) and amount of work compiler and processor needs to do just to use it (all regexps are compiling at runtime). Here in my package with compiled regexps, so you can use only regexps you need.

<!-- CUT -->

Packages used:

- twitter-text@3.1.0
- twemoji-parser@14.0.0

## Current list of regular expressions

- url
- cashtag
- hashtag
- mention
- emoji
- hashsign
- atsign

## Examples

### cashtag

Extract cashtags. [source](cashtag.js)

```js
var regexp = require('twitter-regexps/cashtag');

var data = regexp.exec('Some text with cashtag $GE');
data.2; // '$' (sign)
data.3; // 'GE' (cashtag)
data.index; // 22 (position)
```

### emoji

Extract emoji. [source](emoji.js)

```js
var regexp = require('twitter-regexps/emoji');

var data = regexp.exec('Some text with 🧡 Twemoji!');
data.0; // '🧡' (emoji)
data.index; // 15 (position)
```

### hashtag

Extract hashtags. [source](hashtag.js)

```js
var regexp = require('twitter-regexps/hashtag');

var data = regexp.exec('Some text with #hashtag');
data.2; // '#' (sign)
data.3; // 'hashtag' (hashtag)
data.index; // 14 (position)
```

### mention

Extract mentions. [source](mention.js)

```js
var regexp = require('twitter-regexps/mention');

var data = regexp.exec('Some @username mention');
data.2; // '@' (sign)
data.3; // 'username' (username)
data.index; // 4 (position)
```

### url

Extract urls. [source](url.js)

```js
var regexp = require('twitter-regexps/url');

var data = regexp.exec('Some tweet with https://www.wikipedia.org/wiki/twitter link');
data.3; // 'https://www.wikipedia.org/wiki/twitter' (url)
data.4; // 'https://' (protocol)
data.5; // 'www.wikipedia.org' (domain)
data.7; // '/wiki/twitter' (path)
data.index; // 15 (position)
```
