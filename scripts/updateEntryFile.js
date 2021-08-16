const fs = require('fs');
const version = require('../package.json').version;

function updateEntryFile() {
  let body = fs.readFileSync(`${process.cwd()}/package.json`, 'utf-8');
  body = body.replace(
    /\.\/dist\/inspirecloud.*\.js/g,
    `./dist/inspirecloud.min-${version}.js`
  );
  fs.writeFileSync(`${process.cwd()}/package.json`, body);
}
function updateReadme() {
  let body = fs.readFileSync(`${process.cwd()}/README.MD`, 'utf-8');
  body = body
    .replace(
      /https:\/\/unpkg\.com.*?\.js/g,
      `https://unpkg.com/@byteinspire/js-sdk@${version}/dist/inspirecloud.min-${version}.js`
    )
    .replace(/-\d\.\d\.\d.*?\.js/g, `-${version}.js`);
  fs.writeFileSync(`${process.cwd()}/README.MD`, body);
}

updateReadme();
updateEntryFile();
