// 集中管理模块化vuex
// 导入vuex模块并注册挂载
import Vuex from "vuex";
import Vue from 'vue'
Vue.use(Vuex)

// 创建模块化vuex仓库
// 导入home模块对象
import home from './home/homeStore.js'

// 暴露实例化的vuex
export default new Vuex.Store({
  modules:{
    home
  }
})