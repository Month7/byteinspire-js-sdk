# 轻服务 SDK 更新日志

## [0.5.0](https://www.github.com/bytedance/byteinspire-js-sdk/compare/v0.4.3...v0.5.0) (2021-12-27)


### Features

* loginByOauth方法新增对feishuApp的支持 & 更新oauth域名 ([#35](https://www.github.com/bytedance/byteinspire-js-sdk/issues/35)) ([387e702](https://www.github.com/bytedance/byteinspire-js-sdk/commit/387e70294e98f4eb4495b4b36e6651bdf30400be))

### [0.4.3](https://www.github.com/bytedance/byteinspire-js-sdk/compare/v0.4.2...v0.4.3) (2021-12-06)


### Bug Fixes

* 修复未严格判断浏览器环境的问题 ([#33](https://www.github.com/bytedance/byteinspire-js-sdk/issues/33)) ([be3a6de](https://www.github.com/bytedance/byteinspire-js-sdk/commit/be3a6de1416617088176eee03d2a8d375ab6891a))

### [0.4.2](https://www.github.com/bytedance/byteinspire-js-sdk/compare/v0.4.1...v0.4.2) (2021-11-18)


### Bug Fixes

* 修复在浏览器和 Node 环境中存在全局变量 `wx` 或 `tt` 时 sdk 错误判断为小程序环境的问题 ([#31](https://www.github.com/bytedance/byteinspire-js-sdk/issues/31)) ([68f8342](https://www.github.com/bytedance/byteinspire-js-sdk/commit/68f8342197c41391c9371672d82629d516748bfc))

### [0.4.1](https://www.github.com/bytedance/byteinspire-js-sdk/compare/v0.4.0...v0.4.1) (2021-10-14)


### Bug Fixes

* 修复用户系统请求host参数错误的问题 ([#27](https://www.github.com/bytedance/byteinspire-js-sdk/issues/27)) ([62247fa](https://www.github.com/bytedance/byteinspire-js-sdk/commit/62247fa18da2bae3a3e31380251f7733f3c6813d))

## [0.4.0](https://www.github.com/bytedance/byteinspire-js-sdk/compare/v0.3.3...v0.4.0) (2021-10-14)


### Features

* 用户系统相关的请求使用单独的域名 ([#25](https://www.github.com/bytedance/byteinspire-js-sdk/issues/25)) ([e8efb29](https://www.github.com/bytedance/byteinspire-js-sdk/commit/e8efb29b432b35a355afd91fa1d78f62704e1bab))

### [0.3.3](https://www.github.com/bytedance/byteinspire-js-sdk/compare/v0.2.3...v0.3.3) (2021-09-14)


### Features

* 支持多平台 oauth 登录

### Bug Fixes

* fix ts 类型错误 ([fcdc0bb](https://www.github.com/bytedance/byteinspire-js-sdk/commit/fcdc0bb492bfb4da5a42fb59bf2c3d56bc7db400))
* 小程序 setStorage 语法错误 ([b192f79](https://www.github.com/bytedance/byteinspire-js-sdk/commit/b192f7993b025c477e0a63d81a7cef4256bd4b40))

### [0.2.3](https://www.github.com/bytedance/byteinspire-js-sdk/compare/v0.2.2...v0.2.3) (2021-08-16)


### Bug Fixes

* 修复 node 环境下无法读取最新版本的问题 ([#15](https://www.github.com/bytedance/byteinspire-js-sdk/issues/15)) ([40cee55](https://www.github.com/bytedance/byteinspire-js-sdk/commit/40cee55d8f3a0f5e8f228c2d8b1f385ef44b3fe9))

### [0.2.2](https://www.github.com/bytedance/byteinspire-js-sdk/compare/v0.2.1...v0.2.2) (2021-08-13)


### Bug Fixes

* 修复打包时版本号错误的问题 ([84b628a](https://www.github.com/bytedance/byteinspire-js-sdk/commit/84b628a1be83916f1651f80ce7ecf1f12fed15a1))

### [0.2.1](https://www.github.com/bytedance/byteinspire-js-sdk/compare/v0.2.0...v0.2.1) (2021-08-13)


### Bug Fixes

* 修复小程序登录接口地址错误的问题 ([e90ad28](https://www.github.com/bytedance/byteinspire-js-sdk/commit/e90ad285fadd31bf37b4b596e1adb20a8615202c))

## [0.2.0](https://www.github.com/bytedance/byteinspire-js-sdk/compare/v0.1.0...v0.2.0) (2021-08-04)


### Features

* miniprogram ([#4](https://www.github.com/bytedance/byteinspire-js-sdk/issues/4)) ([3ce67bd](https://www.github.com/bytedance/byteinspire-js-sdk/commit/3ce67bd3a47a1850d09cb5d56e79a0fcb9ffd9a3))

## 0.1.0

- 支持云函数调用
- 支持客户端文件上传

## 0.2.0

- 支持小程序客户端文件下载
- 支持小程序客户端文件上传、监听文件上传进度
- 支持小程序调用云函数
- `inspirecloud.user.loginByOAuth` 方法支持小程序（微信小程序，飞书小程序，字节小程序）平台
