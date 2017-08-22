/**
 * 使用路径
 */
const path = require('path');
module.exports = () => {
  console.log(__dirname); // 目录路径
  console.log(__filename); //文件路径
  console.log(path.join(__dirname, '../index.js')); 
};
