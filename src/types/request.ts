interface AnyObject {
  [key: string]: any;
}

export declare type Data = string | AnyObject | ArrayBuffer;

/**
 * 通用响应体
 */
export declare interface Response {
  /**
   * 响应状态码
   */
  statusCode?: number;

  /**
   * 响应状态码
   */
  status?: number;

  /**
   * 响应头 Headers
   */
  header?: any;

  /**
   * 响应头 Headers
   */
  headers?: AnyObject;

  /**
   * 响应数据
   */
  data: Data;

  /**
   * 开发者服务器返回的 cookies，格式为字符串数组
   */
  cookies?: string[];

  /**
   * 网络请求过程中一些关键时间点的耗时信息
   */
  profile?: AnyObject;
}
