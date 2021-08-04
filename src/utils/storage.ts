import BrowserClass from '../adapter/browser/storage';
import { isMiniProgram, isBrowser } from '../utils/judge-platform';

interface IStorage {
  setItem: (key: string, value: any) => void;
  getItem: (key: string) => any;
}

class Storage {
  instance: IStorage;

  constructor() {
    if (isBrowser) {
      this.instance = new BrowserClass();
    } else if (isMiniProgram) {
      const MiniProgramClass = require('../adapter/miniProgram/storage').default;
      this.instance = new MiniProgramClass();
    } else {
      const NodeClass = require('../adapter/node/storage').default;
      this.instance = new NodeClass();
    }
  }

  public setItem(key: string, value: any) {
    this.instance.setItem(key, value);
  }

  public getItem(key: string) {
    return this.instance.getItem(key);
  }
}

export default new Storage();
