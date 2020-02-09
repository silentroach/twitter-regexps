const test = require("ava");

const regexp = require("../hashtag");

function testHashtag(original, rawResults) {
  const results = [].concat(rawResults);

  test(`Should process [${original}]`, t => {
    const extracted = [];
    while (regexp.exec(original)) {
      t.is(RegExp.$2, "#");

      extracted.push(RegExp.$3);
    }

    t.deepEqual(results, extracted);
  });
}

testHashtag("Some text with #hashtag", "hashtag");
testHashtag("Multiple tags, for example #hashtag and #hashtag2", [
  "hashtag",
  "hashtag2"
]);
