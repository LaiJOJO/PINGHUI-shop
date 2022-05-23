import { reqGetPassport, reqPostRegister, reqLogin, reqGetUserInfo, reqLogout } from '@/api/index.js'
import { getToken, removeToken, saveToken } from '@/utils/token/user'
const state = {
  passport: '',
  token: getToken(),
  userInfo: {}
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
  async login(context, user) {
    const res = await reqLogin(user)
    if (res.code == 200) {
      // 保存本地token
      saveToken(res.data.token)
      context.commit('LOGIN', res.data)
    } else {
      return Promise.reject(new Error(res.message))
    }
  },
  // 验证用户数据
  async getUserInfo(context) {
    const res = await reqGetUserInfo()
    if (res.code == 200) {
      context.commit('GETUSERINFO', res.data)
    } else {
      // 防止和路由产生bug，一直失败重复跳转，但是由于有token一直死循环
      removeToken()
      context.state.token = ''
      return Promise.reject(new Error(res.message))
    }
  },
  // 退出登录
  async logout(context) {
    const res = await reqLogout()
    if (res.code == 200) {
      // 清空仓库token和userInfo
      context.state.token = ''
      context.state.userInfo = {}
      return '退出成功'
    } else {
      return Promise.reject(new Error(res.message))
    }
  }
}
const mutations = {
  GETPASSPORT(state, passport) {
    state.passport = passport
  },
  LOGIN(state, data) {
    state.token = data.token
  },
  GETUSERINFO(state, data) {
    state.userInfo = data
  },
}
const getters = {}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}