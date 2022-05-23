import { reqGetPersonCenter } from "@/api"
const state = {
  personCenter:{}
}
const actions = {
  async getPersonCenter(context,info){
   const res = await reqGetPersonCenter(info.page,info.limit)
   if(res.code == 200){
     context.commit('GETPERSONCENTER',res.data)
   }else{
     return Promise.reject('获取订单信息错误，请重新获取')
   }
  }
}
const mutations = {
  GETPERSONCENTER(state,data){
    state.personCenter = data
  }
}
const getters = {
  records(state){
    return state.personCenter.records || []
  }
}

export default{
  namespaced:true,
  state,
  actions,
  mutations,
  getters
}