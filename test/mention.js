const test = require("ava");

const regexp = require("../mention");

function testMention(original, rawResults) {
  const results = [].concat(rawResults);

  test(`Should process [${original}]`, (t) => {
    const extracted = [];
    while (regexp.exec(original)) {
      t.is(RegExp.$2, "@");

      extracted.push(RegExp.$3);
    }

    t.deepEqual(results, extracted);
  });
}

testMention("Some @username mention", "username");
testMention("Some @username and @othername mentions", [
  "username",
  "othername",
]);
