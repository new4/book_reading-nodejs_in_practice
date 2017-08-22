/**
 * 5 标准 I/O 流的读写
 */
module.exports = () => {
  // 通知 stream 准备开始读数据
  process.stdin.resume();
  process.stdin.setEncoding('utf-8');

  process.stdin.on('data', (text) => {
    process.stdout.write(text.toUpperCase());
  })
};
