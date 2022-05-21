<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="eachSkuImg in skuInfo.skuImageList" :key="eachSkuImg.id">
        <img :src="eachSkuImg.imgUrl" :class="eachSkuImg.isDefault == 1 ? 'active' : ''"
          @click="currentImg(eachSkuImg, skuInfo.skuImageList)" />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper"
import { mapGetters } from "vuex"
export default {
  name: "ImageList",
  data() {
    return {
      // 当前选中图片
      curImg: ''
    }
  },
  computed: {
    ...mapGetters({ skuInfo: 'detail/skuInfo' })
  },
  methods: {
    currentImg(curImg, allImg) {
      allImg.forEach(eachImg => eachImg.isDefault = 0)
      curImg.isDefault = 1
      // 将选中图片联系放大框展示
      this.$bus.$emit('sendCurImg',curImg.imgUrl)
    }
  },
  watch: {
    // 监视数据变化，nextTick更新轮播图
    skuInfo: {
      handler() {
        this.$nextTick(() => {
          new Swiper(this.$refs.mySwiper, {
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            // 一次展示多少张图片
            slidesPerView: 2,
            //  多少张一组进行切换
            slidesPerGroup: 2,
          });
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &:hover {
        cursor: pointer;
      }

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }
    }



  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;

    &::after {
      font-size: 12px;
    }
  }
}
</style>