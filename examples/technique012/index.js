/**
 * 12 通过 `setTimerout` 延迟执行函数
 */
module.exports = () => {
  setTimeout(() => console.log('1秒后执行'), 1000);
  console.log('立即执行');

  function Boom() {
    this.message = 'Boom!';
  }

  Boom.prototype.explode = function () {
    console.log(this.message);
  }

  let boom = new Boom();

  setTimeout(boom.explode.bind(boom), 2000);
};
