/**
 * 6 打印日志消息
 */
const path = require('path');
const exec = require('child_process').exec;

module.exports = () => {
  exec(`node ${path.resolve(__dirname)}/myconsole.js 1> ${path.resolve(__dirname)}/console.log`);
  exec(`node ${path.resolve(__dirname)}/myconsole.js 2> ${path.resolve(__dirname)}/console.error`);
};
