/* eslint-disable no-param-reassign */
import { Method } from 'axios';
import base64Arraybuffer from 'base64-arraybuffer';
import { Headers } from '../../inspirecloud';
import { Response, UploadProgressObject } from '../../types/constant';
import getAdapter from '../../utils/adaptive';

const adapter = getAdapter();

export default class Request {
  async upload(config: {
    headers: Headers;
    path?: string;
    fileName?: string;
    filePath?: string;
    url: string;
    data?: any;
    method: Method;
    onProgressUpdate?: UploadProgressObject
  }, baseURL: string): Promise<{ data: any; }> {
    if (!config.filePath) {
      config.headers['x-tt-base64-encoded'] = 'true';
      config.data = base64Arraybuffer.encode(config.data as ArrayBuffer);
      return new Promise((resolve, reject) => {
        adapter.request({
          ...(config),
          header: config.headers,
          success(res: Response) {
            resolve(res);
          },
          fail(e: any) {
            reject(e);
          }
        });
      });
    }
    return new Promise((resolve, reject) => {
      const upoloadTask = adapter.uploadFile({
        url: baseURL + '/--mgc_file',
        filePath: config.filePath,
        name: 'file',
        header: config.headers,
        success(res: Response) {
          resolve({ data: JSON.parse(res.data as string) });
        },
        fail(e: any) {
          reject(e);
        }
      });
      if (typeof config.onProgressUpdate === 'function') {
        upoloadTask.onProgressUpdate(config.onProgressUpdate);
      }
    });
  }

  async request(options: any): Promise<{ data: any; }> {
    return new Promise((resolve, reject) => {
      adapter.request({
        ...options,
        header: options.headers,
        success(res: Response) {
          resolve(res);
        },
        fail(e: Error) {
          reject(e);
        }
      });
    });
  }
}
