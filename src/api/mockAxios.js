import axios from 'axios'
// 导入nprogress包进行进度条渲染，配合css使用
import nprogress from 'nprogress'
// 导入对应样式
import 'nprogress/nprogress.css'

// 实例化axios，配置默认选项
const requests = axios.create({
  // 没有写地址，方便进行练习proxy
  baseURL:'/mock',
  timeout:5000
})

// 配置拦截器对数据进项处理
requests.interceptors.request.use((config)=>{
  // 开启进度条渲染
  nprogress.start()
  return config
},(err)=>{
  console.log(err)
})

// 配置响应拦截器,解构数据
requests.interceptors.response.use((res)=>{
  // 关闭进度条渲染
  nprogress.done()
  return res.data
},(err)=>{
  // 中断Promise链
  return Promise.reject(new Error(err))
})


export default requests