/**
 * 16 使用 `Buffer` 来修改字符串编码
 */

const fs = require('fs');
const path = require('path');
module.exports = () => {
  let mime = 'img/png';
  let encoding = 'base64';
  let file = path.join(__dirname, 'monkey.png');
  let data = fs.readFileSync(file).toString(encoding);
  let uri = `data:${mime};${encoding},${data}`;
  console.log(uri);
};
