/**
 * 9 传递命令行参数
 * 接受命令行参数，通过基准测试看读取文件速度
 */
const fs = require('fs');
const path = require('path');
const errStr = `
  * 执行：
  * node ${path.resolve(__dirname)}/index.js -h
  * node ${path.resolve(__dirname)}/index.js -r ./package.json`;

let args = {
  '-h': displayHelp,
  '-r': readFile
};

function displayHelp() {
  console.log(`
  --------------------
  Arguments processor:
    -h  Help
    -r  file to read
  --------------------
  `);
}

function readFile(file) {
  console.log('Reading file:', file);
  fs.createReadStream(file).pipe(process.stdout);
}

if (process.argv.length > 2) {
  process.argv.forEach(function (arg, index) {
    let handler = args[arg];
    handler && handler.apply(this, process.argv.slice(index + 1));
  });
} else {
  console.error(errStr);
  process.exit(1);
}

module.exports = () => {
  console.error(errStr);
  process.exit(1);
};
