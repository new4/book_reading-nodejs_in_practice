/**
 * 15 Buffer 转换成其他格式
 */

const fs = require('fs');
module.exports = () => {
  fs.readFile(__filename, (err, buf) => {
    console.log('buf: ', buf);
    console.log('buf -> utf-8: ', buf.toString());
    console.log('buf -> ascii: ', buf.toString('ascii'));
  })
};
