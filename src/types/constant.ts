/* eslint-disable camelcase */
interface AnyObject {
  [key: string]: any;
}

export declare type Data = string | AnyObject | ArrayBuffer;

export enum PLATFORM_ENUM {
  WX_PROGRAM = 'weixinMiniProgram',
  FS_PROGRAM = 'feishu',
  TT_PROGRAM = 'bytedanceMicroapp',
  WEIXIN = 'weixin',
  WEIBO = 'weibo',
  GOOGLE = 'google',
  GITHUB = 'github',
  QQ = 'qq',
  Douyin = 'douyin',
}

enum PLATFORM_ENUM_TYPE {
  'weixinMiniProgram',
  'feishu',
  'bytedanceMicroapp',
  'weixin',
  'weibo',
  'google',
  'github',
  'qq',
  'douyin',
}

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

export interface UploadProgressObject {
  progress: number; // 上传进度
  totalBytesSent: number; // 已经上传的数据长度，单位 byte
  totalBytesExpectedToSend: number; // 预期需要上传的数据总长度，单位 byte
}

// 文件下载进度
export interface DownloadProgressObject {
  progress: number; // 下载进度
  totalBytesWritten: number; // 已经下载的数据长度，单位 byte
  totalBytesExpectedToWrite: number; // 预期需要下载的数据总长度，单位 byte
}

export type UploadProgressHandler = (arg: UploadProgressObject) => void;
export type DownloadProgressHanler = (arg: DownloadProgressObject) => void;
export interface UploadTask {
  onProgressUpdate: (callback: UploadProgressHandler) => void;
}

export interface DownloadTask {
  onProgressUpdate: (callback: DownloadProgressHanler) => void
}

export interface User {
  username: string;
  // 新加共性字段
  // nickname?: string;
  avatar?: string; // 头像
  passhash?: string; // 密文
  secret?: string; // secret
  email?: string; // 邮箱
  phone_number?: number; // 手机号
  phoneNumber?: number; // 手机号
  intro?: string; // 简介
  last_ip?: string; // 最后一次登录IP
  lastIp: string; // 最后一次登录IP
  last_login?: number; // 最后一次登录时间
  lastLogin: number | null; // 最后一次登录时间
  login_count?: number; // 登录次数
  loginCount: number; // 登录次数
  agent?: any; // 请求代理
  status: boolean; // 封禁状态
  firstProvider: string; // 首次注册方式
  first_provider?: string;
  register_provider?: string;
  createAt: number;
  createdAt: number;
  updatedAt: number;
  _id: string;
  [PLATFORM_ENUM.FS_PROGRAM]?: {
    avatar_big: string;
    avatar_middle: string;
    avatar_thumb: string;
    avatar_url: string;
    en_name: string;
    name: string;
    open_id: string;
    tenant_key: string;
    union_id: string;
  };
  [PLATFORM_ENUM.TT_PROGRAM]?: {
    avatarUrl: string;
    city: string;
    country: string;
    gender: string;
    language: string;
    nickName: string;
    province: string;
    sessionId: string;
    userId: string;
  };
  [PLATFORM_ENUM.WX_PROGRAM]?: {
    avatarUrl: string;
    nickName: string;
    gender: number;
    city: string;
    province: string;
    country: string;
    language: string;
  }
}

export interface UserResponse {
  data: User,
}

export interface DownloadResponse extends Response {
  data: {
    tempFilePath: string;
  }
}

export interface DownloadResponseObject {
  tempFilePath: string;
}

export interface UploadResponseObject {
  url: string;
}

export interface UploadFileResponseObject {
  errorCode?: string;
  errorMessage?: string;
  url?: string;
}

export interface DownloadFileResponseObject {
  tempFilePath?: string;
  statusCode?: number;
  errMsg?: string;
}

export interface FileUploadOptions {
  token: string;
  region?: string;
  onProgressUpdate?: (arg: UploadProgressObject) => void;
}

export interface DownloadOptions {
  onProgressUpdate: DownloadProgressHanler;
}

export interface FileClass {
  upload: (
    filename: string,
    file: string | object | Blob | Uint8Array,
    options?: FileUploadOptions
  ) => Promise<UploadFileResponseObject>
  /**
   * 小程序可用
   */
  download: (fileURL: string, options?: DownloadOptions) => Promise<DownloadResponseObject>
}

export interface UserClass {
  loginByOAuth: (opts: {
    platform: keyof typeof PLATFORM_ENUM_TYPE;
    allowAnonymousLogin?: boolean;
    mode?: string;
    redirectURL?: string;
  }) => Promise<User>
  logOut: () => void;
  logout: () => void;
  getOAuthRedirectResult: () => Promise<any>;
  isLogin: () => Promise<boolean>;
}
