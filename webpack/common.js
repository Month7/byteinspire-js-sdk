const path = require('path');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const common = {
  target: 'web',
  entry: './src/index.ts',
  output: {
    libraryTarget: 'umd',
    library: 'InspireCloud',
    path: path.resolve(__dirname, '../dist')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.json$/,
        use: 'json-loader',
        type: 'javascript/auto',
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          configFile: path.join(__dirname, '..', 'tsconfig.browser.json')
        },
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env']
        }
      }
    ]
  },
  node: {
    fs: 'empty'
  },
  optimization: {
    minimizer: [
      // new BundleAnalyzerPlugin(), // 打包后可查看各种包大小
      new UglifyJsPlugin({
        include: /\.min\.js$/,
        uglifyOptions: {
          compress: {
            // 在UglifyJs删除没有用到的代码时不输出警告
            warnings: false,
            // 删除所有的 `console` 语句，可以兼容ie浏览器
            drop_console: true,
            // 内嵌定义了但是只用到一次的变量
            collapse_vars: true,
            // 提取出出现多次但是没有定义成变量去引用的静态值
            reduce_vars: true
          },
          output: {
            // 最紧凑的输出
            beautify: false,
            // 删除所有的注释
            comments: false
          }
        }
      })
    ]
  }
};

const config = merge(common, {
  mode: 'none',
  output: {
    filename: 'inspirecloud-0.2.0.js'
  }
});

const configMin = merge(common, {
  mode: 'production',
  output: {
    filename: 'inspirecloud.min-0.2.0.js'
  }
});

module.exports = [config, configMin];
