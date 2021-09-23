import { isMiniProgram, isBrowser } from './utils/judge-platform';

let File: any;

if (isMiniProgram) {
  const MiniProgramClass = require('./adapter/miniProgram/file').default;
  File = MiniProgramClass;
} else if (isBrowser) {
  const BrowserClass = require('./adapter/browser/file').default;
  File = BrowserClass;
} else {
  const NodeClass = require('./adapter/node/file').default;
  File = NodeClass;
}

export default File;
