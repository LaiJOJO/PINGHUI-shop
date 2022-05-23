<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="eachShopCart in cartList" :key="eachShopCart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="eachShopCart.isChecked"
              @click="changeCheck(eachShopCart.skuId, $event)">
          </li>
          <li class="cart-list-con2">
            <img :src="eachShopCart.imgUrl">
            <div class="item-msg">{{ eachShopCart.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ eachShopCart.skuPrice }}</span>
          </li>
          <!-- 数量按钮 -->
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins"
              @click="handler('mins', eachShopCart.skuNum, eachShopCart.skuId, $event)">-</a>

            <input autocomplete="off" type="text" :value="eachShopCart.skuNum" minnum="1" class="itxt"
              @change="handler('itxt', eachShopCart.skuNum, eachShopCart.skuId, $event)">

            <a href="javascript:void(0)" class="plus"
              @click="handler('plus', $event.target.value, eachShopCart.skuId, $event)">+</a>
          </li>
          <!-- 数量按钮 -->
          <li class="cart-list-con6">
            <span class="sum">{{ eachShopCart.skuNum * eachShopCart.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#shopcart" class="sindelet" @click="delShopCart(eachShopCart.skuId)">删除</a>
            <br>
            <a href="javascript:;">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="allChecked" @click="allIsChecked">
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="delAllShopCart">删除选中的商品</a>
        <a href="javascript:;">移到我的关注</a>
        <a href="javascript:;">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{sumCount}}</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） : </em>
          <i class="summoney">{{sumPrice}}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { throttle } from 'lodash'
export default {
  name: 'ShopCart',
  created() {
    this.getCartList()
  },
  data() {
    return {
      timer: {},
      alltimer: null
    }
  },
  methods: {
    // 发布初始化购物车仓库订阅事情
    getCartList() {
      this.$store.dispatch('shopCart/addShopCart')
    },
    // 按钮触发函数,配合节流使用
    handler: throttle(async function (btn, oldSkuNum, skuId, event) {
      try {
        switch (btn) {
          case 'mins':
            // 减法注意数量
            if (oldSkuNum < 2) return
            await this.$store.dispatch('shopCart/updateShopCart', { 'skuId': skuId, 'skuNum': -1 })
            this.getCartList()
            break

          case 'plus':
            await this.$store.dispatch('shopCart/updateShopCart', { 'skuId': skuId, 'skuNum': 1 })
            this.getCartList()
            break

          case 'itxt':
            (async () => {
              // 正则判断文本框
              let goodNum = /^[1-9][1-9]?$/
              let isNum = String(event.target.value).match(goodNum)
              if (!isNum) {
                // 不符合直接刷新就行
                this.goodAmount = oldSkuNum
                alert('请输入1~99的整数数')
              } else {
                await this.$store.dispatch('shopCart/updateShopCart', { 'skuId': skuId, 'skuNum': (event.target.value - oldSkuNum) })
              }
              this.getCartList()
            })()
            break

          default: alert('请重新输入！')
        }
      } catch (error) {
        alert('操作失败！请重新操作！')
      }
    }, 1500),
    // 删除商品按钮
    async delShopCart(skuId) {
      try {
        await this.$store.dispatch('shopCart/delShopCart', skuId);
        // 有id对应节流计时就进行删除
        if (this.timer[String(skuId)] == null) { delete this.timer[String(skuId)] }
        this.getCartList()
      } catch (error) {
        alert('操作失败！')
      }

    },
    // 批量删除选中的商品
    async delAllShopCart() {
      try {
        await this.$store.dispatch('shopCart/delAllShopCart')
        this.getCartList()
      } catch (error) {
        alert(error)
      }
    },
    // 切换商品选中状态按钮
    changeCheck(skuId, event) {
      let _this = this
      // 节流
      if (this.timer[String(skuId)]) { return }
      // 页面刷新和节流进行时禁用按钮
      event.target.disabled = true
      this.timer[String(skuId)] = window.setTimeout(async function () {
        let isChecked = event.target.checked === true ? 1 : 0
        try {
          await _this.$store.dispatch('shopCart/changeChecked', { skuId, isChecked })
          // 再刷新页面前禁用按钮
          await _this.$store.dispatch('shopCart/addShopCart')
          event.target.disabled = false
        } catch (error) {
          _this.getCartList()
          event.target.disabled = false
          alert('修改失败!')
        }
        _this.timer[String(skuId)] = null
      }, 500)


    },
    // 全选按钮
    async allIsChecked(e) {
      let _this = this
      if (this.alltimer) return
      e.target.disabled = true
      window.setTimeout(async () => {
        let isChecked = e.target.checked
        try {
          await _this.$store.dispatch('shopCart/allIsChecked', isChecked)
          await _this.getCartList()
          e.target.disabled = false
        } catch (error) {
          await _this.getCartList()
          e.target.disabled = false
          alert(error)
        }
      }, 1000)
    }
  },
  computed: {
    ...mapGetters({ cartList: 'shopCart/cartList' ,sumPrice:'shopCart/sumPrice',sumCount:'shopCart/sumCount'}),
    // 遍历数组，判断全选
    allChecked() {
      return this.cartList.every(item => { return item.isChecked })
    },
  },
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      &>div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;

      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        &>li {
          float: left;
        }

        .cart-list-con1 {
          width: 18%;
        }

        .cart-list-con2 {
          width: 32%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;

        }

        .cart-list-con5 {
          width: 15%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 13%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>