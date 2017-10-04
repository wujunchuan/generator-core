/*
* @Author: wujunchuan
* @Date:   2017-09-22 10:27:35
* @Last Modified by:   JohnTrump
* @Last Modified time: 2017-10-04 00:00:45
*/

// 生产环境的 webpack 配置,继承自base

const webpack = require('webpack');

// 自动加浏览器前缀
const autoprefixer  = require("autoprefixer");
// 导入webpack.base.config.js
const config = require('./webpack.base.config.js');
// 抽离CSS文件的插件
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// 生成.html
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 在生成的.html上插入内容
const HtmlWebpackBannerPlugin = require('html-webpack-banner-plugin');
// manifest
var ManifestPlugin = require('webpack-manifest-plugin');
const glob = require('glob');
const path = require('path');

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
        }
      ]
    })
  }
);

/* 添加插件 */

const bannerString = ` build: ${new Date().toLocaleString()} `;

config.plugins.push(
  // 记录打包的信息
  new ManifestPlugin(),
  // 插入头部时间戳
  new webpack.BannerPlugin({banner: bannerString}),
  /* 启动CSS minify */
  new webpack.LoaderOptionsPlugin({
    minimize: true
  }),
  /* 对js进行压缩 */
  new webpack.optimize.UglifyJsPlugin({}),
  // 抽离CSS文件
  // 使用的是extract-text-webpack-plugin插件，它提供了自己的一个contenhash，也是对于css文件建议的一种用法，保证了css有自己独立的hash，不会受到js文件的干扰
  new ExtractTextPlugin({
    filename: '[name].[contenthash:20].css',
    allChunks: true,
    ignoreOrder: true
  })
);

var pages = Object.keys(getEntry('server/views-dev/**/*.html', 'server/views-dev/'));
pages.forEach(function(pathname) {
  var conf = {
    filename: '../server/views-pro/' + pathname + '.html', //生成的html存放路径，相对于path
    template: 'html-loader?root=../../../client!./server/views-dev/' + pathname + '.html', //html模板路径,经过html-loader的处理,不会对此插件ejs语法进行编译
    inject: 'body',  //js插入的位置，true/'head'/'body'/false
    minify: { //压缩HTML文件
     removeComments: true, //移除HTML中的注释
     collapseWhitespace: true //删除空白符与换行符
    },
  };
  if (pathname in config.entry) {
    // conf.favicon = 'src/imgs/favicon.ico';
    conf.inject = 'body';
    conf.chunks = ['runtime', 'vendor', pathname];
  }
  config.plugins.push(new HtmlWebpackPlugin(conf));
});
// 往生成的.html文件中插入时间戳
config.plugins.push(new HtmlWebpackBannerPlugin({ banner: bannerString}));
// 该插件会根据模块的相对路径生成一个四位数的hash作为模块id, 建议用于生产环境。
config.plugins.push(new webpack.HashedModuleIdsPlugin());

function getEntry(globPath, pathDir) {
  var files = glob.sync(globPath);
  var entries = {},
    entry, dirname, basename, pathname, extname;

  for (var i = 0; i < files.length; i++) {
    entry = files[i];
    dirname = path.dirname(entry);
    extname = path.extname(entry);
    basename = path.basename(entry, extname);
    pathname = path.join(dirname, basename);
    pathname = pathDir ? pathname.replace(new RegExp('^' + pathDir), '') : pathname;
    entries[pathname] = ['./' + entry];
  }
  return entries;
}

module.exports = config;
