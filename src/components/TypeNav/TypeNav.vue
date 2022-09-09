<template>
    <div>
        <!-- 商品分类导航 -->
        <div class="type-nav">
            <div class="container">
                <!-- 事件委派，只有离开大盒子才恢复默认颜色 -->
                <div @mouseleave="leaveBgc" @mouseenter="isShow = true">
                    <!-- 进入标题就对侧边栏进行展示 -->
                    <h2 class="all">全部商品分类</h2>
                    <transition name='typeNav' :appear="true">
                        <div class="sort" v-show="isShow">
                            <!-- 事件委派 -->
                            <div class="all-sort-list2" @click.prevent="categorySearch">
                                <div class="item" style="margin-bottom:-3px;" v-for="(c1, index) in categoryList"
                                    :key="c1.categoryId">
                                    <!-- 一级分类 -->
                                    <h3 @mouseenter="changeBgc(index)" :class="currentIndex === index ? 'changebgc' : ''">
                                        <!-- 设置自定义属性筛选a标签并进行分级 -->
                                        <a href="" :data-categoryName="c1.categoryName"
                                            :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                                    </h3>
                                    <!-- 侧边栏 -->
                                    <div class="item-list clearfix"
                                        :style="{ display: currentIndex === index ? 'block' : 'none' }">
                                        <div class="subitem">
                                            <dl class="fore" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                                                <!-- 二三级分类 -->
                                                <dt>
                                                    <a href="" :data-categoryName="c2.categoryName"
                                                        :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
                                                </dt>
                                                <dd>
                                                    <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                                                        <a href="" :data-categoryName="c3.categoryName"
                                                            :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                                                    </em>
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>
                <nav class="nav">
                    <a href="###">服装城</a>
                    <a href="###">美妆馆</a>
                    <a href="###">PINGHUI超市</a>
                    <a href="###">全球购</a>
                    <a href="###">闪购</a>
                    <a href="###">团购</a>
                    <a href="###">有趣</a>
                    <a href="###">秒杀</a>
                </nav>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import throttle from 'lodash/throttle.js'
export default {
    name: 'TypeNav',
    data() {
        return {
            currentIndex: -1,
            isShow: true
        }
    },
    mounted() {
        // 在组件开始渲染的阶段判断路径是否为home路径，否则隐藏侧边栏
        if (this.$route.path !== '/home') {
            this.isShow = false
        }
    },
    computed: {
        // 映射三级导航数据,采用函数形式，接受一个参数，为$store的state
        ...mapState({
            categoryList: (state) => {
                return (state.home.CategoryList)
            }
        })
    },
    methods: {
        // 配合节流使用选中事件,事件用函数进行配置
        // 参数写在lodash.throttle的函数参数
        changeBgc: throttle(function (index) {
            this.currentIndex = index
        }, 50),
        // 鼠标移除侧边栏函数
        leaveBgc() {
            // 恢复背景颜色
            this.currentIndex = -1
            // 通过判断路径，再决定移开鼠标是否隐藏导航栏
            if (this.$route.path !== '/home') {
                this.isShow = false
            }
        },
        // 筛选a标签和分级导航栏函数
        categorySearch(e) {
            // 通过事件配合原生dataset获取自定义的属性筛选是否为a标签，注意自定义属性名会变成全小写
            let elementTarget = e.target.dataset
            let { categoryname, category1id, category2id, category3id } = elementTarget
            if (categoryname) {
                // 设置跳转需要的路由名称和query参数
                let location = { name: 'search' }
                let query = { categoryName: categoryname }
                // 筛选标签后进行元素的分类,按自定义属性的1,2,3级id进行匹配
                if (category1id) {
                    query.category1Id = category1id
                } else if (category2id) {
                    query.category2Id = category2id
                } else if (category3id) {
                    query.category3Id = category3id
                }
                // 跳转时要拼接完整的路由
                location.query = query
                if(this.$route.params){
                    location.params = this.$route.params
                }
                this.$router.push(location)
            }
        },
    },
}
</script>

<style lang="less" scoped>
@keyframes inAnimation {
    from {
        height: 0px;
    }

    to {
        height: 416px;
    }
}

.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        .typeNav-enter-active {
            animation: inAnimation linear .1s;
        }
    }
}

.changebgc {
    background-color: white;
}
</style>