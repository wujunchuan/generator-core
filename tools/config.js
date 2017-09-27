/*
* @Author: wujunchuan
* @Date:   2017-09-22 09:45:54
* @Last Modified by:   JohnTrump
* @Last Modified time: 2017-09-27 17:28:45
*/

// 项目的配置信息

"use strict";

const path = require("path");
const baseRoot = path.join(__dirname, "..");

let publicPath = 'http://localhost:3000/';
// let cdnPath = "//static.seeyouyima.com/www.meiyou.com";
let cdnPath = "//os73093g5.bkt.clouddn.com";
let env = "development";
let ENV = process.env.NODE_ENV;
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