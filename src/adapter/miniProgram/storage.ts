import getAdapter from '../../utils/adaptive';

const adapter = getAdapter();
export default class Storage {
  public setItem(key: string, value: any) {
    adapter.setStorageSync({
      key,
      data: value
    });
  }

  public getItem(key: string): any {
    return adapter.getStorageSync(key);
  }
}
