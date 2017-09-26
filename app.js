/*
 * @Author: JohnTrump
 * @Date:   2017-09-25 16:17:18
 * @Last Modified by:   JohnTrump
 * @Last Modified time: 2017-09-26 12:00:36
 */

var express = require('express');
var path = require('path');
var consolidate = require('consolidate');

var isDev = process.env.NODE_ENV !== 'production';
var app = express();
var port = 3000;

app.engine('html', consolidate.ejs);
app.set('view engine', 'html');
app.set('views', path.resolve(__dirname, './server/views-dev'));

// local variables for all views
app.locals.env = process.env.NODE_ENV || 'dev';
app.locals.reload = true;

/**
 * 开发模式
 *   Browser-Sync
 *   Hot Module Replace (HMR)
 *   Supervisor
 */
if (isDev) {
  // static assets served by webpack-dev-middleware & webpack-hot-middleware for development
  var webpack = require('webpack');
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var webpackDevConfig = require('./tools/webpack.dev.config.js');
  var compiler = webpack(webpackDevConfig);
  // attach to the compiler & the server
  app.use(webpackDevMiddleware(compiler, {
    // public path should be the same with webpack config
    publicPath: webpackDevConfig.output.publicPath,
    noInfo: true,
    stats: {
      colors: true
    }
  }));
  app.use(webpackHotMiddleware(compiler, {
    timeout: 2000
  }));
  require('./server/routes')(app);
  // add "reload" to express, see: https://www.npmjs.com/package/reload
  // 当Express发生改变的时候,自动重启服务器
  var reload = require('reload');
  var http = require('http');
  var server = http.createServer(app);
  reload(server, app);
  server.listen(port, function() {
    console.log('App (dev) is now running on port 3000! --- ' + new Date().getTime());
  });
  // 如果只是修改view的文件,就不需要重启服务器,这里我们引用了browser-sync
  // 注意,Browser-Sync只专注于监听views-dev/的修改,想要css与js修改的模块热更新,请使用3000端口
  var bs = require('browser-sync').create();
  bs.init({
    open: false,
    ui: false,
    notify: true,
    proxy: 'http://localhost:3000',
    files: ['./server/views-dev/**'],
    port: 8080
  })
  console.log('App (dev) is going to be running on port 8080 (by browsersync).');

} else {
  // static assets served by express.static() for production
  app.use(express.static(path.join(__dirname, 'public')));
  require('./server/routes')(app);
  app.listen(port, function() {
    console.log('App (production) is now running on port 3000!');
  });
}