import BrowserClass from './adapter/browser/file';
import { isMiniProgram } from './utils/judge-platform';

let File: any = BrowserClass;

if (isMiniProgram) {
  const MiniProgramClass = require('./adapter/miniProgram/file').default;
  File = MiniProgramClass;
}

export default File;
