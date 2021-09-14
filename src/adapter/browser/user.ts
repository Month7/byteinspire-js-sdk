/* eslint-disable consistent-return */
import Module from '../../module';
import InspireCloud from '../../inspirecloud';
import { generateSession } from '../../utils/utils';
import storage from '../../utils/storage';
const RETEY_TIMES = 60 * 10;

export default class UserModule extends Module {
  constructor(inspirecloud: InspireCloud) {
    super(inspirecloud);
    this.name = 'user';
  }

  private async sleep(ms: number = 1000) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private async fetchOAuthToken(tab?: Window) {
    const url = '/oauth/status';
    const response = await this.inspirecloud.httpInstance.request({
      url,
      method: 'GET'
    });

    const data = response.data;
    const sessionToken: string = data.session;

    if (!sessionToken) {
      throw new Error('Login failed. User may not authorize the app.');
    }

    if (tab && tab.close) {
      tab.close();
    }
    return data;
  }

  private async getSessionToken(times: number, tab: Window): Promise<any> {
    await this.sleep();

    if (times > RETEY_TIMES) {
      throw new Error('Authentication failed');
    }

    try {
      return await this.fetchOAuthToken(tab);
    } catch (e) {
      const resp = await this.getSessionToken(times + 1, tab);
      return resp;
    }
  }

  /**
   *
   * @param platform 来源平台
   * @param mode OAuth 模式 redirect || popup 小程序不传
   * @param redirectURL 重定向地址 小程序不传
   * @returns
   */
  async logInByOAuth(opts: {
    platform: string;
    mode: string;
    redirectURL: string;
  }) {
    const {
      platform,
      mode = 'redirect',
      redirectURL = window.location.href
    } = opts;

    try {
      const res = await this.inspirecloud.httpInstance.request({
        url: '/oauth/redirectUrl',
        method: 'GET',
        params: {
          platform,
          mode,
          redirectURL,
          host: this.inspirecloud.configs.baseURL
        },
        withCredentials: true
      });
      const openURL: string = res.data.redirectUrl;

      const height: number = window.screen.height * 0.6;
      const width: number = window.screen.width * 0.6;
      const windowOpts = `menubar=no,location=no,toolbar=no,chrome=yes,
      resizable=yes,height=${height},width=${width},centerscreen=yes`;

      if (mode === 'popup') {
        const tab = window.open(openURL, 'OAuthWindow', windowOpts);
        if (!tab) {
          throw new Error('Open new OAuth window failed.');
        }
        return await this.getSessionToken(1, tab);
      }
      window.location.href = openURL;
      return;
    } catch (e: any) {
      if (e.response && e.response.data) {
        throw new Error(e.response.data.error);
      }
      throw e;
    }
  }

  async getOAuthRedirectResult() {
    return this.fetchOAuthToken();
  }

  async isLogin() {
    try {
      const res = await this.inspirecloud.httpInstance.request({
        url: '/v1/users/isLogin',
        method: 'GET'
      });
      return res.data.isLogin;
    } catch (error) {
      throw error;
    }
  }

  logOut() {
    this.inspirecloud.httpInstance.request({
      url: '/v1/users/logout',
      method: 'POST'
    });

    const newSession = generateSession();
    storage.setItem(this.inspirecloud.localSessionKey, newSession);
  }

  // alias for user convenience
  login = this.logIn;

  logout = this.logOut;

  loginByOAuth = this.logInByOAuth;
}
