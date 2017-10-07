/*
* @Author: wujunchuan
* @Date:   2017-09-22 10:58:20
* @Last Modified by:   JohnTrump
* @Last Modified time: 2017-10-04 23:06:53
*/

import '../styles/index.css';

if (process.env.NODE_ENV == 'dev') {
  require('../../../server/views-dev/sub-home/index.html');
  if (module.hot) {
    console.clear();
    module.hot.accept();
  }
}
