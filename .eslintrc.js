module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jest'],
  extends: ['airbnb-base/legacy'],
  env: {
    browser: true,
    es6: true,
    node: true,
    'jest/globals': true
  },
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: 'module'
  },
  rules: {
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': 'error',
    'global-require': 0,
    'no-useless-catch': 0,
    'class-methods-use-this': 0,
    'no-shadow': 0
  }
};
