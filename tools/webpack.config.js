/*
* @Author: wujunchuan
* @Date:   2017-09-22 10:27:35
* @Last Modified by:   JohnTrump
* @Last Modified time: 2017-10-22 01:02:46
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
// 将文件内联到生成的html中
var HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
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
  // Scope Hoisting
  // 当你使用这个插件的时候，模块热替换将不起作用，所以最好只在代码优化的时候才使用这个插件。
  // 运行 Webpack 时加上 --display-optimization-bailout 参数可以得知为什么你的项目无法使用 Scope Hoisting
  // Ref: https://zhuanlan.zhihu.com/p/27980441
  new webpack.optimize.ModuleConcatenationPlugin(),
  // 记录打包的信息
  new ManifestPlugin(),
  /* 启动CSS minify */
  new webpack.LoaderOptionsPlugin({
    minimize: true
  }),
  /* 对js进行压缩 */
  new webpack.optimize.UglifyJsPlugin({
    // 最紧凑的输出
    beautify: false,
    // 删除所有的注释
    comments: false,
    compress: {
      // 在UglifyJs删除没有用到的代码时不输出警告
      warnings: false,
      // 删除所有的 `console` 语句
      // 还可以兼容ie浏览器
      drop_console: true,
      // 内嵌定义了但是只用到一次的变量
      collapse_vars: true,
      // 提取出出现多次但是没有定义成变量去引用的静态值
      reduce_vars: true,
    }
  }),
  // 抽离CSS文件
  // 使用的是extract-text-webpack-plugin插件，它提供了自己的一个contenhash，也是对于css文件建议的一种用法，保证了css有自己独立的hash，不会受到js文件的干扰
  new ExtractTextPlugin({
    filename: '[name].[contenthash:20].css',
    allChunks: true,
    ignoreOrder: true
  }),

  // 插入头部时间戳
  new webpack.BannerPlugin({
    banner: bannerString,
    // 排除掉Webpack的runtime代码
    exclude: /runtime.*.js/
  })
);

var pages = Object.keys(getEntry('server/views-dev/**/*.html', 'server/views-dev/'));
pages.forEach(function(pathname) {
  var conf = {
    filename: '../server/views-pro/' + pathname + '.html', //生成的html存放路径，相对于path
    template: 'html-loader?root=../../../client!./server/views-dev/' + pathname + '.html', //html模板路径,经过html-loader的处理,不会对此插件ejs语法进行编译
    // 默认不插入[因为有一些文件是模板]
    inject: false,  //js插入的位置，true/'head'/'body'/false
    // 将Webpack的runtime代码以内联的形式插入HTML代码中
    inlineSource: 'runtime.*.js',
    minify: { //压缩HTML文件
     removeComments: true, //移除HTML中的注释
     collapseWhitespace: true //删除空白符与换行符
    },
  };
  if (pathname in config.entry) {
    conf.inject = 'body';
    conf.chunks = ['runtime', 'vendor', pathname];
  }
  // 生成HTML的插件
  config.plugins.push(new HtmlWebpackPlugin(conf));
  // 内联代码到HTML的插件
  config.plugins.push(new HtmlWebpackInlineSourcePlugin());
});
// 往生成的.html文件中插入时间戳
config.plugins.push(new HtmlWebpackBannerPlugin({ banner: bannerString}));
// 使用模块名称作为chunkid,替换掉原本的使用递增id来作为chunkid导致的[新增entry模块,其他模块的hash发生抖动,导致客户端长效缓存失效]
config.plugins.push(new webpack.NamedChunksPlugin((chunk) => {
  //
  if (chunk.name) {
    return chunk.name;
  }
  return chunk.modules.map(m => path.relative(m.context, m.request)).join("_");
}));
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
