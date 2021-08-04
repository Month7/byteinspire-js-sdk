/* eslint-disable no-unused-expressions */
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
  success && success({ code });
};

// 模拟 wx.getUserInfo 函数
wx.getUserInfo = ({ success }) => {
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
    success && success(res);
  } catch (error) {
    fail && fail(error);
  }
};

wx.downloadFile = ({ success, fail }) => {
  try {
    const res = {
      tempFilePath: '/tmp'
    };
    success && success(res);
  } catch (error) {
    fail && fail(error);
  }
};

wx.request = async (args) => {
  const { success, fail } = args;
  try {
    const res = await axios.request(args);
    success && success(res);
  } catch (error) {
    fail && fail(error);
  }
};

wx.uploadFile = async (args) => {
  const { success, fail } = args;
  try {
    const res = await axios.request(args);
    success && success(res);
  } catch (error) {
    fail && fail(error);
  }
};

global.wx = wx;
