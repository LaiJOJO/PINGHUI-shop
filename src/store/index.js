// 集中管理模块化vuex
// 导入vuex模块并注册挂载
import Vuex from "vuex";
import Vue from 'vue'
Vue.use(Vuex)

// 创建模块化vuex仓库
// 导入home模块对象
import home from './home/homeStore.js'
// 导入search仓库对象
import search from './search/searchStore.js'
// detail 仓库对象
import detail from './datail/detailStore.js'
// shopcart购物车列表仓库模块
import shopCart from "./shopCart/shopCart.js";
// user用户信息仓库模块
import user from './user/userStore.js'
// 商品交易页面trade模块
import trade from './trade/tradeStore.js'
// 个人订单中心
import center from './center/center.js'

// 暴露实例化的vuex
export default new Vuex.Store({
  modules: {
    home,
    search,
    detail,
    shopCart,
    user,
    trade,
    center
  }
})