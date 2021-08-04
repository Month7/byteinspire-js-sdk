import { Response, UploadTask, DownloadTask } from '../types/constant';
interface Platform {
  request: (args: any) => Promise<Response>;
  uploadFile: (args: any) => UploadTask;
  downloadFile: (args: any) => DownloadTask;
  setStorageSync: (args: { key: string, data: any }) => void;
  getStorageSync: (key: string) => any;
}

// 微信小程序
declare let wx: Platform;
// 字节跳动小程序
declare let tt: Platform;

/**
 * 自适应当前平台
 */
export default function adaptive() {
  let adapter = wx;
  if (typeof tt !== 'undefined' && typeof tt.request === 'function') adapter = tt;
  return adapter;
}
