import { test, expect } from "vitest";
import regexp from "../emoji.js";

function testEmoji(original, rawResults) {
  const results = [].concat(rawResults);

  test(`Should process [${original}]`, () => {
    const extracted = [];
    let matches;
    while ((matches = regexp.exec(original))) {
      extracted.push(matches[0]);
    }

    expect(extracted).toEqual(results);
  });
}

testEmoji("I 🧡 Twemoji! 🥳", ["🧡", "🥳"]);
