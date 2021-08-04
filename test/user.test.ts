import InspireCloud from '../src';
import { VALID_SERVICE_ID, HOST_PATH } from './const';
import storage from '../src/utils/storage';

declare const TEST_ENV: string;

describe('User', () => {
  test('Create session token', async () => {
    if (TEST_ENV === 'mp') {
      const inspirecloud = new InspireCloud({
        serviceId: VALID_SERVICE_ID,
        baseURL: HOST_PATH
      });
      const session = storage.getItem(inspirecloud.localSessionKey);
      expect(session).not.toBe(undefined);
    }
  });
  test('loginByOauth', async () => {
    if (TEST_ENV === 'mp') {
      const inspirecloud = new InspireCloud({
        serviceId: VALID_SERVICE_ID,
        baseURL: HOST_PATH
      });
      try {
        const res = await inspirecloud.user.loginByOAuth({ platform: 'weixinMiniProgram' });
        expect(res).not.toBeUndefined();
      } catch (error) {
        // 单元测试无法拿到真实 openid 无法验证小程序登录流程是否走通，校验
        // headers 是否存在
        expect(error.config.headers).toHaveProperty('x-inspirecloud-sdk-version');
      }
    }
  });
});
