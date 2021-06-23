import axios, { Method } from 'axios';
import { Headers } from '../../inspirecloud';

export default class Request {
  public request(config: any) {
    return axios.request(config);
  }

  public upload(config: {
    headers: Headers;
    path?: string;
    fileName?: string;
    filePath?: string;
    url: string;
    data?: any;
    method?: Method;
  }) {
    return axios.request(config);
  }
}
