/**
 * 19 从 `EventEmitter` 继承
 */

const EventEmitter = require('events').EventEmitter;

module.exports = () => {
  function MusicPlayer(track) {
    this.track = track;
    this.playing = false;

    for (let methodName in EventEmitter.prototype) {
      this[methodName] = EventEmitter.prototype[methodName];
    }

  }

  MusicPlayer.prototype = {
    toString: () => {
      if (this.playing) {
        return 'Now playing: ' + this.track;
      } else {
        return 'Stopped!';
      }
    }
  }

  let musicPlayer = new MusicPlayer('NO.1');

  musicPlayer.on('error', (err) => {
    console.log('Error: ', err);
  });

  setTimeout(() => musicPlayer.emit('error', 'Unable to play'), 1000);
};
