/**
 * 13 通过 `setInterval` 定时调用回调函数
 */
module.exports = () => {
  function Boom() {
    this.message = '每 2s Boom 一次！';
  }

  Boom.prototype.explode = function () {
    console.log(this.message);
  }

  let boom = new Boom();

  setInterval(boom.explode.bind(boom), 2000);
};
