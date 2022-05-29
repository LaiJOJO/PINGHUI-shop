import VeeValidate from 'vee-validate';
import veeMessage from 'vee-validate/dist/locale/zh_CN';
import Vue from 'vue'

Vue.use(VeeValidate)

VeeValidate.Validator.localize('zh_CN', {
  messages: {
    // 注册中文
    ...veeMessage.messages,
    // 制定is校验规则的特用提示语
    is: (field) => {
      return `${field}需要与密码相同`
    },
  },
  // 替换规则的默认名，用来插入默认提示语中
  attributes: {
    phone: '手机号',
    code: '验证码',
    password: '密码',
    password1: "确认密码",
    isCheck: '协议'
  }
})

VeeValidate.Validator.extend('isCheck',{
  validate:(value)=>value,
  messages:{
    en:(field)=>{
      return `${field}必须同意`
    }
  }
})