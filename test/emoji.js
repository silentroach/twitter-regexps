const test = require("ava");

const regexp = require("../emoji");

function testEmoji(original, rawResults) {
  const results = [].concat(rawResults);

  test(`Should process [${original}]`, (t) => {
    const extracted = [];
    let matches;
    while ((matches = regexp.exec(original))) {
      extracted.push(matches[0]);
    }

    t.deepEqual(results, extracted);
  });
}

testEmoji("I 🧡 Twemoji! 🥳", ["🧡", "🥳"]);
