/*
* @Author: wujunchuan
* @Date:   2017-09-22 10:58:20
* @Last Modified by:   JohnTrump
* @Last Modified time: 2017-10-25 09:16:27
*/

import '../styles/index.scss';

if (process.env.NODE_ENV === 'dev') {
  require('@/server/views-dev/home/index.html');
  if (module.hot) {
    module.hot.accept();
  }
}

console.log('hello world\n2017年10月23日10:28:50');

/**
 * 测试异步加载js模块
 */
document.getElementById('test').addEventListener('click', function () {
  // BUG: uglyPlugin will broken when use import dynamic lazyload
  // import('./index2.js').then(function () {
  //   console.log('import index2.js done');
  // });
  require.ensure([], function (require) {
    require('./index2.js');
    console.log('import index2.js done');
  });
});
