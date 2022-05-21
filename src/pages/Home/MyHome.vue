<template>
  <div>
    <!-- 导航栏组件 -->
    <TypeNav></TypeNav>
    <!-- 列表内容 -->
    <list-container></list-container>
    <!-- 推荐列表 -->
    <today-recommend></today-recommend>
    <!-- 商品排行 -->
    <Rank></Rank>
    <!-- 喜爱商品 -->
    <Like></Like>
    <!-- 楼层商品 -->
    <Floor v-for="floor in floorList" :key="floor.id" :floorList="floor"></Floor>
    <!-- 商标 -->
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer/ListContainer.vue'
import TodayRecommend from '@/pages/Home/TodayRecommend/TodayRecommend.vue'
import Rank from '@/pages/Home/Rank/Rank.vue'
import Like from "@/pages/Home/Like/Like.vue"
import Floor from '@/pages/Home/Floor/Floor.vue'
import Brand from '@/pages/Home/Brand/Brand.vue'
import { mapState } from 'vuex'
export default {
  name: 'MyHome',
  components: {
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted() {
    // 对仓库发布事件请求获得floor数据
    this.$store.dispatch('getFloorList')
  },
  computed: {
    ...mapState({ floorList: (state) => { return state.home.FloorList } })
  }
}
</script>

<style lang="less" scoped>
</style>