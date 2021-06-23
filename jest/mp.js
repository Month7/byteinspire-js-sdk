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
  ]
};
