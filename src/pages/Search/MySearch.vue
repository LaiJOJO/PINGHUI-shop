<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 导航栏面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">{{ searchParams.categoryName }}<i
                @click="removeCategoryName">×</i></li>
            <!-- 搜索框面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">{{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌名面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">{{ searchParams.trademark.split(':')[1] }}<i
                @click="removeTrademark">×</i></li>
            <!-- 商品属性面包屑 -->
            <li class="with-x" v-for="item in searchParams.props" :key="item">{{ item.split(':')[1] }}<i
                @click="removeAttr(item)">×</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @sentTrademarkName="getTrademark" @sendAttr="getAttr"></SearchSelector>

        <!--details-->
        <div class="details clearfix">
          <!-- 排序标签 -->
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="isOne ? 'active' : ''" @click="sortEvent('1')">
                  <a href="javascript:;">综合<span v-if="isOne" class="iconfont"
                      :class="isDesc ? 'icon-down' : 'icon-up'"></span></a>
                </li>
                <li :class="isTwo ? 'active' : ''" @click="sortEvent('2')">
                  <a href="javascript:;">价格<span v-if="isTwo" class="iconfont"
                      :class="isDesc ? 'icon-down' : 'icon-up'"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 商品图片，点击跳转detail页面 -->
                    <router-link :to="'/detail/' + good.id">
                      <img v-lazy="good.defaultImg" style="width:100%;" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i style="margin-left:2px;">{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="good.title">{{ good.title }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>{{ good.hotScore }}</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <MyPagination :pageNo="searchList.pageNo" :pageSize="searchList.pageSize" :total="searchList.total"
            :continue="5" @getPageNO="getPageNo"></MyPagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import SearchSelector from './SearchSelector/SearchSelector'
export default {
  data() {
    return {
      searchParams: {
        // 分级联动
        "category1Id": "",
        "category2Id": "",
        "category3Id": "",
        // 商品名称
        "categoryName": "",
        // 关键字
        "keyword": "",
        // 排序:1综合，2价格,asc升序，desc降序
        "order": "1:desc",
        // 请求的页数，默认是1
        "pageNo": 1,
        // 请求的数据数
        "pageSize": 10,
        // 平台寿命属性操作带的参数
        "props": [],
        // 品牌
        "trademark": ""
      }

    }
  },
  name: 'MySearch',
  components: {
    SearchSelector
  },
  // 组件发送请求前，将发送的数据处理好
  beforeMount() {
    Object.assign(this.searchParams, this.$route.query, this.$route.params)
  },
  mounted() {
    this.getData()
  },
  computed: {
    ...mapState({ searchList: state => state.search.SearchList }),
    ...mapGetters({ goodsList: 'search/goodsList', attrsList: 'search/attrsList', trademarkList: 'search/trademarkList' }),
    // 判断当前排序是综合1还是价格2，是升序asc还是降序desc
    isOne() {
      return this.searchParams.order.split(':')[0] == 1
    },
    isTwo() {
      return this.searchParams.order.split(':')[0] == 2
    },
    isDesc() {
      return this.searchParams.order.split(':')[1] == 'desc'
    },
  },
  methods: {
    // 封装发送vuex事件函数
    getData() {
      this.$store.dispatch('search/getSearchList', this.searchParams)
    },
    // 面包屑关键词删除函数
    removeCategoryName() {
      // 取值undefined可以不发送该参数进行请求，节约宽带
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      this.searchParams.categoryName = undefined
      this.getData()
      // 删除后跳转到没有query参数的页面，但是有参数要带上参数
      this.$router.push({ name: 'search', params: this.$route.params })

    },
    // 面包屑keyword函数
    removeKeyword() {
      // 清除关键字
      this.searchParams.keyword = undefined
      this.getData()
      // 同时清空文本框，发bus给TypeNav组件
      this.$bus.$emit('clear')
      // 重新跳转
      this.$router.push({ name: 'search', query: this.$route.query })
    },
    // 面包屑品牌名tradename函数
    getTrademark(trademarkName) {
      // 将参数转化对应格式发起请求渲染
      let trademark = `${trademarkName.tmId}:${trademarkName.tmName}`
      this.searchParams.trademark = trademark
      this.getData()
    },
    // 面包屑品牌名删除函数
    removeTrademark() {
      // 清空品牌名
      this.searchParams.trademark = undefined
      // 重新发送请求渲染页面
      this.getData()
      // 由于路径没变，不需要跳转
    },
    // 接收attr传递属性事件函数
    getAttr(attr, attrValue) {
      // 按格式把属性值放入searchParams的props属性进行请求
      // 需要先进性一次去重操作，再决定是否请求
      let propsAttr = `${attr.attrId}:${attrValue}:${attr.attrName}`
      if (this.searchParams.props.indexOf(propsAttr) !== -1) return
      this.searchParams.props.push(propsAttr)
      this.getData()
    },
    // attr属性删除面包屑函数
    removeAttr(attr) {
      this.searchParams.props = this.searchParams.props.filter(item => item !== attr)
      this.getData()
    },
    // 判断升序还是降序的函数
    sortEvent(state) {
      // 当前的标签
      let originState = this.searchParams.order.split(':')[0]
      // 当前的箭头方向
      let originSort = this.searchParams.order.split(':')[1]
      let newOrder = ''
      // state表示当前点击的标签1综合，2价格,默认1:desc降序
      // 如果点击状态与当前标签相同，则换箭头方向
      if (state == originState) {
        // 利用拼接字符串将新值传给searchParams进行请求
        newOrder = `${originState}:${originSort == 'desc' ? 'asc' : 'desc'}`
        this.searchParams.order = newOrder
      } else {
        // 点击的不是重复标签，则切换标签值，初始箭头状态不变
        newOrder = `${state}:${originSort}`
        this.searchParams.order = newOrder
      }
      this.getData()
    },
    // 获取页面组件的点击事件函数
    getPageNo(pageNo) {
      this.searchParams.pageNo = pageNo
      this.getData()
    }
  },
  watch: {
    // 监听每一次path的路径变化fullpath，由于每次点击都会变化，不需要深度监听
    $route: {
      handler() {
        // 拼接修改当前data中要post的数据
        Object.assign(this.searchParams, this.$route.query, this.$route.params)
        this.getData()
        // 发送请求后要清空级别id，其他会自动覆盖，但id有三种情况会叠加
        this.searchParams.category1Id = undefined
        this.searchParams.category2Id = undefined
        this.searchParams.category3Id = undefined
      },
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }


    }
  }
}
</style>