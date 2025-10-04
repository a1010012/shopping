// babel.config.js（Vue2 专用配置）
module.exports = {
  presets: [
    // Vue2 官方 Babel 预设，自动处理 Vue 文件和 ES6+ 语法
    ['@vue/app', {
      // 兼容配置（确保 IE11 等旧浏览器支持）
      targets: {
        browsers: ['last 2 versions', 'ie >= 11']
      }
    }]
  ]
}