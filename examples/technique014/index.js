/**
 * 14 安全地操作异步接口
 */

const EventEmitter = require('events').EventEmitter;
const fs = require('fs');
let content; // 缓存

module.exports = () => {

  function readFileIfRequired(cb) {
    if (!content) {
      fs.readFile(__filename, 'utf8', (err, data) => {
        content = data;
        console.log('readFileIfRequired: readFile!');
        cb(err, content);
      })
    } else {
      process.nextTick(() => {
        console.log('readFileIfRequired: cached!');
        cb(null, content);
      });
    }
  }

  readFileIfRequired((err, data) => {
    console.log('1. length ', data.length);
    readFileIfRequired((err, data2) => {
      console.log('2. length ', data2.length);
    });
    console.log('reading file again! ...');
  });
  console.log('reading file! ...');
};
