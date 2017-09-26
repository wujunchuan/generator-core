/*
* @Author: wujunchuan
* @Date:   2017-09-22 09:43:35
* @Last Modified by:   JohnTrump
* @Last Modified time: 2017-09-26 17:03:20
*/

// 基本的webpack配置

/* import plugins && libs */
const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin');

/* import config file */
const config  = require("./config.js");
const baseRoot = config.baseRoot;

const joinBaseRoot = file => path.join(baseRoot, file);
// 打包后的资源文件根目录(本地物理文件路径)
const ASSETS_BUILD_PATH = joinBaseRoot("./dist");
// 指向资源文件根目录
const ASSETS_PUBLIC_PATH = config.publicPath;
const SRC_PATH = joinBaseRoot('./client');


const webpackConfig = {
  context: SRC_PATH,

  // NOTICE: 命名规则按以下来
  // key: {String} [moduleName]/[subModuleName]
  // value: {String} [filepath]
  entry: {

    'jquery': ['./common/javascripts/jquery.js', './common/javascripts/utils'],

    'home/index': ['./home/javascripts/index.js'],
    'home/haha': ['./home/javascripts/haha.js'],

    'sub-home/index': ['./sub-home/javascripts/index.js'],
    'sub-home/haha': ['./sub-home/javascripts/haha.js']
  },

  output: {
    // 输出
    publicPath: ASSETS_PUBLIC_PATH,
    path: ASSETS_BUILD_PATH,
    filename: process.env.NODE_ENV === 'dev' ? '[name].js' : '[name].[chunkhash].js',
    chunkFilename: "[id].js",
  },

  module: {
    rules: [
      // handle picture
      {
        test: /\.(png|gif|jpe?g|icon?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "url-loader",
            options: {
              // limit: 8192,
              limit: 1,
              name: process.env.NODE_ENV === 'dev' ? '/static/images/[name].[ext]' : '/static/images/[name]-[hash].[ext]',
            }
          }
        ]
      },
      // handle fonts
      {
        test: /\.(eot|svg|ttf|woff)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: process.env.NODE_ENV === 'dev' ? '/static/fonts/[name].[ext]' : '/static/fonts/[name]-[hash].[ext]',
            }
          }
        ]
      },
    ]
  },

  plugins: [
    // 官方文档推荐使用下面的插件来定义NODE_ENV
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
    }),
    // A webpack plugin to remove/clean your build folder(s) before building
    // NOTE: 可以配置只删除模块下的dist
    // https://www.npmjs.com/package/clean-webpack-plugin
    new CleanWebpackPlugin(
      [ASSETS_BUILD_PATH], {
        // print log
        // verbose: true,
        verbose: process.env.NODE_ENV === 'dev' ? false : true,
        // delete files
        dry: process.env.NODE_ENV === 'dev' ? true : false,
        allowExternal: true,
      }
    ),
    // 抽离公共模块
    new webpack.optimize.CommonsChunkPlugin({
      name: ['jquery'],
      // 生成后的文件名，虽说用了[name]，但实际上就是'commons.bundle.js'了
      filename: '[name].js',
      filename: process.env.NODE_ENV === 'dev' ? '[name].js' : '[name].[hash].js',
      minChunks: Infinity
    }),
  ]
};

module.exports = webpackConfig;