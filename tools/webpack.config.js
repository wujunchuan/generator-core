/*
* @Author: wujunchuan
* @Date:   2017-09-22 10:27:35
* @Last Modified by:   JohnTrump
* @Last Modified time: 2017-09-25 17:04:12
*/

// 生产环境的 webpack 配置,继承自base

const webpack = require('webpack');

// 自动加浏览器前缀
const autoprefixer  = require("autoprefixer");
// 导入webpack.base.config.js
const config = require('./webpack.base.config.js');
// 抽离CSS文件的插件
const ExtractTextPlugin = require("extract-text-webpack-plugin");

/* 添加Loader */
config.module.rules.push(
  // handle scss|sass
  {
    test: /\.(scss|sass)$/,
    exclude: /node_modules/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
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
    })
  },
  // handle css
  {
    test: /\.css$/,
    exclude: /node_modules/,
    use: ExtractTextPlugin.extract({
      use: ['css-loader']
    })
  }
);

/* 添加插件 */
config.plugins.push(
  /* 启动minify */
  // loaders 的压缩模式将在 webpack 3 或后续版本中取消。
  new webpack.LoaderOptionsPlugin({
    minimize: true
  }),
  new webpack.optimize.UglifyJsPlugin({}),
  // 抽离CSS文件
  new ExtractTextPlugin({
    filename: '[name].[contenthash:20].css',
    allChunks: true,
    ignoreOrder: true
  })
);

module.exports = config;