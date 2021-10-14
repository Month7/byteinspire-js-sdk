import InspireCloud from '../src';
import { VALID_SERVICE_ID } from './const';
import storage from '../src/utils/storage';
import { PLATFORM_ENUM } from '../src/types/constant';

declare const TEST_ENV: string;
const inspirecloud = new InspireCloud({
  serviceId: VALID_SERVICE_ID
});
describe('User', () => {
  if (TEST_ENV === 'mp') {
    const inspirecloud = new InspireCloud({
      serviceId: VALID_SERVICE_ID
    });
    test('Create session token', async () => {
      const session = storage.getItem(inspirecloud.localSessionKey);
      expect(session).not.toBe(undefined);
    });
    test('loginByOauth', async () => {
      if (TEST_ENV === 'mp') {
        try {
          const res = await inspirecloud.user.loginByOAuth({ platform: PLATFORM_ENUM.WX_PROGRAM });
          expect(res).not.toBeUndefined();
        } catch (error) {
          // 单元测试无法拿到真实 openid 无法验证小程序登录流程是否走通，校验
          // headers 是否存在
          expect(error.config.headers).toHaveProperty('x-inspirecloud-sdk-version');
          expect(error.config.status).not.toBe(404);
        }
      }
    });
    test('loginByOauth 匿名登录', async () => {
      try {
        const res = await inspirecloud.user.loginByOAuth({
          platform: PLATFORM_ENUM.TT_PROGRAM,
          allowAnonymousLogin: true
        });
        expect(res).not.toBeUndefined();
      } catch (error) {
        expect(JSON.parse(error.config.data)).toHaveProperty('anonymousCode');
        expect(JSON.parse(error.config.data).anonymousCode).toBe('mock tt anonymousCode');
      }
    });
  }
  if (TEST_ENV !== 'mp') {
    test('Create new session token', async () => {
      storage.setItem(inspirecloud.localSessionKey, 'oldValue');
      const oldSession = storage.getItem(inspirecloud.localSessionKey);
      expect(oldSession).toBe('oldValue');
      try {
        await inspirecloud.user.logout();
      } catch (error) {
        // do nothing
      }

      const newSession = storage.getItem(inspirecloud.localSessionKey);

      expect(newSession).not.toEqual(oldSession);
    });
  }
});
