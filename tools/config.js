/*
* @Author: wujunchuan
* @Date:   2017-09-22 09:45:54
* @Last Modified by:   JohnTrump
* @Last Modified time: 2017-09-27 16:55:29
*/

// 项目的配置信息

"use strict";

const path = require("path");
const baseRoot = path.join(__dirname, "..");

let publicPath = 'http://localhost:3000/';
let cdnPath = "//static.seeyouyima.com/www.meiyou.com";
// let cdnPath = "http://localhost:3000/";
let env = "development";
let ENV = process.env.NODE_ENV;
 //NOTE: 七牛云配置
let qiniu = {
  bucket : "test",//要上传的空间
  ACCESS_KEY : "-T7hLIgVpfX0l3ZuSlcOFzK3tdUC8TRJ2aQMCud2",
  SECRET_KEY : "KSNiOaDjPVoGa44nBHTQbaz4TtUw1_sw_7ucIXOU",
};

// NOTE:  API地址配置
if (ENV === "production" || ENV === "release" || ENV === "test") {
  env = ENV;
  if (env === "test") {
    //测试环境配置
  } else if (env === "release") {
    // 预发环境配置
  } else if (env === "production") {
    // 线上环境配置
  }
  publicPath = cdnPath;
}

exports.publicPath = publicPath;
exports.cdnPath = cdnPath;
exports.baseRoot = baseRoot;
exports.env = env;
exports.qiniu = qiniu;