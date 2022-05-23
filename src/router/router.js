import Vue from "vue";
import VueRouter from "vue-router";
// 组件
import MyHome from "@/pages/Home/MyHome.vue";
import MyLogin from "@/pages/Login/MyLogin.vue";
import MyRegister from "@/pages/Register/MyRegister.vue";
import MySearch from "@/pages/Search/MySearch.vue";
import MyDetail from "@/pages/Detail/MyDetail.vue";
import MyAddShopSuccess from "@/pages/AddCartSuccess/AddShop.vue";
import shopCart from "@/pages/ShopCart/ShopCart.vue";
import MyTrade from "@/pages/trade/Trade.vue"
import MyPay from "@/pages/pay/MyPay.vue"
import PaySuccess from "@/pages/PaySuccess/PaySuccess.vue"
import MyCenter from "@/pages/Center/MyCenter"
import PersonCenter from "@/pages/Center/PersonCenter/PersonCenter.vue"
import GroupCenter from "@/pages/Center/GroupCenter/GroupCenter.vue"
// 导入仓库store,导航守卫要用
import userStore from '@/store/user/userStore'
import store from '@/store/index'

Vue.use(VueRouter);

const routes = [
  // 重定向路由
  { path: "/", redirect: "/home" },
  // 路由规则
  {
    path: "/home",
    component: MyHome,
    meta: { show: true },
  },

  {
    path: "/login",
    component: MyLogin,
    meta: { show: false },
  },

  {
    path: "/register",
    component: MyRegister,
    meta: { show: false },
  },

  {
    path: "/search/:keyword?",
    component: MySearch,

    name: "search",
    meta: { show: true },
  },

  {
    path: "/detail/:skuId",
    component: MyDetail,
    meta: { show: true },
  },

  {
    path: "/addcartsuccess",
    component: MyAddShopSuccess,
    name: "addCartSuccess",
    meta: { show: true },
  },

  {
    path: "/shopcart",
    component: shopCart,
    name: "shopCart",
    meta: { show: true },
  },
  {
    path:'/trade',
    component:MyTrade,
    name:'trade',
    meta:{show:true}
  },
  {
    path:'/pay',
    component:MyPay,
    name:'pay',
    meta:{show:true}
  },
  {
    path:'/paysuccess',
    component:PaySuccess,
    name:'paySuccess',
    meta:{show:true}
  },
  {
    path:'/center',
    component:MyCenter,
    name:'center',
    meta:{show:true},
    redirect:'center/personcenter',
    children:[
      {
        path:'personcenter',
        component:PersonCenter,
        name:'personCenter'
      },
      {
        path:'groupcenter',
        component:GroupCenter
      }
    ]
  }
];

// 重写路由的push方法，解决跳转报错问题，返回promise不设置回调会报错
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
// 利用函数call方法调用上面保存的原生push
VueRouter.prototype.push = function (loacation, resolve, reject) {
  // 传入了两个回调函数则将回调函数传给原生push执行
  if (resolve && reject) {
    // 将保存的原生push的this指向修改重写的push，保持this始终指向原生push
    originPush.call(this, loacation, resolve, reject);
  } else {
    // 没有传回调则执行两个空的回调，解决无回调报错问题
    originPush.call(
      this,
      loacation,
      () => { },
      () => { }
    );
  }
};
// replace同理
VueRouter.prototype.replace = function (loacation, resolve, reject) {
  if (resolve && reject) {
    // 将保存的原生push的this指向修改重写的push，保持this始终指向原生push
    originReplace.call(this, loacation, resolve, reject);
  } else {
    // 没有传回调则执行两个空的回调，解决无回调报错问题
    originReplace.call(
      this,
      loacation,
      () => { },
      () => { }
    );
  }
};

const router = new VueRouter({
  routes,
  // 重置滚动条
  scrollBehavior() {
    return { y: 0 };
  },
});

// 全局路由导航守卫
router.beforeEach(async (to, from, next) => {
  let token = userStore.state.token
  if (token) {
    if (to.path === '/login' || to.path === '/register') {
      next('/home')
    } else {
      // 有token，但没有用户信息，先请求再返回,刷新header的用户信息
      if (userStore.state.userInfo.name) {
        next()
      } else {
        try {
          // 返回失败需要重新登录
          await store.dispatch('user/getUserInfo')
          next()
        } catch (error) {
          userStore.state.token = ''
          alert('登录已过期,请重新登录')
          next('/login')
        }
      }
    }
  } else (
    next()
  )
}
)

export default router;
