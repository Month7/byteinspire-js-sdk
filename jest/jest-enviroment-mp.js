const NodeEnvironment = require('jest-environment-node');

module.exports = class MiniProgramEnvironment extends NodeEnvironment {
  constructor(config) {
    super(Object.assign({}, config, {
      globals: Object.assign({}, config.globals, {
        Uint32Array: Uint32Array,
        Uint8Array: Uint8Array,
        ArrayBuffer: Uint8Array
      })
      // in jest-node Uint8Array instanceof ArrayBuffer is false
      // see https://github.com/facebook/jest/issues/7780
    }));
    this.wx = {};
  }
};
