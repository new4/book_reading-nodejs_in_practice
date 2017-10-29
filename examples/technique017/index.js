/**
 * 17 使用 `Buffer` 来转换原始数据
 */

const fs = require('fs');
const path = require('path');
const sourceFile = path.join(__dirname, 'world.dbf');
const targetFile = path.join(__dirname, 'world.json');

module.exports = () => {
  let buf = fs.readFileSync(sourceFile);
  let header = {};

  let date = new Date();
  date.setUTCFullYear(1900 + buf[1]);
  date.setUTCMonth(buf[2]);
  date.setUTCDate(buf[3]);
  header.lastUpdated = date.toUTCString(); // 最后更新日期
  header.totalRecords = buf.readUInt32LE(4); // 记录数，从第4个字节开始，以小端格式读取一个无符号的3比特正整数
  header.bytesInHeader = buf.readUInt16LE(8); // 头部字节数
  header.bytesPerRecord = buf.readUInt16LE(10); // 记录部分的字节数

  let fields = [];
  let fieldOffset = 32;
  let fieldTerminator = 0x0D;

  let FIELD_TYPES = {
    C: 'Character',
    N: 'Numeric'
  }

  while (buf[fieldOffset] != fieldTerminator) {
    let fieldBuf = buf.slice(fieldOffset, fieldOffset + 32);

    let field = {};
    field.name = fieldBuf.toString('ascii', 0, 11).replace(/\u0000/g, '');
    field.type = FIELD_TYPES[fieldBuf.toString('ascii', 11, 12)];
    field.length = fieldBuf[16];

    fields.push(field);
    fieldOffset += 32;
  };

  let startingRecordOffset = header.bytesInHeader;
  let records = [];
  for (let i = 0; i < header.totalRecords; i++) {
    let recordOffset = startingRecordOffset + (i * header.bytesPerRecord);
    let record = {};
    record._isDel = buf.readUInt8(recordOffset) == 0x2A;
    recordOffset++;

    for (let j = 0; j < fields.length; j++) {
      field = fields[j];
      let Type = field.type === 'Numeric' ? Number : String;
      record[field.name] = Type(buf.toString('utf-8', recordOffset, recordOffset + field.length).trim());
      recordOffset += field.length;
    }
    records.push(record);
  }

  fs.writeFile(targetFile, JSON.stringify(records));
};
