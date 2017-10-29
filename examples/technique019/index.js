/**
 * 19 从 `EventEmitter` 继承
 */

const util = require('util');
const events = require('events');
module.exports = () => {
  function MusicPlayer() {
    this.playing = false;
    events.EventEmitter.call(this);
  }

  util.inherits(MusicPlayer, events.EventEmitter);

  let musicPlayer = new MusicPlayer();

  musicPlayer.on('play', () => console.log('this.playing = true'));
  musicPlayer.on('stop', () => console.log('this.playing = false'));
  musicPlayer.on('play', (track) => console.log('Track now playing: ', track));

  musicPlayer.emit('play', 'The roots - The Fire');

  setTimeout(() => musicPlayer.emit('stop'), 1000);
};
