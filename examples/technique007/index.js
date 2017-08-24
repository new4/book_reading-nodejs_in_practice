/**
 * 7 基准测试
 * 接受命令行参数，通过基准测试看读取文件速度
 */
const fs = require('fs');
const path = require('path');

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
  --------------------`);
}

function readFile(file) {
  if (file && file.length) {
    console.log('Reading file:', file);
    console.time('read');

    let stream = fs.createReadStream(file);
    stream.on('end', () => console.timeEnd('read'));
    stream.pipe(process.stdout);
  } else {
    console.error('A file must be provided with the -r operation');
    process.exit(1);
  }
}

if (process.argv.length > 0) {
  process.argv.forEach(function (arg, index) {
    let handler = args[arg];
    handler && handler.apply(this, process.argv.slice(index + 1));
  });
}

module.exports = () => {
  console.log(`
    * 执行：
    * node ${path.resolve(__dirname)}/index.js -h
    * node ${path.resolve(__dirname)}/index.js -r ./package.json`);
};
