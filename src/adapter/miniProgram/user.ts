import Module from '../../module';
import InspireCloud from '../../inspirecloud';
import { PLATFORM_ENUM, UserResponse } from '../../types/constant';

declare const wx: any;
declare const tt: any;

export default class UserModule extends Module {
  constructor(inspirecloud: InspireCloud) {
    super(inspirecloud);
    this.name = 'user';
  }

  private login(client: any, allowAnonymousLogin: boolean = false) {
    return new Promise<any>((resolve, reject) => {
      let options: any = {
        success(res: any) {
          resolve(res);
        },
        fail(e: any) {
          reject(e);
        }
      };
      if (allowAnonymousLogin) {
        options.force = false; // 字节小程序默认 true
      }
      client.login(options);
    });
  }

  private async getUserInfo(client: any, platform: PLATFORM_ENUM) {
    return new Promise((resolve, reject) => {
      client.getSetting({
        success(res: any) {
          // 飞书小程序 3.5 版本之后不再需要 scope.userInfo 授权
          if (platform === PLATFORM_ENUM.FS_PROGRAM || res.authSetting['scope.userInfo']) {
            client.getUserInfo({
              success(res2: any) {
                resolve(res2);
              },
              fail() {
                resolve({});
              }
            });
          } else {
            resolve({});
          }
        },
        fail(e: Error) {
          reject(e);
        }
      });
    });
  }

  /**
   * @param platform 来源平台
   * @param allowAnonymousLogin 是否允许匿名登录
   * @returns
   */
  async logInByOAuth(opts: {
    platform: PLATFORM_ENUM;
    allowAnonymousLogin?: boolean;
  }) {
    const {
      allowAnonymousLogin = false,
      platform
    } = opts;
    try {
      let adapter = wx;
      if (platform === PLATFORM_ENUM.FS_PROGRAM || platform === PLATFORM_ENUM.TT_PROGRAM) {
        adapter = tt;
      }
      const res = await this.login(adapter, allowAnonymousLogin);
      let postData: {
        code?: string;
        anonymousCode?: string;
        userInfo?: any;
      } = {};
      if (res.code) {
        const userInfo = await this.getUserInfo(adapter, platform);
        postData.userInfo = userInfo;
        postData.code = res.code;
      }
      if (res.anonymousCode && res.isLogin === false) {
        postData.anonymousCode = res.anonymousCode;
      }
      if (!res.code && !res.anonymousCode) {
        return res;
      }

      const resp: UserResponse = await this.inspirecloud.httpInstance.request({
        url: `/--platform?platform=${platform}`,
        data: postData,
        method: 'post'
      });
      const data = resp.data;
      return data;
    } catch (e: any) {
      if (e.response && e.response.data && e.response.data.error) {
        throw new Error(e.response.data.error);
      }
      throw e;
    }
  }

  loginByOAuth = this.logInByOAuth
}
