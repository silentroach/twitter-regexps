// generated automatically from twitter-text@3.0.1 (https://github.com/twitter/twitter-text)

// [twitter-text/src/regexp]::validCashtag
module.exports = /(^|[\x09-\x0D \x85\xA0\u1680\u180E\u2000-\u200A\u2028\u2029\u202F\u205F\u3000])(\$)([a-z]{1,6}(?:[._][a-z]{1,2})?)(?=$|\s|[!#$%&'()*+,\-./:;<=>?@[\\\]^_{|}~])/gi;