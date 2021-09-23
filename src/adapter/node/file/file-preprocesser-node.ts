import fs from 'fs';
import base64Arraybuffer from 'base64-arraybuffer';

export default async function (file: any) {
  try {
    // 可以接收 Base64 字符串
    if (typeof file === 'string') {
      return base64Arraybuffer.decode(file);
    }

    // 可以接收带 path 的对象
    if (file && file.path) {
      if (file.path.includes('../')) {
        throw new Error('Not support for this file object');
      }
      const f = fs.readFileSync(file.path);
      return f.buffer.slice(f.byteOffset, f.byteOffset + f.byteLength);
    }

    // 可以接收二进制数组 Uint8Array
    if (file instanceof Uint8Array) {
      return file.buffer.slice(
        file.byteOffset,
        file.byteOffset + file.byteLength
      );
    }

    throw new Error('Not support for this file object');
  } catch (error) {
    throw error;
  }
}
