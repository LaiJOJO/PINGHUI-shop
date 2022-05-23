import Vue from "vue";
import App from "./App.vue";
// 导入路由
import router from "@/router/router.js";
// 全局导入需要多次使用的导航组件
import TypeNav from "@/components/TypeNav/TypeNav.vue";
import Carousel from "@/components/Carousel/Carousel.vue"
import Pagination from "@/components/Pagination/MyPagination.vue"
// 导入vuex全局渲染使用
import store from "@/store/index.js";
// 引入mock文件模拟数据
import "@/mock/mockServe.js";
// 导入swiper样式
import "swiper/css/swiper.css";
// 导入element组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false;
// 全局注册组件
Vue.component("TypeNav", TypeNav);
Vue.component("MyCarousel", Carousel)
Vue.component("MyPagination", Pagination)

new Vue({
  // 设置$bus
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  render: (h) => h(App),
  store,
  router,
}).$mount("#app");
