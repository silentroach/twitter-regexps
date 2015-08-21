# Twitter precompiled regular expressions

[![npm](https://img.shields.io/npm/v/twitter-regexps.svg?style=flat-square)](https://www.npmjs.com/package/twitter-regexps)
[![David](https://img.shields.io/david/dev/silentroach/twitter-regexps.svg?style=flat-square&label=deps)](https://david-dm.org/silentroach/twitter-regexps#info=devDependencies)

Some regular expressions extracted from [twitter-text package](https://www.npmjs.com/package/twitter-text).

All regexps are provided as is without any modifications.

<!-- CUT -->

## hashtag

Extract hashtags.

### Examples

```js
var regexps = require('twitter-regexps');

var data = regexps.hashtag.exec('Some text with #hashtag');
/* hashtag  */ data.3;     // 'hashtag'
/* position */ data.index; // 14
```

## mention

Extract mentions.

### Examples

```js
var regexps = require('twitter-regexps');

var data = regexps.mention.exec('Some @username mention');
/* username */ data.3;     // 'username'
/* position */ data.index; // 4
```

## url

Extract urls.

### Examples

```js
var regexps = require('twitter-regexps');

var data = regexps.url.exec('Some tweet with https://www.wikipedia.org/wiki/twitter link');
/* url      */ data.3;     // 'https://www.wikipedia.org/wiki/twitter'
/* protocol */ data.4;     // 'https://'
/* domain   */ data.5;     // 'www.wikipedia.org'
/* path     */ data.7;     // '/wiki/twitter'
/* position */ data.index; // 15
```