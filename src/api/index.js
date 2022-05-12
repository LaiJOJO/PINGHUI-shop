// 导入配置的默认axios模块
import requests from './request.js'
// 2.导入mock数据的axios模块
import mockAxios from './mockAxios'

// 暴露请求初始化数据的函数
export const reqCategoryList = ()=>{
  return requests({url:'/product/getBaseCategoryList',method:'GET'})
}

// 2. 暴露请求mock模拟的banner数据的函数
export const reqGetBannerList = ()=>{
  return mockAxios({url:'/banner',method:'GET'})
}