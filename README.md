# Twitter precompiled regular expressions

[![npm](https://img.shields.io/npm/v/twitter-regexps.svg?style=flat-square)](https://www.npmjs.com/package/twitter-regexps)
[![Travis](https://img.shields.io/travis/silentroach/twitter-regexps.svg?style=flat-square&label=travis)](https://travis-ci.org/silentroach/twitter-regexps)

Some regular expressions extracted from [twitter-text package](https://www.npmjs.com/package/twitter-text).

All regexps are provided as is without any modifications.

<!-- CUT -->

Current used `twitter-text` package version is `1.14.6`.

## Examples

### cashtag

Extract cashtags.

```js
var regexp = require('twitter-regexps/cashtag');

var data = regexp.exec('Some text with cashtag $GE');
data.2; // '$' (sign)
data.3; // 'GE' (cashtag)
data.index; // 22 (position)
```

### hashtag

Extract hashtags.

```js
var regexp = require('twitter-regexps/hashtag');

var data = regexp.exec('Some text with #hashtag');
data.2; // '#' (sign)
data.3; // 'hashtag' (hashtag)
data.index; // 14 (position)
```

### mention

Extract mentions.

```js
var regexp = require('twitter-regexps/mention');

var data = regexp.exec('Some @username mention');
data.2; // '@' (sign)
data.3; // 'username' (username)
data.index; // 4 (position)
```

### url

Extract urls.

```js
var regexp = require('twitter-regexps/url');

var data = regexp.exec('Some tweet with https://www.wikipedia.org/wiki/twitter link');
data.3; // 'https://www.wikipedia.org/wiki/twitter' (url)
data.4; // 'https://' (protocol)
data.5; // 'www.wikipedia.org' (domain)
data.7; // '/wiki/twitter' (path)
data.index; // 15 (position)
```

