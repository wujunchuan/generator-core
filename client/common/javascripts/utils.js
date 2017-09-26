// Copyright © 2017 Meetyou Tech. All Rights Reserved.

/**
 * @overview 工具类
 * @author wujunchuan@xiaoyouzi.com (Wujunchuan)
 * @create time: 2017-07-11
 */

/**
 * printLog 在控制台中打印招聘信息
 */
function printLog() {
    var e;
    var t;
    var s;
    var n;
    var i;
    if (window.console && (typeof console.log !== "undefined")) {
        try {
            (window.parent.__has_console_security_message || window.top.__has_console_security_message) && (e = !0);
        } catch (o) {
            e = !0;
        }
        if (window.__has_console_security_message || e) {
            return;
        }
        var meetyou = "\n        :::   :::   :::::::::: :::::::::: ::::::::::: :::   :::  ::::::::  :::    :::\n      :+:+: :+:+:  :+:        :+:            :+:     :+:   :+: :+:    :+: :+:    :+:\n    +:+ +:+:+ +:+ +:+        +:+            +:+      +:+ +:+  +:+    +:+ +:+    +:+\n   +#+  +:+  +#+ +#++:++#   +#++:++#       +#+       +#++:   +#+    +:+ +#+    +:+\n  +#+       +#+ +#+        +#+            +#+        +#+    +#+    +#+ +#+    +#+\n #+#       #+# #+#        #+#            #+#        #+#    #+#    #+# #+#    #+#\n###       ### ########## ##########     ###        ###     ########   ########"
        t =
            "\u0020\u0020\u516d\u5927\u6838\u5fc3\u529f\u80fd\uff1a\u63d0\u4f9b\u6708\u7ecf\u8bb0\u5f55\u3001\u7ecf\u671f\u8ddf\u8e2a\u7b49\u591a\u529f\u80fd\u3002\u53ca\u65f6\u63d0\u9192\u5973\u6027\u7ecf\u671f\u62a4\u7406\uff0c\u8ba9\u751f\u6d3b\u66f4\u8212\u5fc3\uff01\u7f8e\u67da\u0020\u007c\u0020\u5973\u751f\u52a9\u624b\uff0c\u4e2d\u56fd\u5973\u6027\u7684\u6b63\u786e\u9009\u62e9\uff01";
        s =
            "\u4e16\u754c\u662f\u6211\u4eec\u0063\u006f\u0064\u0069\u006e\u0067\u51fa\u6765\u7684\uff0c\u5feb\u5feb\u52a0\u5165\u6211\u4eec\u5427\uff01";
        n = "\n\n美柚(meiyou.com)，前端开发工程师岗位等你来，坐标厦门/杭州，简历可邮件至 myzhaopin#xixiaoyou.com (请将#替换为@，标题格式:姓名-前端开发工程师-来自美柚首页)";
        i = [s, " ", n].join("");
        /msie/gi.test(navigator.userAgent) ? (console.log(t), console.log(i)) : (console.log(
            "%c " + meetyou + " %c Copyright \xa9 2013-%s",
            "color: #ff5072; -webkit-text-fill-color: #ff5072; -webkit-text-stroke:  1px #ff5072;",
            "font-size: 12px; color: #999;", (new Date).getFullYear()), console.log("%c " + t,
            "color:#333;font-size:16px;"), console.log("\n " + i));
    }
}

/**
 * ready 使用原生JS来实现的JQuery Ready方法
 * 为了解耦公共模块对jQuery的依赖,尽可能的在公共模块使用原生js代码
 * @param fn 需要执行的回调函数
 * @author John Trump
 */
function ready(fn) {
    if (document.addEventListener) { //标准浏览器
        document.addEventListener("DOMContentLoaded", function () {
            //注销监听事件，避免重复触发
            document.removeEventListener("DOMContentLoaded", arguments.callee, false);
            fn(); //运行函数
        }, false);
    } else if (document.attachEvent) { //IE浏览器
        document.attachEvent("onreadystatechange", function () {
            if (document.readyState == "complete") {
                document.detachEvent("onreadystatechange", arguments.callee);
                fn(); //函数运行
            }
        });
    }
}

/**
 * HTTP GET请求
 * @param  {String}   url      Ajax请求路径
 * @param  {Object|NULL}   data     需要请求的数据,可以为空,让URL拼接字符串过来
 * @param  {Function} callback 成功的回调函数
 */
function get(url, data, callback) {
  $.ajax({
    type: 'get',
    dataType: 'json',
    data: data,
    timeout: 30000,
    url: url,
    success: callback,
    error: function (error) {
      console.log('ajax[get] URL:' + url);
      console.error(error);
    }
  });
  return {
    url: url,
    data: data,
  };
}

function post(url, data, callback) {
  $.ajax({
    type: 'post',
    dataType: 'json',
    data: data,
    timeout: 30000,
    url: url,
    success: callback,
    error: function(error) {
      console.log('ajax[post] URL:' + url);
      console.error(error);
    }
  });
  return {
    url: url,
    data: data
  };
}

module.exports = {
  printLog: printLog,
  ready: ready,
  get: get,
  post: post
};
