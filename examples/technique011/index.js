/**
 * 11 响应信号量
 */
module.exports = () => {
  process.stdin.resume();
  process.on('SIGHUP', () => console.log('reloading configuration......'));
  console.log('PID: ', process.pid);
};
