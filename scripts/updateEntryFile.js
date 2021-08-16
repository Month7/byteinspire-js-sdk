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

updateEntryFile();
