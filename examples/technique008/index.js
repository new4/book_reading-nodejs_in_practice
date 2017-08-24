/**
 * 8 获取平台信息
 */
module.exports = () => {
  console.log('arch:', process.arch);
  console.log('platform:', process.platform);
  console.log('memoryUsage:', process.memoryUsage());
};
