// .eslintrc.js 正确配置（Vue2）
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
    // 移除这行：'vue/setup-compiler-macros': true
  },
  extends: [
    'plugin:vue/essential', // Vue2 基础规则
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint', // 之前安装的解析器
    sourceType: 'module'
  },
  plugins: ['vue'] // Vue 插件
}