const test = require("ava");

const regexp = require("../cashtag");

function testCashtag(original, rawResults) {
  const results = [].concat(rawResults);

  test(`Should process [${original}]`, (t) => {
    const extracted = [];
    while (regexp.exec(original)) {
      t.is(RegExp.$2, "$");

      extracted.push(RegExp.$3);
    }

    t.deepEqual(results, extracted);
  });
}

testCashtag("Some text with cashtag $GE", "GE");
testCashtag("Multiple tags, for example $APPL and $GE", ["APPL", "GE"]);
