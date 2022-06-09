import { reqDeatailList ,reqAddShopSuccess} from "../../api";
import {getUserUuid} from '../../utils/userUUID/uuid.js'

const actions = {
  // 接收发布的获取detail数据事件
  async getDatailList(context,skuId){
    const res = await reqDeatailList(skuId)
    if(res.code ==200){
      context.commit('GETDETAILLIST',res.data)
    }
  },
  // 接收提交商品购物车事件，响应数据没有data
  async addShopSuccess(context,skuInfo){
    const res = await reqAddShopSuccess(skuInfo.skuId,skuInfo.skuNum)
    if(res.code==200){
      return '添加成功'
    }else{
      return new Promise(new Error('添加失败'))
    }
  }
};
const mutations = {
  GETDETAILLIST(state,res){
    state.detailList = res
  }
};
const state = {
  detailList:{},
  userUuid:getUserUuid()
};
const getters = {
  // 分级导航信息
  categoryView(state){
    return state.detailList.categoryView||{}
  },
  // 右侧信息
  skuInfo(state){
    return state.detailList.skuInfo||{}
  },
  // 轮播图小图片
  skuImageList(state){
    return state.detailList.skuInfo.skuImageList||[]
  },
  // 右侧框当前选中属性
  skuSaleAttrValueList(state){
    return state.detailList.skuInfo.skuSaleAttrValueList||[]
  },
  // 右侧框的属性
  spuSaleAttrList(state){
    return state.detailList.spuSaleAttrList||[]
  }
};

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
};
