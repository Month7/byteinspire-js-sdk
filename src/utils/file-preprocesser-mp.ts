import base64Arraybuffer from 'base64-arraybuffer';

export default async function (file: any) {
  try {
    // 可以接收 Base64 字符串
    if (typeof file === 'string') {
      return base64Arraybuffer.decode(file);
    }

    // 可以接收带 path 的对象
    if (file && file.path) {
      return file;
    }

    if (file instanceof ArrayBuffer) {
      return file;
    }

    throw new Error('Not support for this file object');
  } catch (error) {
    throw error;
  }
}
