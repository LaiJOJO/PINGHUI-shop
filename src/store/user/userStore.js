import { reqGetPassport, reqPostRegister,reqLogin } from '@/api/index.js'
const state = {
  passport: '',
  token:''
}
const actions = {
  // 获取验证码
  async getPassPort(context, phone) {
    const res = await reqGetPassport(phone)
    if (res.code == 200) {
      context.commit('GETPASSPORT', res.data)
    } else {
      alert('获取验证码失败！')
    }
  },
  // 完成注册
  async register(context, info) {
    const res = await reqPostRegister(info)
    if (res.code == 200) {
      return '注册成功'
    } else {
      return Promise.reject(new Error(res.message))
    }
  },
  // 登录事件
  async login(context,user){
    const res = await reqLogin(user)
    if(res.code == 200){
      context.commit('LOGIN',res.data)
    }else{
      return Promise.reject(new Error(res.message))
    }
  }
}
const mutations = {
  GETPASSPORT(state, passport) {
    state.passport = passport
  },
  LOGIN(state,data){
    state.token = data.token
  }
}
const getters = {}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}