import { test, expect } from "vitest";
import regexp from "../mention.js";

function testMention(original, rawResults) {
  const results = [].concat(rawResults);

  test(`Should process [${original}]`, () => {
    const extracted = [];
    while (regexp.exec(original)) {
      expect(RegExp.$2).toBe("@");

      extracted.push(RegExp.$3);
    }

    expect(extracted).toEqual(results);
  });
}

testMention("Some @username mention", "username");
testMention("Some @username and @othername mentions", [
  "username",
  "othername",
]);
