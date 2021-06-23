const path = require('path');

module.exports = {
  preset: 'ts-jest',
  verbose: true,
  collectCoverage: true,
  rootDir: path.resolve(__dirname, '../'),
  testMatch: ['**/test/**/*.test.ts'],
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 80,
      lines: 80,
      statements: 80
    },
    './src/adapter/': {
      branches: 5,
      functions: 5,
      lines: 5,
      statements: 5
    }
  }
};
