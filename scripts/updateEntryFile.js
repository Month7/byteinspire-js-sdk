const fs = require('fs');
const version = require('../package.json').version;

function updateEntryFile() {
  const path = `${process.cwd()}/package.json`;
  let body = fs.readFileSync(path, 'utf-8');
  body = body.replace(
    /\.\/dist\/inspirecloud.*\.js/g,
    `./dist/inspirecloud.min-${version}.js`
  );
  fs.writeFileSync(path, body);
}

function updateReadme() {
  const path = `${process.cwd()}/README.md`;
  let body = fs.readFileSync(path, 'utf-8');
  body = body
    .replace(
      /https:\/\/unpkg\.com.*?\.js/g,
      `https://unpkg.com/@byteinspire/js-sdk@${version}/dist/inspirecloud.min-${version}.js`
    )
    .replace(/-\d\.\d\.\d.*?\.js/g, `-${version}.js`);
  fs.writeFileSync(path, body);
}

updateReadme();
updateEntryFile();
