import Request from './utils/request';
import { AxiosRequestConfig } from 'axios';
import { getLocalSessionKey, getBaseURL, getUserOAuthBaseURL } from './utils/utils';
import FileModule from './file';
import UserModule from './user';
import { UserClass, FileClass } from './types/constant';

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

  public httpInstance: Request;

  public userHttpInstance: Request;

  public file: FileClass;

  public user: UserClass;

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

    this.localSessionKey = getLocalSessionKey(configs.serviceId);

    this.httpInstance = new Request({
      serviceId: configs.serviceId,
      baseURL: this.configs.baseURL as string,
      localSessionKey: this.localSessionKey
    });

    this.userHttpInstance = new Request({
      serviceId: configs.serviceId,
      // @ts-ignore
      baseURL: configs.baseURL || configs.baseUrl || getUserOAuthBaseURL(configs.serviceId),
      localSessionKey: this.localSessionKey
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
      const timeout = options?.timeout || 30 * 1000;
      const resp = await this.httpInstance.request({
        params: {},
        method: 'POST',
        timeout,
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
