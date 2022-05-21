<template>
  <div class="spec-preview" ref="spec" @mousemove="getMouse">
    <!-- 传入选中图片就展示选中图片，否则展示默认图片 -->
    <img :src="curImg || skuInfo.skuDefaultImg" />
    <div class="event"></div>
    <div class="big" ref="bigMask">
      <img ref="big" :src="curImg || skuInfo.skuDefaultImg" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "MyZoom",
  data() {
    return {
      //有选中图片就展示，没有就展示默认图片
      curImg: ''
    }
  },
  computed: {
    ...mapGetters({ skuInfo: 'detail/skuInfo' })
  },
  mounted() {
    this.$bus.$on('sendCurImg',(imgUrl)=>{this.curImg=imgUrl})
  },
  methods: {
    // 放大框函数
    getMouse(e) {
      let { spec, mask, big, bigMask } = this.$refs
      
      // x轴方向上移动
      let leftBiggest = spec.offsetWidth - mask.offsetWidth
      let left = e.offsetX - mask.offsetWidth / 2
      mask.style.left = left + 'px'
      if (left < 0) {
        mask.style.left = 0
      }
      if (left > leftBiggest) {
        mask.style.left = leftBiggest + 'px'
      }

      // y轴方向上移动
      let topBiggest = spec.offsetHeight - mask.offsetHeight
      let top = e.offsetY - mask.offsetHeight / 2
      mask.style.top = top + 'px'
      if (top < 0) {
        mask.style.top = 0
      }
      if (top > topBiggest) {
        mask.style.top = topBiggest + 'px'
      }
      
      // 右侧放大框
      let biggestX = big.offsetWidth - bigMask.offsetWidth
      let bigX = left / leftBiggest *  biggestX
      big.style.left = `-${bigX}px`
      if(bigX>=biggestX){
        big.style.left = `-${biggestX}px`
      }
      // y轴同理
      let biggestY = big.offsetHeight - bigMask.offsetHeight
      let bigY = top / topBiggest *  biggestY
      big.style.top = `-${bigY}px`
      if(bigY>=biggestY){
        big.style.top = `-${biggestY}px`
      }
    },
    mounted() {
      this.$bus.$on('sendCurImg', (imgUrl) => { this.curImg = imgUrl })
    },
  }
}
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover~.mask,
  .event:hover~.big {
    display: block;
  }
}
</style>