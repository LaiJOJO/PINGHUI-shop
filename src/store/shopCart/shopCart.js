import { reqShopCart, reqAddShopSuccess, reqDelShopCart, reqCheckShopCart } from "../../api"
const state = {
  shopCart: []
}
const actions = {
  // 添加购物车
  async addShopCart(context) {
    const res = await reqShopCart()
    if (res.code == 200) {
      context.commit('ADDSHOPCART', res.data)
    } else {
      alert('获取信息失败')
    }
  },
  // 更新购物车数量，没有返回数据，通过返回失败的Promise给订阅者通知
  async updateShopCart(context, skuInfo) {
    const res = await reqAddShopSuccess(skuInfo.skuId, skuInfo.skuNum)
    if (res.code == 200) {
      return '添加成功'
    } else {
      return Promise.reject(new Error('添加失败'))
    }
  },
  // 删除购物车
  async delShopCart(context, skuId) {
    const res = await reqDelShopCart(skuId)
    if (res.code == 200) {
      return '删除成功'
    } else {
      return Promise.reject(new Error('删除失败'))
    }
  },
  // 删除多个选中的商品
  delAllShopCart(context) {
    // 过滤选中商品
    let shopCartIsChecked = context.getters.cartList.filter((eachShopCart) => eachShopCart.isChecked)
    if (!shopCartIsChecked[0]) return
    // 保存枚举的Promise返回值
    let allPromise = []
    shopCartIsChecked.forEach(eachShopCart => {
      // 直接将Promise形态加入数组
        const res = context.dispatch('delShopCart', eachShopCart.skuId)
        allPromise.push(res)
    })
    return Promise.all(allPromise)
  },
   // 切换选中状态
   async changeChecked(context, skuInfo) {
    const res = await reqCheckShopCart(skuInfo.skuId, skuInfo.isChecked)
    if (res.code == 200) {
      return ('ok')
    } else {
      return Promise.reject(new Error('操作失败'))
    }
  },
  // 更新全选按钮
  allIsChecked(context,allIsChecked){
    let shopCartNoIsChecked = context.getters.cartList.filter((eachShopCart) => eachShopCart.isChecked == !allIsChecked)
    let allPromise = []
    // 空数组直接返回
    if(!shopCartNoIsChecked[0]) return
    shopCartNoIsChecked.forEach( eachNoIsChecked=>{
      let isChecked =  eachNoIsChecked.isChecked == false ? 1 : 0
      const res = context.dispatch('changeChecked',{skuId:eachNoIsChecked.skuId,isChecked})
      allPromise.push(res)
    })
    return Promise.all(allPromise)
  }
}
const mutations = {
  ADDSHOPCART(state, data) {
    state.shopCart = data
  }
}
const getters = {
  cartList(state) {
    return state.shopCart[0]?.cartInfoList || []
  },
  sumPrice(state){
    if(!state.shopCart[0]?.cartInfoList) return []
    let price = 0
    state.shopCart[0]?.cartInfoList.forEach((item)=>{
      price += item.skuPrice * item.skuNum
    })
    return price
  },
  sumCount(state){
    if(!state.shopCart[0]?.cartInfoList) return 0
    return state.shopCart[0]?.cartInfoList.filter((item)=>{
      return item.isChecked
    }).length
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}