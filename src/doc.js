const fs = require("node:fs");
const path = require("node:path");
const util = require("node:util");
const chalk = require("chalk");

const twitterTextPackageInfo = require("../original/js/package.json");
const twemojiPackageInfo = require("../original-twemoji/package.json");
const regexps = require("../");

const readmePath = path.resolve(__dirname, "../README.md");
const docPath = path.resolve(__dirname, "doc/");

const splitter = "<!-- CUT -->";
const [docHeader] = fs
  .readFileSync(readmePath, { encoding: "UTF-8" })
  .split(splitter);
const regexpMap = require("./map");

function generateExecExampleData(regexp, example) {
  const result = regexp.exec(example.input);
  const args = example.args;

  return `var data = regexp.exec('${example.input}');
${Object.keys(args)
  .map((key) => {
    return `data.${key}; // ${util.inspect(result[key])} (${args[key]})`;
  })
  .join("\n")}`;
}

function generateExampleData(regexp, type, example) {
  switch (type) {
    case "exec":
      return example.map((element) => generateExecExampleData(regexp, element));
    default:
      throw new Error(`Unknown example type ${type}`);
  }
}

function generateDocumentForFile(filename) {
  const propname = path.basename(filename, ".json");
  const regexp = regexps[propname];
  const data = JSON.parse(
    fs.readFileSync(path.resolve(docPath, filename), { encoding: "UTF-8" })
  );

  console.log(
    `${chalk.grey("›")} ${chalk.green(`generating info for ${propname}...`)}`
  );

  let output = `
### ${propname} 

${data.description} [source](${propname}.js)
`;

  if (data.examples) {
    output += `
\`\`\`js
var regexp = require('twitter-regexps/${propname}');

${Object.keys(data.examples).map((key) =>
  generateExampleData(regexp, key, data.examples[key])
)}
\`\`\`
`;
  }

  return output;
}

const output = `${docHeader}${splitter}

Packages used:
* twitter-text@${twitterTextPackageInfo.version}
* twemoji-parser@${twemojiPackageInfo.version}

## Current list of regular expressions

${Object.keys(regexpMap)
  .map((key) => `* ${regexpMap[key]}`)
  .join("\n")}

## Examples
${fs
  .readdirSync(docPath)
  .map((filename) => generateDocumentForFile(filename))
  .join("")}
`;

fs.writeFileSync(readmePath, output);
