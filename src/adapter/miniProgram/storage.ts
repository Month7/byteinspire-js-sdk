declare const wx: any;
export default class Storage {
  public setItem(key: string, value: any) {
    wx.setStorageSync({
      key,
      data: value
    });
  }

  public getItem(key: string): any {
    return wx.getStorageSync(key);
  }
}
