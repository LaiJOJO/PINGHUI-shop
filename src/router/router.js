import Vue from 'vue'
import VueRouter from 'vue-router'
// 组件
import MyHome from '@/pages/Home/MyHome.vue'
import MyLogin from '@/pages/Login/MyLogin.vue'
import MyRegister from '@/pages/Register/MyRegister.vue'
import MySearch from '@/pages/Search/MySearch.vue'

Vue.use(VueRouter)

const routes = [
  // 重定向路由
  {path:'/',redirect:'/home'},
  // 路由规则
  {path:'/home',component:MyHome,meta:{show:true}},
  {path:'/login',component:MyLogin,meta:{show:false}},
  {path:'/register',component:MyRegister,meta:{show:false}},
  {path:'/search/:keywords?',component:MySearch,name:'search',meta:{show:true}}
]
// 重写路由的push方法，解决跳转报错问题，返回promise不设置回调会报错
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
// 利用函数call方法调用上面保存的原生push
VueRouter.prototype.push = function(loacation,resolve,reject){
  // 传入了两个回调函数则将回调函数传给原生push执行
  if(resolve && reject){
    // 将保存的原生push的this指向修改重写的push，保持this始终指向原生push
    originPush.call(this,loacation,resolve,reject)
  }else{
    // 没有传回调则执行两个空的回调，解决无回调报错问题
    originPush.call(this,loacation,()=>{},()=>{})
  }
}
// replace同理
VueRouter.prototype.replace = function(loacation,resolve,reject){
  if(resolve && reject){
    // 将保存的原生push的this指向修改重写的push，保持this始终指向原生push
    originReplace.call(this,loacation,resolve,reject)
  }else{
    // 没有传回调则执行两个空的回调，解决无回调报错问题
    originReplace.call(this,loacation,()=>{},()=>{})
  }
}

const router = new VueRouter({
  routes
})

export default router