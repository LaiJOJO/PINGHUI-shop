<template>
  <div>
    <!-- <button @click="show">点击这里</button> -->
    <MyHeader></MyHeader>
    <router-view></router-view>
    <!-- 利用this,$route和元容器meta来控制底部是否显示,登录不显示 -->
    <MyFooter v-show="$route.meta.show"></MyFooter>
  </div>
</template>

<script>
import MyHeader from './components/Header/MyHeader.vue'
import MyFooter from './components/Footer/MyFooter.vue'
export default {
  name: 'App',
  components:{
    MyHeader,
    MyFooter,
  },
  methods: {
    show(){
      console.log(this.$route)
    },
  },
  mounted(){
    // 避免重复请求，因此只在根组件初始化vuex仓库
    this.$store.dispatch('categorylist')
  }
}
</script>

<style>

</style>
