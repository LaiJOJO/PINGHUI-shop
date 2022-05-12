// 发送请求，获取数据，放到home仓库管理
import {reqCategoryList,reqGetBannerList} from '@/api/index.js'

// home模块，需要暴露对象
const actions = {
  // 初始化数据事件
  async categorylist(context){
    const {data:res} = await reqCategoryList()
    context.commit('category',res)
  },
  // 轮播图mock模拟请求事件
  async getBannerList(context){
    const resBanner = await reqGetBannerList()
    if(resBanner.code === 200){
      context.commit('GETBANNERLIST',resBanner.data)
    }
  }
}
const mutations = {
  category(state,value){
    state.CategoryList = value
  },
  GETBANNERLIST(state,value){
    state.BannerList = value
  }
}
const state = {
  CategoryList:[],
  BannerList:[]
}
const getters = {}

export default{
  namespace:true,
  actions,
  mutations,
  state,
  getters
}