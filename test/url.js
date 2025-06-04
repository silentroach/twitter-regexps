import { test, expect } from "vitest";
import regexp from "../url.js";

function testUrl(original, rawResults, name) {
  const results = [].concat(rawResults);

  test(name || `Should process [${original}]`, () => {
    const extracted = [];
    while (regexp.exec(original)) {
      extracted.push([RegExp.$3, RegExp.$4, RegExp.$5, RegExp.$7]);
    }

    expect(extracted).toEqual(results);
  });
}

testUrl("Some tweet with https://www.wikipedia.org/wiki/twitter link", [
  [
    "https://www.wikipedia.org/wiki/twitter",
    "https://",
    "www.wikipedia.org",
    "/wiki/twitter",
  ],
]);

testUrl(
  "Some tweet with multiple links, https://www.wikipedia.org/wiki/twitter and https://ya.ru",
  [
    [
      "https://www.wikipedia.org/wiki/twitter",
      "https://",
      "www.wikipedia.org",
      "/wiki/twitter",
    ],
    ["https://ya.ru", "https://", "ya.ru", ""],
  ],
);

testUrl("Some short link ya.ru", [["ya.ru", "", "ya.ru", ""]]);

testUrl(
  "http://twitter.com/は素晴らしい",
  [["http://twitter.com/", "http://", "twitter.com", "/"]],
  "Special non-latin case with disabled extraction cause of no space",
);
