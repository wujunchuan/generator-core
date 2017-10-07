module.exports = {
  // 基于airbnb规则
  "extends": "airbnb-base",
  env: {
    browser: true
  },
  // Custom rules
  rules: {
    // 不允许使用debugger
    "no-debugger": 2,
    // will drop all `console.log` in webpack
    "no-console": 0,
    // 警告 alert、confirm 和 prompt
    "no-alert": 1,
    // 不强制使用 === 与 !== 但是警告
    "eqeqeq": 1,
    // 不强制关键字周围空格的一致性,但是警告
    "keyword-spacing": 1,
    // 使用非单引号给予警告
    "quotes": [1, 'single'],
    // 不强制在模块顶部调用 require()
    "global-require": 0,
    "import/no-unresolved": 0,
    // import 允许不带ext后缀名
    "import/extensions": 0,
  },
};
