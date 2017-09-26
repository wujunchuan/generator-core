/*
* @Author: wujunchuan
* @Date:   2017-09-22 10:58:20
* @Last Modified by:   JohnTrump
* @Last Modified time: 2017-09-26 17:23:54
*/

import '../styles/index.css';

if(module.hot) {
    module.hot.accept();
}


console.log('你好  世界 -- 2017年09月26日10:39:48');
console.log('new Date().getTime():',new Date().getTime());
$('.first-note').text(new Date().getTime());