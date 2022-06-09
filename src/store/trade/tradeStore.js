import { reqTradeList, mockGetUserAddress } from "../../api"
const state = {
  tradeList: [],
  userAddressList: [],
  data:{}
}
const actions = {
  async getTradeList(context) {
    const res = await reqTradeList()
    const address = await mockGetUserAddress()
    if (res.code === 200 && address.code === 200) {
      context.commit('GETTRADELIST', { tradeList: res.data.detailArrayList, address: address.data ,data:res.data})
    } else {
      return Promise.reject(new Error(res.message))
    }
  }
}
const mutations = {
  GETTRADELIST(state, userTrade) {
    state.userAddressList = userTrade.address
    state.tradeList = userTrade.tradeList
    state.data = userTrade.data
  }
}
const getters = {
  sumPrice(state){
    let price = 0
    state?.tradeList.forEach((eachTrade)=>{
      price += eachTrade.skuNum * eachTrade.orderPrice
    })
    return price
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
