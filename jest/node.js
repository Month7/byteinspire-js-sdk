const common = require('./common');

module.exports = {
  ...common,
  globals: {
    NODE_ENV: 'test',
    TEST_ENV: 'node'
  },
  coverageThreshold: {
    ...(common.coverageThreshold),
    './src/adapter/node/': {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60
    }
  }
};
