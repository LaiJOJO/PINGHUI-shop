import Vue from "vue";
import VueRouter from "vue-router";
// 导入仓库store,导航守卫要用
import userStore from '../store/user/userStore'
import store from '../store/index'
import { MessageBox } from 'element-ui'

Vue.use(VueRouter);

const routes = [
  // 重定向路由
  { path: "/", redirect: "/home" },
  // 路由规则
  {
    path: "/home",
    component: () => import("../pages/Home/MyHome.vue"),
    meta: { show: true },
  },

  {
    path: "/login",
    component: () => import("../pages/Login/MyLogin.vue"),
    meta: { show: false },
  },

  {
    path: "/register",
    component: () => import("../pages/Register/MyRegister.vue"),
    meta: { show: false },
  },

  {
    path: "/search/:keyword?",
    component: () => import("../pages/Search/MySearch.vue"),

    name: "search",
    meta: { show: true },
  },

  {
    path: "/detail/:skuId",
    component: () => import("../pages/Detail/MyDetail.vue"),
    meta: { show: true },
  },

  {
    path: "/addcartsuccess",
    component: () => import("../pages/AddCartSuccess/AddShop.vue"),
    name: "addCartSuccess",
    meta: { show: true },
  },

  {
    path: "/shopcart",
    component: () => import("../pages/ShopCart/ShopCart.vue"),
    name: "shopCart",
    meta: { show: true },
  },
  {
    path: '/trade',
    component: () => import("../pages/trade/Trade.vue"),
    name: 'trade',
    meta: { show: true }
  },
  {
    path: '/pay',
    component: () => import("../pages/pay/MyPay.vue"),
    name: 'pay',
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if (from.path === '/trade') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/paysuccess',
    component: () => import("../pages/PaySuccess/PaySuccess.vue"),
    name: 'paySuccess',
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if (from.path === '/pay') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/center',
    component: () => import("../pages/Center/MyCenter"),
    name: 'center',
    meta: { show: true },
    redirect: 'center/personcenter',
    children: [
      {
        path: 'personcenter',
        component: () => import("../pages/Center/PersonCenter/PersonCenter.vue"),
        name: 'personCenter'
      },
      {
        path: 'groupcenter',
        component: () => import("../pages/Center/GroupCenter/GroupCenter.vue")
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
          MessageBox.alert('登录已过期,请重新登录', 'Tips', {
            confirmButtonText: '点击前往登录页面',
            callback: () => {
              next('/login')
            }
          });
        }
      }
    }
  } else {
    // 去的路径包含pay，trade等关键字则不允许跳转
    if (to.path.indexOf('/center') !== -1 || to.path.indexOf('/pay') !== -1 || to.path.indexOf('/trade') !== -1) {
      // alert('请登录后查看')
      MessageBox.alert('请登录后查看', 'Tips', {
        confirmButtonText: '点击前往登录页面',
        callback: () => {
          next('/login/?redirect=' + to.path)
        }
      });
    } else {
      next()
    }
  }
})


export default router;
