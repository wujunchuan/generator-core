/*
* @Author: wujunchuan
* @Date:   2017-09-22 09:57:38
* @Last Modified by:   JohnTrump
* @Last Modified time: 2017-09-27 13:53:03
*/

// 用于开发环境的 Webpack 配置，继承自 base

const webpack = require('webpack');

// 导入webpack.base.config.js
const config = require('./webpack.base.config.js');

// 自动加浏览器前缀
const autoprefixer  = require("autoprefixer");
/* 添加Loader,不抽离 */
config.module.rules.push(
  // handle scss|sass,不抽离样式文件
  {
    test: /\.(scss|sass)$/,
    exclude: /node_modules/,
    use: [
    'style-loader',
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        plugins: function () {
          return [autoprefixer("last 5 versions", "> 0%")]
        }
      }
    },
    'sass-loader'
    ]
  },
  // handle css,不抽离样式文件
  {
    test: /\.css$/,
    exclude: /node_modules/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          plugins: function () {
            return [autoprefixer("last 5 versions", "> 0%")]
          }
        }
      },
    ]
  }
);

// Hot module replacement
Object.keys(config.entry).forEach((key) => {
  // 这里有一个私有的约定，如果 entry 是一个数组，则证明它需要被 hot module replace
  if (Array.isArray(config.entry[key])) {
    config.entry[key].unshift(
      'webpack-hot-middleware/client?reload=true'
    );
  }
});

/* 添加插件 */
config.plugins.push(
// 启动sourceMap的支持
  new webpack.SourceMapDevToolPlugin({
    filename: '[name].js.map',
    exclude: ['commons']
  }),
  // 启动HMR
  new webpack.HotModuleReplacementPlugin({
    // options...
  })
);

module.exports = config;