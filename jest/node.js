const common = require('./common');

module.exports = {
  ...common,
  globals: {
    NODE_ENV: 'test',
    TEST_ENV: 'node',
    tt: {} // 测试 Node 环境存在 tt 环境变量时能否判断成功
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
