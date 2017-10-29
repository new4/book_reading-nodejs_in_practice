/**
 * 18 创建自己的网络协议
 */

const fs = require('fs');
const zlib = require('zlib');
module.exports = () => {
  let database = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
  ];
  const bitmasks = [1, 2, 4, 8, 16, 32, 64, 128];

  function store(buf) {
    let db = buf[0];
    let key = buf.readUInt8(1);

    if (buf[2] === 0x78) {
      zlib.inflate(buf.slice(2), (err, inflateBuf) => {
        if (err) {
          return console.error(err);
        }
        let data = inflateBuf.toString();
        bitmasks.forEach((bitmask, index) => {
          if ((db & bitmask) === bitmask) {
            // 匹配到 database[index] 时
            database[index][key] = data;
          }
        });

        console.log(database);
      })
    }
  }

  let header = new Buffer(2);

  header[0] = 8; // 放在第四个数据库
  header[1] = 0; // 放在 0 键值处

  // 压缩数据 'my message'
  zlib.deflate('my message', (err, deflateBuf) => {
    if (err) {
      return console.error(err);
    }

    // 打包头部和数据部
    let message = Buffer.concat([header, deflateBuf]);

    // 存储数据
    store(message);
  });
};
