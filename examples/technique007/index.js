/**
 * 7 基准测试
 */

function sum() {
  var result = 0;
  for (var i = 0; i < 100000; i++) {
    result += i;
  }
  return result;
}

module.exports = () => {
  console.time('time used');
  sum();
  console.timeEnd('time used');
};
