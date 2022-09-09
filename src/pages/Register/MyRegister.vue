<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去 <router-link to="/login">登陆</router-link>
        </span>
      </h3>
      <form action="">
        <div class="content">
          <label>手机号:</label>
          <!-- name和规则的attribute属性对应，则接收到的错误信息的field值会替换成attributes的属性值 -->
          <!-- v-validate能指定内部的校验规则 -->
          <input type="text" name="phone" placeholder="请输入你的手机号" v-model="phone"
            v-validate="{ required: true, regex: /^1\d{10}$/ }" :class="{ invalid: errors.has('phone') }">
          <!-- errors.first展示当前name的首条错误校验值 -->
          <span class="error-msg">{{ errors.first('phone') }}</span>
        </div>
        <div class="content">
          <label>验证码:</label>
          <input type="text" name="code" placeholder="请输入你的验证码" v-model="code"
            v-validate="{ required: true, regex: /^\d{6}$/ }" :class="{ invalid: errors.has('code') }">
          <button class="btn" style="cursor:pointer;" ref="btnPassPort" @click.prevent="getPassPort">获取验证码</button>
          <span class="error-msg">{{ errors.first('code') }}</span>
        </div>
        <div class="content">
          <label>登录密码:</label>
          <input type="text" name="password" placeholder="请输入密码" v-model="password"
            v-validate="{ required: true, regex: /[0-9a-zA-Z]{6,}/ }" :class="{ invalid: errors.has('password') }">
          <span class="error-msg">{{errors.first('password')}}</span>
        </div>
        <div class="content">
          <label>确认密码:</label>
          <input type="text" name="password1" placeholder="请确认密码" v-model="password1"
            v-validate="{ required: true,is:password }" :class="{ invalid: errors.has('password1') }">
          <span class="error-msg">{{errors.first('password1')}}</span>
        </div>
      </form>
      <div class="controls">
        <input name="isCheck" type="checkbox" v-model="isChecked" v-validate="{ required: true,isCheck:true} "
          :class="{ invalid: errors.has('isCheck') }">
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">{{errors.first('isCheck')}}</span>
      </div>
      <div class="btn">
        <button @click="register" style="cursor:pointer;">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号
      </div>
    </div>
  </div>
</template>

<script>
import throttle from 'lodash/throttle.js'
import { mapState } from 'vuex'
export default {
  name: 'MyRegister',
  data() {
    return {
      phone: '',
      password: '',
      isChecked: true,
      code: '',
      password1: '',
    }
  },
  methods: {
    // 获取验证码
    getPassPort: throttle(async function () {
      try {
        let reg = new RegExp(/^1[3456789]\d{9}$/)
        if (!reg.test(this.phone)) {
          this.$message({
            message: '请输入正确的手机格式',
            type: 'warning'
          });
          return
        }
        this.$refs.btnPassPort.disabled = true
        let passport = await this.$store.dispatch('user/getPassPort', this.phone)
        this.code = passport
        this.$message({
          message: '验证码发送获取成功，已自动填入',
          type: 'success'
        });
      } catch (error) {
        this.$message(String(error))
        this.$refs.btnPassPort.disabled = false
      }
    }, 3000),
    // 完成注册
    register: throttle(async function (e) {
      const success = await this.$validator.validateAll()
      if (!success) return
      try {
        if (!this.isChecked) {
          return this.$message('请勾选同意协议!')
        }
        e.target.disabled = true
        const res = await this.$store.dispatch('user/register', { phone: this.phone.toString(), password: this.password.toString(), code: this.passport })
        this.$message({
          message: String(res),
          type: 'success'
        });
        e.target.disabled = false
        this.$router.replace('/login')
      } catch (error) {
        this.$message(String(error))
        e.target.disabled = false
      }
    }, 3000),
  },
  computed: {
    ...mapState('user', ['passport']),
  }
}
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      .btn {
        height: 38px;
        margin-left: 5px;
        padding-left: 15px;
        padding-right: 15px;
        border-radius: 5px;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>