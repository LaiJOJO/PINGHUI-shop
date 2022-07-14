import axios from 'axios'
// 导入nprogress包进行进度条渲染，配合css使用
import nprogress from 'nprogress'
// 导入对应样式
import 'nprogress/nprogress.css'
// 直接导入store仓库，暴力获取detail组件的state下的游客信息
import store from '../store/datail/detailStore'
import userStore from '../store/user/userStore'

// 实例化axios，配置默认选项
const requests = axios.create({
  baseURL: '/api',
  timeout: 5000
})

// 配置拦截器对数据进项处理
requests.interceptors.request.use((config) => {
  // 配置请求头附带游客信息,判断detail仓库是否保存游客信息
  if (store.state.userUuid) {
    config.headers.userTempId = store.state.userUuid
  }
  // 携带token，如果有
  if (userStore.state.token) {
    config.headers.token = userStore.state.token
  }
  // 开启进度条渲染
  nprogress.start()
  return config
}, (err) => {
  console.log(err)
})

// 配置响应拦截器,解构数据
requests.interceptors.response.use((res) => {
  // 关闭进度条渲染
  nprogress.done()
  return res.data
}, (err) => {
  // 中断Promise链
  return Promise.reject(new Error(err))
})


export default requests