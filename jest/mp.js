const common = require('./common');

module.exports = {
  ...common,
  globals: {
    NODE_ENV: 'test',
    TEST_ENV: 'mp'
  },
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.test.ts'],
  setupFiles: [
    '<rootDir>/jest/wechat-mock.js'
  ],
  coverageThreshold: {
    ...(common.coverageThreshold),
    './src/adapter/miniProgram/': {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50
    }
  }
};
