const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  assetsPublicPath:'./',
  outputDir:'dist',
  publicPath: process.env.NODE_ENV === 'production' ? '/pinhui-shop-web/' : '/',
  transpileDependencies: true,
  lintOnSave:false,
  devServer:{
    proxy:{
      '/api':{
        target:'http://gmall-h5-api.atguigu.cn',
      }
    }
  },
  productionSourceMap:false 
})
