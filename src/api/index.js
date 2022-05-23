// 导入配置的默认axios模块
import requests from './request.js'
// 2.导入mock数据的axios模块
import mockAxios from './mockAxios'

// 暴露请求初始化数据的函数
export const reqCategoryList = () => {
  return requests({ url: '/product/getBaseCategoryList', method: 'GET' })
}

// 2. 暴露请求mock模拟的banner数据的函数
export const reqGetBannerList = () => {
  return mockAxios({ url: '/banner', method: 'GET' })
}

// 3. 暴露mock模拟的floor数据函数
export const reqFloorList = () => {
  return mockAxios({ url: '/floor', method: 'GET' })
}

// 4. 发起post请求获取searchList数据函数
export const reqSearchList = (params) => {
  return requests({ url: '/list', method: 'POST', data: params })
}

// 5. 发起get请求获取detailList数据函数
export const reqDeatailList = (skuId) => {
  return requests({ url: `/item/${skuId}`, method: 'GET' })
  // return mockAxios({url:'detail',method:'GET'})
}

// 6. 发起post请求获取购物车是否添加成功
export const reqAddShopSuccess = (skuId, skuNum) => {
  return requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'POST' })
}

// 7. 发起购物车数据get请求
export const reqShopCart = () => {
  return requests({ url: '/cart/cartList', method: 'GET' })
}

// 8. 发起删除购物车请求delete
export const reqDelShopCart = (skuId) => {
  return requests({ url: `/cart/deleteCart/${skuId}`, method: 'DELETE' })
}

// 9.发起选中选项修改get
export const reqCheckShopCart = (skuId, isChecked) => {
  return requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'GET' })
}

// 10.发起获取验证码请求
export const reqGetPassport = (phone) => {
  return requests({ url: `/user/passport/sendCode/${phone}`, method: 'GET' })
}

// 11. 发起完成注册请求
export const reqPostRegister = (info) => {
  return requests({ url: '/user/passport/register', method: 'POST', data: info })
}

// 12. 登录Post获取token
export const reqLogin = (user) => {
  return requests({ url: '/user/passport/login', method: 'POST', data: user })
}

// 13. 根据token验证用户信息
export const reqGetUserInfo = () => {
  return requests({url:'/user/passport/auth/getUserInfo',method:'GET'})
}

// 13. 根据请求头携带的token发送登出请求
export const reqLogout = () => {
  return requests({url:'/user/passport/logout',method:'GET'})
}

// 14. 发起交易页面请求
export const reqTradeList = () => {
  return requests({url:'/order/auth/trade',method:'GET'})
}

//  15. 发起mock模拟请求用户地址信息
export const mockGetUserAddress = () => {
  return mockAxios({ url: '/address', method: 'GET' })
}

//  16. 提交订单POST请求
export const reqGetSubmitList = (tradeNo,listData)=>{
  return requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data:listData,method:'POST'})
}

//  17. 获取二维码get请求
export const reqGetWechat = (orderId)=>{
  return requests({url:`/payment/weixin/createNative/${orderId}`,method:'GET'})
}

// 18. 查询订单状态get方法
export const reqGetListState = (orderId)=>{
  return requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'GET'})
}

// 19. 获取我的订单列表
export const reqGetPersonCenter  = (page,limit)=>{
  return requests({url:`/order/auth/${page}/${limit}`,method:'GET'})
}