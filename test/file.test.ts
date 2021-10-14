import fs from 'fs';
import path from 'path';
import InspireCloud from '../src';
import { VALID_SERVICE_ID, HOST_PATH } from './const';

const inspirecloud = new InspireCloud({
  serviceId: VALID_SERVICE_ID,
  baseURL: HOST_PATH
});
const token = 'ea46d469-fb64-4583-b69d-9f2fc7e7e3a2';

declare const TEST_ENV: string;

describe('File', () => {
  test('ok test', async () => {
    const data = await inspirecloud.file.upload(
      'test_base64.txt',
      'SGVsbG8gV29ybGQ=',
      { token }
    );
    expect(data).toHaveProperty('url');
  });
  test('Reject when not setting file name', async () => {
    expect.assertions(1);
    try {
      // @ts-ignore
      await inspirecloud.file.upload();
    } catch (error) {
      expect(error).toEqual(new Error('Please specify the filename'));
    }
  });

  test('Can upload a base64 string', async () => {
    expect.assertions(1);
    const data = await inspirecloud.file.upload(
      'test_base64.txt',
      'SGVsbG8gV29ybGQ=',
      { token }
    );
    expect(data).toHaveProperty('url');
  });
  if (TEST_ENV === 'mp') {
    test('can download file', async () => {
      const data = await inspirecloud.file.download('url', { onProgressUpdate: () => {} });
      expect(data).toHaveProperty('tempFilePath');
    });
  }

  test('Can upload a chinese file name', async () => {
    expect.assertions(1);
    const data = await inspirecloud.file.upload(
      '测试中文文件名.txt',
      'SGVsbG8gV29ybGQ=',
      { token }
    );
    expect(data).toHaveProperty('url');
  });

  if (TEST_ENV === 'browser') {
    test('Can upload a Blob file', async () => {
      const file = new File(['Hello World'], 'test_file_obj.txt', {
        type: 'text/plain'
      });
      expect.assertions(1);
      const data = await inspirecloud.file.upload('test_file_obj.txt', file, {
        token
      });
      expect(data).toHaveProperty('url');
    });
  }

  test('Can not upload when missing token', async () => {
    try {
      await inspirecloud.file.upload(
        'test_base64.txt',
        'SGVsbG8gV29ybGQ=',
        // @ts-ignore
        {}
      );
    } catch (error) {
      expect(error).toEqual(new Error('Please specify token to invoke upload'));
    }
  });

  test('Can upload an ArrayBuffer', async () => {
    expect.assertions(1);
    const file = Uint8Array.from([
      72,
      101,
      108,
      108,
      111,
      32,
      87,
      111,
      114,
      108,
      100
    ]);
    const data = await inspirecloud.file.upload('test_array.txt', file, {
      token
    });
    expect(data).toHaveProperty('url');
  });

  if (TEST_ENV === 'node') {
    test('Can upload a file read from fs', async () => {
      expect.assertions(1);
      const file = fs.readFileSync(
        path.join(__dirname, 'file_test_valid.jpeg')
      );
      const data = await inspirecloud.file.upload('test_fs.txt', file, {
        token
      });
      expect(data).toHaveProperty('url');
    });
  }

  if (TEST_ENV === 'node') {
    test('Can not upload an oversized file', async () => {
      expect.assertions(1);

      const file = fs.readFileSync(
        path.join(__dirname, 'file_test_oversized.tar.gz')
      );
      try {
        await inspirecloud.file.upload(
          'test_oversized.tar.gz',
          file,
          { token }
        );
      } catch (error) {
        expect(error).toEqual(new Error('Exceed max file size 10 MB'));
      }
    });
  }
});
