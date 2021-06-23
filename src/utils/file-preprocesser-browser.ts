import base64Arraybuffer from 'base64-arraybuffer';

import { MAX_FILE_SIZE } from '../const';

function createWithFileObj(file: Blob): Promise<any> {
  return new Promise((resolve, reject) => {
    if (file.size > MAX_FILE_SIZE) {
      reject(new Error('Exceed max file size 10 MB'));
      return;
    }
    const reader = new FileReader();
    reader.onload = function () {
      if (!this.result) {
        reject();
      } else {
        resolve(this.result);
      }
    };
    reader.readAsArrayBuffer(file);
  });
}

export default async function (file: any) {
  try {
    // 可以接收 Base64 字符串
    if (typeof file === 'string') {
      return base64Arraybuffer.decode(file);
    }

    // 可以接收文件对象（Blob 对象）
    if (file instanceof Blob) {
      return await createWithFileObj(file);
    }

    // 可以接收二进制数组 Uint8Array
    if (file instanceof Uint8Array) {
      return file.buffer.slice(
        file.byteOffset,
        file.byteOffset + file.byteLength
      );
    }

    if (file instanceof ArrayBuffer) {
      return file;
    }
    throw new Error('Not support for this file object');
  } catch (error) {
    throw error;
  }
}
