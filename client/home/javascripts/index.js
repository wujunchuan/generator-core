/*
* @Author: wujunchuan
* @Date:   2017-09-22 10:58:20
* @Last Modified by:   JohnTrump
* @Last Modified time: 2017-10-04 22:57:51
*/

import '../styles/index.scss';

if (process.env.NODE_ENV == 'dev') {
  require('@/../server/views-dev/home/index.html');
  if(module.hot) {
    console.clear();
    module.hot.accept();
  }
}


console.log('new Date():', new Date());
