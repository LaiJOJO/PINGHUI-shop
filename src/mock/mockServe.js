// 1. 导入mock模块
import Mock from 'mockjs'
// 2. 把json格式文件导入，json是不需要暴露就能导入的文件格式
import banner from './banner.json'
import floor from './floor.json'
import detail from './detail.json'

// 3. 调用mock函数: 第一个参数--请求地址 ； 第二个参数--请求数据
Mock.mock("/mock/banner",{code:200,data:banner})
Mock.mock("/mock/floor",{code:200,data:floor})
Mock.mock("/mock/detail",{code:200,data:detail})