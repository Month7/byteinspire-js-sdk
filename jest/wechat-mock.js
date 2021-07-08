const storage = require('localstorage-memory');
const axios = require('axios');

let wx = {};

// 模拟 wx.setStorageSync 函数
wx.setStorageSync = (key, value) => {
  storage.setItem(key, value);
};

// 模拟 wx.getStorageSync 函数
wx.getStorageSync = (key) => {
  return storage.getItem(key);
};

wx.getStorage = ({ key, success }) => {
  return success({
    data: storage.getItem(key)
  });
};

wx.setStorage = (key, data, success) => {
  storage.setItem(key, data);
  return success();
};

let code = 'mock wx.login code';

// 模拟 wx.login 函数
wx.login = ({ success }) => {
  // eslint-disable-next-line no-unused-expressions
  success && success({ code });
};

// 模拟 wx.getUserInfo 函数
wx.getUserInfo = ({ success }) => {
  // eslint-disable-next-line no-unused-expressions
  success && success({
    userInfo: 'userInfo+',
    rawData: 'rawData+',
    signature: 'signature+',
    encryptedData: 'encryptedData+',
    iv: 'iv+'
  });
};

wx.getSetting = ({ success, fail }) => {
  try {
    const res = {
      authSetting: {
        'scope.userInfo': true
      }
    };
    // eslint-disable-next-line no-unused-expressions
    success && success(res);
  } catch (error) {
    // eslint-disable-next-line no-unused-expressions
    fail && fail(error);
  }
};

wx.request = async (args) => {
  const { success, fail } = args;
  try {
    const res = await axios.request(args);
    // eslint-disable-next-line no-unused-expressions
    success && success(res);
  } catch (error) {
    // eslint-disable-next-line no-unused-expressions
    fail && fail(error);
  }
};

wx.uploadFile = async (args) => {
  const { success, fail } = args;
  try {
    const res = await axios.request(args);
    // eslint-disable-next-line no-unused-expressions
    success && success(res);
  } catch (error) {
    // eslint-disable-next-line no-unused-expressions
    fail && fail(error);
  }
};

global.wx = wx;
