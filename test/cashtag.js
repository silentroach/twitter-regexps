import { test, expect } from "vitest";
import regexp from "../cashtag.js";

function testCashtag(original, rawResults) {
  const results = [].concat(rawResults);

  test(`Should process [${original}]`, () => {
    const extracted = [];
    while (regexp.exec(original)) {
      expect(RegExp.$2).toBe("$");

      extracted.push(RegExp.$3);
    }

    expect(extracted).toEqual(results);
  });
}

testCashtag("Some text with cashtag $GE", "GE");
testCashtag("Multiple tags, for example $APPL and $GE", ["APPL", "GE"]);
