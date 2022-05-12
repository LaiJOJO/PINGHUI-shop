<!-- 地址: http://gmall-h5-api.atguigu.cn -->
<!-- 接口: /api/product/getBaseCategoryList -->

1. 基础配置：
1.1 浏览器自动打开 --- package.json script 加上后缀 --open ("serve": "vue-cli-service serve --open")
1.2 关闭eslint --- vue.config.js 加上 (lintOnSave : false)

2. 基本组件
2.1 Home首页路由组件、Search路由组件、Login路由组件、Refister路由组件
2.2 非路由组件 ： Header【首页|搜索框】、Footer【首页|搜索框】(登录页面没有)

3. 环境配置 : less-loader---@5 版本

4. 文件夹配置：
public : 放置静态资源(图片)，webpack打包时原封不动打包到dist
assets : 也是放置静态资源，但是打包时会被当成模块打包到js文件内
pages : 用来放路由组件
router : 用来放路由规则文件 router.js

5. 步骤：
a. 模块化配置home组件
b. 重写搜索框的编程式导航的push未指定回调多次点击报错的问题
c. 配置axios请求，不设置地址，只有url，用代理来进行模拟练习

d. nprogress包配合进度条使用,在拦截器设置开启关闭，使用axios实例对象发请求时，拦截器要配置在实例对象上

e. TypeNav组件发布store管理请求，使用vuex管理请求回来的数据，渲染的到导航栏的三级分类区域，
vuex请求数据可以在app根组件进行数据初始化，后续不会再次请求影响性能

f. 用js完成鼠标选中变色事件，不要用hover,锻炼一下 ；同理用js完成二三级栏显示隐藏，都是三元表达式配合v-for完成

 g. 给一级导航设置节流，防止鼠标移动过快

 h. 对三级导航设置路由跳转，由于rouer-link数量较多时影响性能，因此采用编程式导航，并且将触发事件委派给父元素进行代理，减少内存消耗 ; 采用添加自定义属性的方法来筛选是否为所需元素

 i. 三级联动导航只在home页面默认展示，所以设置v-show或if控制显示隐藏，且在声明周期函数的渲染阶段进行判断，路径没有'/home'就隐藏 ; 
 移入移出的展示也要先判断路径 
 对一级分类栏添加过渡动画;

 j. 合并参数 ：通过侧边栏跳转的search路径携带了query,搜索框跳转的路径会携带params参数,因此要进行合并

 第二步骤：
 a. mockjs模拟数据---步骤:
 1. src创建mock文件夹
 2. mock下创建需要的数据的json文件
 3. 创建mockServe.js入口文件
 4. main.js直接引入

 b. 添加新的ajax请求，通过banner图的组件发起vuex事件，再请求模拟的mock数据

 c. 使用swiper包，配合js实现轮播图