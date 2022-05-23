<template>
  <div class="paysuccess">
    <div class="success">
      <h3>
        <img src="./images/right.png" width="48" height="48">
        恭喜您，支付成功啦！
      </h3>
      <div class="paydetail">
        <p class="button">
          <a class="btn-look" href="#/center" @click="stopTimer">查看订单</a>
          <a class="btn-goshop" href="#/" @click="stopTimer">继续购物</a>
        </p>
      </div>
      <p class="time">即将在{{ time }}秒后返回主页......</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaySuccess',
  data() {
    return {
      time: 8,
      timer: null
    }
  },
  mounted() {
    this.setTimer()
  },
  methods: {
    setTimer() {
      this.timer = window.setInterval(() => {
        this.time--
        if (this.time <= 0) {
          clearInterval(this.timer)
          this.timer = null
          this.$router.push('/')
        }
      }, 1000)
    },
    stopTimer() {
      clearInterval(this.timer)
      this.timer = null
    }
  },
  watch:{
    
  }
}
</script>

<style lang="less" scoped>
.paysuccess {
  position: relative;
  margin: 20px auto;
  padding: 25px;
  border: 1px solid rgb(211, 211, 211);
  width: 1200px;
  width: 1148px;

  .success {
    width: 500px;
    margin: 0 auto;

    h3 {
      margin: 20px 0;
      font-weight: 700;
      font-size: 20px;
      line-height: 30px;

      img {
        max-width: 100%;
        vertical-align: middle;
        border: 0;
        margin-right: 14px;
      }
    }

    .paydetail {
      margin-left: 66px;
      font-size: 15px;

      .button {
        margin: 30px 0;
        line-height: 26px;

        a {
          display: inline-block;
          box-sizing: border-box;
          text-align: center;
          vertical-align: middle;
          cursor: pointer;
          border-radius: 2px;
          user-select: none;
          font-size: 18px;
          padding: 4px 20px;
          line-height: 22px;
          text-decoration: none;

          &.btn-look {
            margin-right: 13px;
            color: #fff;
            background-color: #e1251b;
            border: 1px solid #e1251b;
          }

          &.btn-goshop {
            color: #666;
            background-color: #eee;
            border: 1px solid #e1e1e1;
          }
        }
      }
    }
  }

  .time {
    font-size: 16px;
    position: absolute;
    right: 50px;
    bottom: 20px;
  }
}
</style>