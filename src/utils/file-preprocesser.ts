import { isBrowser, isMiniProgram } from './judge-platform';

let filePreprocesser: (file: any) => any = () => null;
if (isMiniProgram) {
  filePreprocesser = require('./file-preprocesser-mp').default;
} else if (isBrowser) {
  filePreprocesser = require('./file-preprocesser-browser').default;
} else {
  filePreprocesser = require('./file-preprocesser-node').default;
}
export default filePreprocesser;
