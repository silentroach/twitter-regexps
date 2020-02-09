const path = require("path");
const fs = require("fs");
const del = require("del");
const chalk = require("chalk");
const { optimize } = require("regexp-tree");

const jsLoader = require.extensions[".js"];
require.extensions[".js"] = function(module, filename) {
  // don't know how to disable overriding babel config :{
  if (/babelPreset\.js$/.test(filename)) {
    return "";
  }

  return jsLoader.apply(this, arguments);
};

require("@babel/register")({
  only: ["original/js/src", "original-twemoji/src"],
  plugins: ["@babel/plugin-transform-modules-commonjs"]
});

const twitterTextPackageInfo = require("../original/js/package.json");
const twemojiPackageInfo = require("../original-twemoji/package.json");

const regexps = require("../original/js/src/regexp").default;
regexps.extractUrl = require("../original/js/src/regexp/extractUrl").default;
regexps.emoji = require("../original-twemoji/src/lib/regex").default;

const map = require("./map");

const headerComment = `/* generated automatically
 *
 * twitter-text@${twitterTextPackageInfo.version} (${twitterTextPackageInfo.homepage})
 * twemoji-parser@${twemojiPackageInfo.version}
 */
`;

const outputPath = path.resolve(__dirname, "..");

const modules = [];

del.sync([path.resolve(__dirname, "../*.js")]);

Object.keys(map).forEach(regexenKey => {
  const targetName = map[regexenKey];
  const regexp = regexps[regexenKey];

  if (undefined === regexp) {
    throw new Error("Failed to find regexp " + regexenKey);
  }

  modules.push(targetName);

  console.log(
    `${chalk.grey("›")} ${chalk.green(`optimizing ${targetName}...`)}`
  );

  const optimized = optimize(regexp).toString();

  const moduleContent = [
    `${headerComment}`,
    `module.exports = ${optimized};`
  ].join("\n");

  fs.writeFileSync(path.resolve(outputPath, targetName + ".js"), moduleContent);
});

const indexModuleContent = `${headerComment}
${modules
  .map(name => {
    return `exports.${name} = require('./${name}.js');`;
  })
  .join("\n")}
`;

fs.writeFileSync(path.resolve(outputPath, "index.js"), indexModuleContent);
