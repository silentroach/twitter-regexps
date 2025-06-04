import { test, expect } from "vitest";
import regexp from "../hashtag.js";

function testHashtag(original, rawResults) {
  const results = [].concat(rawResults);

  test(`Should process [${original}]`, () => {
    const extracted = [];
    while (regexp.exec(original)) {
      expect(RegExp.$2).toBe("#");

      extracted.push(RegExp.$3);
    }

    expect(extracted).toEqual(results);
  });
}

testHashtag("Some text with #hashtag", "hashtag");
testHashtag("Multiple tags, for example #hashtag and #hashtag2", [
  "hashtag",
  "hashtag2",
]);
