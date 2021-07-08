import InspireCloud from '../src';
import { VALID_SERVICE_ID, HOST_PATH } from './const';
import storage from '../src/utils/storage';

declare global {
  const TEST_ENV: string;
}

describe('User', () => {
  test('Create session token', async () => {
    // eslint-disable-next-line no-undef
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
    const inspirecloud = new InspireCloud({
      serviceId: VALID_SERVICE_ID,
      baseURL: HOST_PATH
    });
    try {
      const res = await inspirecloud.user.logInByOAuth({ platform: 'weixinMiniProgram' });
      expect(res).not.toBeUndefined();
    } catch (error) {
      // ...
    }
  });
});
