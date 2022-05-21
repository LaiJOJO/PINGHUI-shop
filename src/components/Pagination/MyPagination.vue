<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="sendPageNo(pageNo - 1)">上一页</button>
    <!-- 用start页面进行判断，用当前pageNo无法判断容量 -->
    <button v-if="page.start > 1" @click="sendPageNo(1)" :class="pageNo == 1 ? 'active' : ''">1</button>
    <button v-if="page.start > 2">···</button>

    <!-- 根据首尾页数创建连续页码 -->
    <button v-for="eachPage in page.pageArr" :key="eachPage" @click="sendPageNo(eachPage)"
      :class="pageNo == eachPage ? 'active' : ''">{{ eachPage }}</button>

    <!-- 用容量和尾页的差距判断是否需要显示尾页 -->
    <button v-if="pageCount - page.end > 1">···</button>
    <button v-if="pageCount > page.end" @click="sendPageNo(pageCount)"
      :class="pageNo == pageCount ? 'active' : ''">{{ pageCount }}</button>
    <button :disabled="pageNo == pageCount" @click="sendPageNo(pageNo + 1)">下一页</button>
    <button style="margin-left: 30px">共 {{ pageCount }} 页</button>
    <button style="margin-left: 30px">共 {{ total }} 条</button>
    <!-- <h1>首页{{ page.start }}--当前页面{{ pageNo }}--尾页{{ page.end }}</h1> -->
  </div>
</template>

<script>
import { throttle } from 'lodash'
export default {
  name: "MyPagination",
  props: ['pageNo', 'pageSize', 'total', 'continue'],
  computed: {
    // 计算总页数属性
    pageCount() {
      return Math.ceil(this.total / this.pageSize)
    },
    // 计算首尾页数属性
    page() {
      let start = 0
      let end = 0
      // 1. 总页数<连续页数的情况
      if (this.pageCount < this.continue) {
        start = 1
        end = this.pageCount
      } else {
        // 正常执行 首尾页 = 当前页数 +- 连续页数地板除/2
        start = this.pageNo - parseInt(this.continue / 2)
        end = this.pageNo + parseInt(this.continue / 2)
        // 2. 首尾段页数不够的情况
        if (start < 1) {
          // 首页小于0,直接展示前5页连续
          start = 1
          end = this.continue
        }
        if (end > this.pageCount) {
          // 尾页大于总数，直接展示最后5页
          end = this.pageCount
          start = end - this.continue + 1 //最后一页自己也算一页
        }
      }
      let pageArr = []
      for (let i = start; i <= end; i++) {
        pageArr.push(i)
      }
      return { start, end, pageArr }
    },
  },
  methods: {
    // 发送当前页面函数
    sendPageNo: throttle(function (pageNo) {
      this.$emit('getPageNO', pageNo)
    }, 1500),
    // 修改当前页码>返回的页码的bug函数,发起事件重新渲染
    reGetData() {
      if (this.pageNo > this.$store.state.search.SearchList.totalPages) {
        this.$emit('getPageNO', this.$store.state.search.SearchList.totalPages)
      }
    }
  },
  beforeUpdate() {
    this.reGetData()
  }
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;

  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}

.active {
  background-color: skyblue;
}
</style>
