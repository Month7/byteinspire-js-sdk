import { Response } from '../types/request';
interface Platform {
  request: (args: any) => Promise<Response>;
  uploadFile: (args: any) => Promise<Response>;
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
