# 轻服务 Javascript SDK

[![npm](https://img.shields.io/npm/v/@byteinspire/js-sdk.svg?style=flat-square)](https://www.npmjs.com/package/@byteinspire/js-sdk)
[![codecov](https://codecov.io/gh/bytedance/byteinspire-js-sdk/branch/master/graph/badge.svg?token=JuNCULUxkV)](https://codecov.io/gh/bytedance/byteinspire-js-sdk)
[![vulnerabilities](https://snyk.io/test/github/bytedance/byteinspire-js-sdk/badge.svg)](https://snyk.io/test/github/bytedance/byteinspire-js-sdk)
[![Build Status](https://github.com/bytedance/byteinspire-js-sdk/actions/workflows/test.yml/badge.svg)](https://github.com/bytedance/byteinspire-js-sdk/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

轻服务 SDK，您可以通过这个 SDK 调用轻服务中的函数和上传文件。SDK 目前支持在浏览器、小程序和 NodeJS 环境调用。

## 安装

### NPM

```bash
$ npm install --save @byteinspire/js-sdk
```

### YARN

```bash
$ yarn add @byteinspire/js-sdk
```

### 浏览器引入

```html
<script type="text/javascript" src="https://unpkg.com/@byteinspire/js-sdk@0.5.1/dist/inspirecloud-0.5.1.min.js"></script>
```

### 小程序

#### 手动导入

1. 点击打开 [https://unpkg.com/@byteinspire/js-sdk@0.5.1/dist/inspirecloud-0.5.1.min.js](https://unpkg.com/@byteinspire/js-sdk@0.5.1/dist/inspirecloud-0.5.1.min.js) 并下载 JS 文件，移动到小程序 `libs` 目录。
2. 在小程序中：
    ```javascript
    // 注意填写正确的相对路径
    const InspireCloud = require('./libs/inspirecloud-0.5.1.min.js');
    ```

#### WePY,mpvue, taro 等跨端框架

通过 NPM 或 YARN 来安装，在引入时需要指定二级路径 
```
import Inspirecloud from '@byteinspire/js-sdk/dist/inspirecloud-0.5.1.min.js'
```

#### 配置域名白名单

如果要在线上小程序中使用 SDK，需要先配置域名白名单（参见 [网络使用说明](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/network.html)）。具体操作方法为：

1. 登录 [微信公众平台](https://mp.weixin.qq.com/)；
2. 前往 __设置 > 开发设置 > 服务器域名__，点击 __修改__ 按钮；
3. 在「request 合法域名」项中填入 __[YOUR_SERVICE_ID].fn.thelarkcloud.com__。

## 使用

见 [轻服务 JavaScript SDK 快速入门](https://qingfuwu.cn/docs/nodejs/sdk/js-sdk.html#quickstart)。


## 更新日志
见 [轻服务 SDK 更新日志](./CHANGELOG.md)。

## License
MIT

## 发布流程

### Release
1. 提交的 PR 合入 master 时，release-please-action 会自动提交 Release PR，该 PR 会自动修改 CHANGELOG 文件，并更新版本，如果不想在 CHANGELOG 文件出现不相关内容，可以在合入 master 是选择 squash。合入时的 commit message 需要符合以下[规范](https://github.com/marketplace/actions/release-please-action)：

* `fix:` 开头，代表修复 bug，会自动更新 patch 版本
* `feat:` 开头，代表新的 feature ，会自动更新 minor 版本
* `feat!:` 或 `fix!:` 或 `refactor!:` 代表不兼容修改，会自动更新 major 版本

2. Release PR 合入 master 后自动创建 tag，发布 Release

**注：提交的 PR 会自动跟随 master 分支的更新**

### 发布 NPM 包

等待 Release 发布完成后，本地切到 master 分支的最新代码，执行 `yarn publish`