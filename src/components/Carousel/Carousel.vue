<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="crousel in list" :key="crousel.id">
        <img :src="crousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  props:['list'],
  name: 'MyCarousel',
  watch: {
    // watch监听数据返回完毕，配合nextTick使用swiper实例化
    list: {
      handler() {
        // 监听返回的数据是否完全渲染，否则直接监听数据渲染不能确定数据是否返回完整
        this.$nextTick(() => {
          // swiper组件实例化调用
          new Swiper(this.$refs.mySwiper, {
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: true
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }
          })
        })
      },
      deep: true,
      immediate:true
    }
  }
}
</script>

<style>
</style>