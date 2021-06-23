import MiniProgramClass from './adapter/miniProgram/user';
import BrowserClass from './adapter/browser/user';
import { isMiniProgram } from './utils/judge-platform';

let User: (typeof BrowserClass | typeof MiniProgramClass) = BrowserClass;

if (isMiniProgram) {
  User = MiniProgramClass;
}

export default User;
