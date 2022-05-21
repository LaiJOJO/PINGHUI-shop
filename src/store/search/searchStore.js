// 导入请求searchList请求模块
import { reqSearchList } from "@/api/index";

const actions = {
  async getSearchList(context, params = {}) {
    const res = await reqSearchList(params);
    if (res.code === 200) {
      context.commit("GETSEARCHLIST", res.data);
    } else {
      alert("获取信息失败");
    }
  },
};
const mutations = {
  GETSEARCHLIST(state, value) {
    state.SearchList = value;
  },
};
const state = {
  SearchList: [],
};
const getters = {
  goodsList(state) {
    // 如果没请求返回的是空{}则将空数组[]作为临时数据
    return state.SearchList.goodsList || [];
  },
  attrsList(state) {
    return state.SearchList.attrsList || [];
  },
  trademarkList(state) {
    return state.SearchList.trademarkList || [];
  },
};

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
};
