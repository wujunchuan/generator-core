# 项目搭建记录

1. 初衷

	在代码中依赖的库很少会去主动升级版本,而自己的业务代码却每时每刻在变更,因此我们可以考虑将依赖的库的代码与自己的代码分割开来,这样用户在下一次使用的时候就可以尽量避免重复下载没有变更的代码
	
2. 设想的几种模式

	-  热更新开发模式(`npm run start`): 这种模式下看不到Webpack编译输出的文件,所有文件的读取都是在内存中进行。通过使用模块热替换(HRM) ,允许在开发中更新各种模块,而无需进行完全的刷新。

	-  测试开发模式(`npm run test-dev`): 用来检查**Webpack编译输出的文件是否正确**

	-  发布模式(`npm run build`): 

3. 分离Webpack配置文件

  由于webpack在开发和生产环境中经常需要做各种配置的切换，官方也提供了DefinePlugin来进行环境参数设置，但是大量的判断语句侵入webpack.config中其实会导致代码的可读性和复用性变差，也容易造成代码冗余，我们在此可以对配置文件进行重构，将之前的webpack配置文件拆解成了`webpack.bse.config.js`，和`webpack.dev.config.js`,`webpack.config.js`三个文件，三个文件各司其职，又可互相协作，减少维护成本

# 下一步计划

TODO...

# 参考

[Express结合Webpack的全栈自动刷新](http://acgtofe.com/posts/2016/02/full-live-reload-for-express-with-webpack)

[koala前端-Webpack构建之hash缓存的利用](https://blog.kaolafed.com/2017/04/26/webpack%E6%9E%84%E5%BB%BA%E4%B9%8Bhash%E7%BC%93%E5%AD%98%E7%9A%84%E5%88%A9%E7%94%A8/)