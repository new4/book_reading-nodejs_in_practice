/**
 * 6 打印日志消息
 */
const path = require('path');
const exec = require('child_process').exec;

module.exports = () => {
  exec(`node ./examples/technique006/myconsole.js 1> ${path.resolve(__dirname)}/console.log`);
  exec(`node ./examples/technique006/myconsole.js 2> ${path.resolve(__dirname)}/console.error`);
};
