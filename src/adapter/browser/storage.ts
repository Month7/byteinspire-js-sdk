export default class Stoarge {
  storage: any;

  constructor() {
    try {
      this.storage = localStorage;
      const testKey = '__inspirecloud_test_js__';
      this.storage.setItem(testKey, testKey);
      if (this.storage.getItem(testKey) !== testKey) {
        throw new Error();
      }
      this.storage.removeItem(testKey);
    } catch (error) {
      this.storage = require('localstorage-memory');
    }
  }

  public setItem(key:string, value: any) {
    this.storage.setItem(key, value);
  }

  public getItem(key: string): any {
    return this.storage.getItem(key);
  }
}
