/*
* @Author: JohnTrump
* @Date:   2017-09-22 14:25:55
* @Last Modified by:   JohnTrump
* @Last Modified time: 2017-10-05 14:15:35
*/

if (process.env.NODE_ENV == 'dev') {
  require('@/../server/views-dev/home/haha.html');
  if (module.hot) {
    console.clear();
    module.hot.accept();
  }
}

console.log('home-haha.js');
