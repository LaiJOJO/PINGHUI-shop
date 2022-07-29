"use strict";(self["webpackChunkvue_demo_pinhui_shop"]=self["webpackChunkvue_demo_pinhui_shop"]||[]).push([[656],{67656:function(e,r,s){s.r(r),s.d(r,{default:function(){return p}});var t=function(){var e=this,r=e.$createElement,s=e._self._c||r;return s("div",{staticClass:"register-container"},[s("div",{staticClass:"register"},[s("h3",[e._v("注册新用户 "),s("span",{staticClass:"go"},[e._v("我有账号，去 "),s("router-link",{attrs:{to:"/login"}},[e._v("登陆")])],1)]),s("form",{attrs:{action:""}},[s("div",{staticClass:"content"},[s("label",[e._v("手机号:")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.phone,expression:"phone"},{name:"validate",rawName:"v-validate",value:{required:!0,regex:/^1\d{10}$/},expression:"{ required: true, regex: /^1\\d{10}$/ }"}],class:{invalid:e.errors.has("phone")},attrs:{type:"text",name:"phone",placeholder:"请输入你的手机号"},domProps:{value:e.phone},on:{input:function(r){r.target.composing||(e.phone=r.target.value)}}}),s("span",{staticClass:"error-msg"},[e._v(e._s(e.errors.first("phone")))])]),s("div",{staticClass:"content"},[s("label",[e._v("验证码:")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.code,expression:"code"},{name:"validate",rawName:"v-validate",value:{required:!0,regex:/^\d{6}$/},expression:"{ required: true, regex: /^\\d{6}$/ }"}],class:{invalid:e.errors.has("code")},attrs:{type:"text",name:"code",placeholder:"请输入你的验证码"},domProps:{value:e.code},on:{input:function(r){r.target.composing||(e.code=r.target.value)}}}),s("button",{staticClass:"btn",staticStyle:{cursor:"pointer"},on:{click:function(r){return r.preventDefault(),e.getPassPort.apply(null,arguments)}}},[e._v("获取验证码")]),s("span",{staticClass:"error-msg"},[e._v(e._s(e.errors.first("code")))])]),s("div",{staticClass:"content"},[s("label",[e._v("登录密码:")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"},{name:"validate",rawName:"v-validate",value:{required:!0,regex:/[0-9a-zA-Z]{6,}/},expression:"{ required: true, regex: /[0-9a-zA-Z]{6,}/ }"}],class:{invalid:e.errors.has("password")},attrs:{type:"text",name:"password",placeholder:"请输入密码"},domProps:{value:e.password},on:{input:function(r){r.target.composing||(e.password=r.target.value)}}}),s("span",{staticClass:"error-msg"},[e._v(e._s(e.errors.first("password")))])]),s("div",{staticClass:"content"},[s("label",[e._v("确认密码:")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.password1,expression:"password1"},{name:"validate",rawName:"v-validate",value:{required:!0,is:e.password},expression:"{ required: true,is:password }"}],class:{invalid:e.errors.has("password1")},attrs:{type:"text",name:"password1",placeholder:"请确认密码"},domProps:{value:e.password1},on:{input:function(r){r.target.composing||(e.password1=r.target.value)}}}),s("span",{staticClass:"error-msg"},[e._v(e._s(e.errors.first("password1")))])])]),s("div",{staticClass:"controls"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.isChecked,expression:"isChecked"},{name:"validate",rawName:"v-validate",value:{required:!0,isCheck:!0},expression:"{ required: true,isCheck:true} "}],class:{invalid:e.errors.has("isCheck")},attrs:{name:"isCheck",type:"checkbox"},domProps:{checked:Array.isArray(e.isChecked)?e._i(e.isChecked,null)>-1:e.isChecked},on:{change:function(r){var s=e.isChecked,t=r.target,a=!!t.checked;if(Array.isArray(s)){var i=null,n=e._i(s,i);t.checked?n<0&&(e.isChecked=s.concat([i])):n>-1&&(e.isChecked=s.slice(0,n).concat(s.slice(n+1)))}else e.isChecked=a}}}),s("span",[e._v("同意协议并注册《尚品汇用户协议》")]),s("span",{staticClass:"error-msg"},[e._v(e._s(e.errors.first("isCheck")))])]),s("div",{staticClass:"btn"},[s("button",{staticStyle:{cursor:"pointer"},on:{click:e.register}},[e._v("完成注册")])])]),e._m(0)])},a=[function(){var e=this,r=e.$createElement,s=e._self._c||r;return s("div",{staticClass:"copyright"},[s("ul",[s("li",[e._v("关于我们")]),s("li",[e._v("联系我们")]),s("li",[e._v("联系客服")]),s("li",[e._v("商家入驻")]),s("li",[e._v("营销中心")]),s("li",[e._v("手机尚品汇")]),s("li",[e._v("销售联盟")]),s("li",[e._v("尚品汇社区")])]),s("div",{staticClass:"address"},[e._v("地址：北京市昌平区宏福科技园综合楼6层")]),s("div",{staticClass:"beian"},[e._v("京ICP备19006430号 ")])])}],i=s(4367),n=s(16198),o=(s(41539),s(39714),s(74916),s(15306),s(78975),s(34665)),c={name:"MyRegister",data:function(){return{phone:"",password:"",isChecked:!0,code:"",password1:""}},methods:{getPassPort:function(){var e=this;return(0,n.Z)(regeneratorRuntime.mark((function r(){var s;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,e.$store.dispatch("user/getPassPort",e.phone);case 3:s=r.sent,e.code=s,r.next=10;break;case 7:r.prev=7,r.t0=r["catch"](0),alert(r.t0);case 10:case"end":return r.stop()}}),r,null,[[0,7]])})))()},register:function(e){var r=this;return(0,n.Z)(regeneratorRuntime.mark((function s(){var t,a;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return s.next=2,r.$validator.validateAll();case 2:if(t=s.sent,t){s.next=5;break}return s.abrupt("return");case 5:if(s.prev=5,r.isChecked){s.next=8;break}return s.abrupt("return",alert("请勾选同意协议!"));case 8:return e.target.disabled=!0,s.next=11,r.$store.dispatch("user/register",{phone:r.phone.toString(),password:r.password.toString(),code:r.passport});case 11:a=s.sent,alert(a),e.target.disabled=!1,r.$router.replace("/login"),s.next=21;break;case 17:s.prev=17,s.t0=s["catch"](5),alert(s.t0),e.target.disabled=!1;case 21:case"end":return s.stop()}}),s,null,[[5,17]])})))()}},computed:(0,i.Z)({},(0,o.rn)("user",["passport"]))},l=c,d=s(1001),u=(0,d.Z)(l,t,a,!1,null,"3c71ef57",null),p=u.exports}}]);