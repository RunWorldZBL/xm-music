const registerRouter = require('./backend/router')

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // 全局引入变量和 mixin
        additionalData: `
          @import "@/assets/scss/variable.scss";
          @import "@/assets/scss/mixin.scss";
        `,
        implementation: require('sass') // 使用 dart-sass
      }
    }
  },
  devServer: {
    before(app) {
      registerRouter(app)
    },
    proxy: {
      // 代理所有以 `/api` 开头的请求
      "/api": {
        target: "https://node-express-psi-sepia.vercel.app", // 后端服务器地址
        changeOrigin: true, // 修改请求头中的 Host 为目标地址
      },
    },
  },
  configureWebpack: (config) => {
    if (process.env.npm_config_report) {
      const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
      config.plugins.push(new BundleAnalyzerPlugin())
    }
  },
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/'
}
