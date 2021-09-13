import { isMiniProgram } from '../utils/judge-platform';
import { Method } from 'axios';
import { UploadProgressHandler } from '../types/constant';
import storage from './storage';
import { generateSession } from './utils';
import { CLIENT_VERSION_HEADER, USER_SESSION_KEY_V2 } from '../const';
import { version } from './version';

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

  localSessionKey: string;

  instance: requestInterface;

  serviceId: string;

  constructor(options: {
    baseURL: string;
    serviceId: string;
    localSessionKey: string;
  }) {
    const {
      baseURL, serviceId, localSessionKey
    } = options;
    this.baseURL = baseURL;
    this.serviceId = serviceId;
    this.localSessionKey = localSessionKey;
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

  private getSessionToken() {
    let sessionToken = storage.getItem(this.localSessionKey);

    if (!sessionToken) {
      sessionToken = generateSession();
      storage.setItem(this.localSessionKey, sessionToken);
    }
    return sessionToken;
  }

  private getRequestConfig(originConfig: LooseObject) {
    const baseHeaders = {
      'Content-Type': 'application/json',
      [CLIENT_VERSION_HEADER]: version,
      [USER_SESSION_KEY_V2]: this.getSessionToken()
    };
    const config = {
      ...originConfig,
      url: this.baseURL + originConfig.url,
      headers: Object.assign(originConfig?.headers || {}, baseHeaders)
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
