"use strict";(self["webpackChunkvue_demo_pinhui_shop"]=self["webpackChunkvue_demo_pinhui_shop"]||[]).push([[404],{21404:function(t,e,s){s.r(e),s.d(e,{default:function(){return A}});var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"paysuccess"},[s("div",{staticClass:"success"},[t._m(0),s("div",{staticClass:"paydetail"},[s("p",{staticClass:"button"},[s("a",{staticClass:"btn-look",attrs:{href:"#/center"},on:{click:t.stopTimer}},[t._v("查看订单")]),s("a",{staticClass:"btn-goshop",attrs:{href:"#/"},on:{click:t.stopTimer}},[t._v("继续购物")])])]),s("p",{staticClass:"time"},[t._v("即将在"+t._s(t.time)+"秒后返回主页......")])])])},n=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("h3",[i("img",{attrs:{src:s(4591),width:"48",height:"48"}}),t._v(" 恭喜您，支付成功啦！ ")])}],r={name:"PaySuccess",data:function(){return{time:8,timer:null}},mounted:function(){this.setTimer()},methods:{setTimer:function(){var t=this;this.timer=window.setInterval((function(){t.time--,t.time<=0&&(clearInterval(t.timer),t.timer=null,t.$router.push("/"))}),1e3)},stopTimer:function(){clearInterval(this.timer),this.timer=null}},watch:{}},c=r,a=s(1001),o=(0,a.Z)(c,i,n,!1,null,"7566dcb5",null),A=o.exports},4591:function(t){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAChElEQVRYR82X0XHTQBCG/1UyfkVUgKmAUAHKA4YZJpZTAVABcgVJKpDoIFRgKwwPUR5wKsCugNCB/YgT62fubNmK0UlnWcygV5203/17+++eYIcn+NrpgeIDaIN0ReRIfU5yDJEpgDsBhmH3Orb9rVQtDAZv2zjgGcieiLhV61dAU4gMsfjdj05HCsz4lAIEceccwCfbwNtRSE7hIIpOkgsTQSFAMPBcOK3vmcQ2uy5bo1OUzo+L1PgLIPj2+ggPooJbyW0Lp9U45HH07mac/+YRwGrnP5sOngXUEOn8eV6JNUDTspuUUemI/ORl9n4DEHfOReTMVtJ91pG8iPxEHXBoAF1qTvrjX0lfWB2rVGiAfty5hMj7fXZl+PYXgGeF78gvoZ98yACUcTxpEoBIP2JxP5SD1giQF0UqRH7yVJS9CmXQdPCoe3O5TK/nGiGEp9K0/GrnWfAMwGhqxGfpX3WURK+aUGCn4DogbxXAuChHOaAYpFd1RnYPvuyi0r96Q+PuVydV2bM8yMgEUSf42ohKAOKwe93LFpog9gmujciUgqLmsQ2xb3CAk9JDWAZBYWB92s05vq0sw0KIgefmO1rtRqbK0MaITL28ss4rapvKiFa9oNKKTUrUnpzIWegn7k7NKA9RW/bNdLJpRtqvndZdldlo79KDpnOKNA1rz4zkjOm8rc7R/zGQZKpY2HIDLYOTsJvoC816Ilq73Q6pqEWSk74QQJdVhe/XCrw8PDMe0isdyx8pYZhk6gFwwsXcs7qY5AOoq5kAgU11FIKpXQNRNgEXrbG4nOoSjQD0rEHIGYAh03mw1+V0m1jbdqpA0AbgbgYZTgBMQRnT4Sg6SYa2qfoDRvKfJ6AW6qoAAAAASUVORK5CYII="}}]);