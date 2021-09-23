import { getType } from 'mime';

import Module from '../../module';
import InspireCloud, { Headers } from '../../inspirecloud';
import filePreprocesser from './file/file-preprocesser-mp';

import { MAX_FILE_SIZE } from '../../const';
import {
  UploadFileResponseObject,
  DownloadResponseObject,
  UploadProgressHandler,
  DownloadFileResponseObject,
  DownloadOptions
} from '../../types/constant';
import getAdapter from '../../utils/adaptive';
const adapter = getAdapter();
interface FileUploadOptions {
  token: string;
  region?: string;
  onProgressUpdate?: UploadProgressHandler
}

export default class FileModule extends Module {
  constructor(inspirecloud: InspireCloud) {
    super(inspirecloud);
    this.name = 'file';
  }

  async download(
    fileURL: string,
    options?: DownloadOptions
  ) : Promise<DownloadFileResponseObject> {
    return new Promise((resolve, reject) => {
      const downloadTask = adapter.downloadFile({
        url: fileURL,
        success(res: DownloadResponseObject) {
          resolve(res);
        },
        fail(e: Error) {
          reject(e);
        }
      });
      if (options && options.onProgressUpdate && typeof options.onProgressUpdate === 'function') {
        downloadTask.onProgressUpdate(options.onProgressUpdate);
      }
    });
  }

  async upload(
    filename: string,
    file: string | object | Blob | Uint8Array,
    options: FileUploadOptions
  ) : Promise<UploadFileResponseObject> {
    // eslint-disable-next-line no-console
    console.warn(
      'Direct file transfer from the client does not guarantee security. It is recommended to migrate file uploading to the cloud function in the production environment.'
    );
    if (!filename) {
      throw new Error('Please specify the filename');
    }
    if (!options) {
      throw new Error('Please specify the options');
    }
    const { region = 'cn', token } = options;

    if (!token) {
      throw new Error('Please specify token to invoke upload');
    }

    let data: ArrayBuffer | string | { path: string };

    try {
      data = await filePreprocesser(file);
      if ((data as ArrayBuffer).byteLength > MAX_FILE_SIZE) {
        throw new Error('Exceed max file size 10 MB');
      }

      const headers: Headers = {
        'x-tt-file-name': encodeURIComponent(filename),
        'Content-Type': getType(filename) || 'application/octet-stream',
        'x-tt-region': region,
        'x-ic-client-upload-token': token
      };

      const res = await this.inspirecloud.httpInstance.upload({
        headers,
        data,
        url: '/--file',
        method: 'POST',
        filePath: ((data as unknown) as { path: string })?.path,
        onProgressUpdate: options.onProgressUpdate
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}
