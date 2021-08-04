import { CLIENT_VERSION_HEADER, USER_SESSION_KEY_V2 } from './const';
import Request from './utils/request';
import storage from './utils/storage';
import { AxiosRequestConfig } from 'axios';
import { getLocalSessionKey, generateSession, getBaseURL } from './utils/utils';
import FileModule from './file';
import UserModule from './user';
import { UserClass, FileClass } from './types/constant';

const { version } = require('@package/../../package.json');

export type Config = {
  serviceId: string;
  baseURL?: string;
};

export type Headers = {
  [key: string]: string;
};

export type RunOptions = AxiosRequestConfig;

export interface IInspireCloud {}

export default class InspireCloud {
  public configs: Config;

  public localSessionKey: string;

  public version: string;

  public httpInstance: Request;

  public file: FileClass;

  public user: UserClass

  constructor(configs: Config) {
    if (!configs.serviceId) {
      throw new Error('Please specify serviceId');
    }

    this.configs = {
      serviceId: configs.serviceId,
      baseURL:
      configs.baseURL
        // @ts-ignore configs.baseUrl 为了兼容开发者输错的情况
        || configs.baseUrl
        || getBaseURL(configs.serviceId)
    };

    this.version = version;
    this.localSessionKey = getLocalSessionKey(configs.serviceId);

    let sessionToken = storage.getItem(this.localSessionKey);

    if (!sessionToken) {
      sessionToken = generateSession();
      storage.setItem(this.localSessionKey, sessionToken);
    }

    this.httpInstance = new Request({
      baseURL: this.configs.baseURL as string,
      timeout: 30 * 1000,
      headers: {
        'Content-Type': 'application/json',
        [CLIENT_VERSION_HEADER]: version,
        [USER_SESSION_KEY_V2]: sessionToken
      }
    });

    this.file = new FileModule(this);
    this.user = new UserModule(this);
  }

  public async run(
    fnName: string,
    params: object = {},
    options: RunOptions = {}
  ) {
    try {
      const headers = options.headers || {};
      const resp = await this.httpInstance.request({
        params: {},
        method: 'POST',
        ...options,
        headers,
        maxContentLength: Infinity,
        url: `/${fnName}`,
        data: params || {}
      });
      return resp.data;
    } catch (error) {
      throw error;
    }
  }
}
