import storage from 'localstorage-memory';

export default class Stoarge {
  public setItem(key:string, value: any) {
    storage.setItem(key, value);
  }

  public getItem(key: string): any {
    return storage.getItem(key);
  }
}
