import getAdapter from '../../utils/adaptive';

const adapter = getAdapter();
export default class Storage {
  public setItem(key: string, value: any) {
    adapter.setStorage({
      key,
      data: value
    });
  }

  public getItem(key: string): Promise<any> {
    return adapter.getStorageSync(key);
  }
}
