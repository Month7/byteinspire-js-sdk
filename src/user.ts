import BrowserClass from './adapter/browser/user';
import { isMiniProgram } from './utils/judge-platform';

let User: any = BrowserClass;

if (isMiniProgram) {
  const MiniProgramClass = require('./adapter/miniProgram/user').default;
  User = MiniProgramClass;
}

export default User;
