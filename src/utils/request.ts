import { isMiniProgram } from '../utils/judge-platform';
import { Method } from 'axios';
import { UploadProgressHandler } from '../types/constant';

type Headers = {
  [key: string]: string;
}

interface LooseObject {
  [key: string]: unknown;
}

interface requestInterface {
  request: (args: LooseObject) => any
  upload: (config: {
    headers: Headers;
    path?: string;
    fileName?: string;
    filePath?: string;
    url: string;
    data?: any;
    method?: Method;
  }, baseURL: string) => any
}

export default class Request {
  baseURL: string;

  headers: Headers;

  timeout: number;

  instance: requestInterface;

  constructor(options: {
    baseURL: string;
    timeout: number;
    headers: Headers;
  }) {
    const { baseURL, headers = {}, timeout } = options;
    this.baseURL = baseURL;
    this.timeout = timeout;
    this.headers = headers;
    if (isMiniProgram) {
      const MiniProgramClass = require('../adapter/miniProgram/http').default;
      this.instance = new MiniProgramClass();
    } else {
      const BrowserClass = require('../adapter/browser/http').default;
      this.instance = new BrowserClass();
    }
  }

  public request(originOptions: LooseObject) :Promise<{ data: any; }> {
    const options = this.getRequestConfig(originOptions);
    return this.instance.request(options);
  }

  private getRequestConfig(originConfig: LooseObject) {
    const config = {
      ...originConfig,
      url: this.baseURL + originConfig.url,
      headers: Object.assign(originConfig?.headers || {}, this.headers),
      timeout: this.timeout
    };
    return config;
  }

  public upload(originConfig: {
    headers: Headers;
    path?: string;
    filePath?: string;
    url: string;
    data?: any;
    method?: Method;
    onProgressUpdate?: UploadProgressHandler;
  }) {
    const config = this.getRequestConfig(originConfig);
    return this.instance.upload(config, this.baseURL);
  }
}
