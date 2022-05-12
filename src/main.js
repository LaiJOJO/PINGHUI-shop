import Vue from 'vue'
import App from './App.vue'
// 导入路由
import router from '@/router/router.js'
// 全局导入需要多次使用的导航组件
import TypeNav from '@/components/TypeNav/TypeNav.vue'
// 导入vuex全局渲染使用
import store from '@/store/index.js'
// 引入mock文件模拟数据
import '@/mock/mockServe.js'
// 导入swiper样式
import 'swiper/css/swiper.css'

Vue.config.productionTip = false
// 全局注册导航栏组件
Vue.component('TypeNav',TypeNav)

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')
