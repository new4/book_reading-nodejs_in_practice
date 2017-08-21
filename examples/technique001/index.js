/**
 * 安装并引入 chalk 模块
 */
const chalk = require('chalk');
function technique(){
    console.log(chalk.hex('#4acbd6')('Hello, world!'));
}
module.exports = technique;