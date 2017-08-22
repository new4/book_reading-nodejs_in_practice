/**
 * 3 加载一组相关的模块
 * 归拢本目录下的所有模块并一次性导出
 */
let technique = {
  module1: require('./module1.js'),
  module2: require('./module2.js'),
  module3: require('./module3.js')
}
module.exports = technique;
