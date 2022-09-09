<template>
    <div>
        <header class="header">
            <!-- 头部的第一行 -->
            <div class="top">
                <div class="container">
                    <div class="loginList">
                        <p>jojo商城欢迎您!</p>
                        <p v-if="userInfo.name">
                            <span>用户 : {{ userInfo.name }}</span>
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            <a href="javascript:;" @click="logout">退出登录</a>
                        </p>
                        <p v-else>
                            <span>请</span>
                            <router-link to="/login">登录</router-link>
                            <router-link to="/register" class="register">免费注册</router-link>
                        </p>
                    </div>
                    <div class="typeList">
                        <router-link to="/center">我的订单</router-link>
                        <router-link to="/shopcart">我的购物车</router-link>
                        <router-link to="/">我的PINGHUI</router-link>
                        <a href="javascript:;">PINGHUI会员</a>
                        <a href="javascript:;">企业采购</a>
                        <a href="javascript:;">关注PINGHUI</a>
                        <a href="javascript:;">合作招商</a>
                        <a href="javascript:;">商家后台</a>
                    </div>
                </div>
            </div>
            <!--头部第二行 搜索区域-->
            <div class="bottom">
                <h1 class="logoArea">
                    <router-link to="/" class="logo" title="点击返回首页">
                        PINGHUI
                    </router-link>
                </h1>
                <div class="searchArea">
                    <form action="###" class="searchForm">
                        <input type="text" id="autocomplete" class="input-error input-xxlarge"
                            v-model="searchContain" />
                        <button class="sui-btn btn-xlarge btn-danger" type="button" @click="toSearch">搜索</button>
                    </form>
                </div>
            </div>
        </header>
    </div>
</template>

<script>
import { removeToken } from '../../utils/token/user'
import { mapState } from 'vuex'
export default {
    name: 'MyHeader',
    data() {
        return {
            searchContain: ''
        }
    },
    mounted() {
        // 渲染完毕后接收事件清空输入框
        this.$bus.$on('clear', () => {
            this.searchContain = ''
        })
    },
    methods: {
        toSearch() {
            let location = { name: 'search', params: { keyword: this.searchContain || undefined } }
            // 和分类跳转的页面路径进行合并
            if (this.$route.query) {
                location.query = this.$route.query
            }
            // 用跳转携带参数的形式进行传参,path不能和params进行如下形式传参
            this.$router.push(location)

            /* // 和分类跳转的页面路径进行合并

            // 用跳转携带参数的形式进行传参,path不能和params进行如下形式传参
            this.$router.push(
                {name:'search',
                // 接受到的params由这边命名决定
                params:{keywords:this.searchContain||undefined}
                })
            console.log(this.$route.params) */
        },
        // 登出函数
        async logout() {
            try {
                const res = await this.$store.dispatch('user/logout')
                // 清空本地token跳转首页
                removeToken()
                this.$alert(String(res), 'Tips', {
                    confirmButtonText: '点击返回首页',
                    callback: () => {
                        this.$router.replace('/home')
                    }
                });
            } catch (error) {
                this.$message({
                    message: String(error),
                    type: 'warning'
                });
            }
        }
    },
    computed: {
        ...mapState('user', ['userInfo'])
    }
}
</script>

<style lang="less" scoped>
.header {
    &>.top {
        background-color: #eaeaea;
        height: 30px;
        line-height: 30px;

        .container {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .loginList {
                float: left;

                p {
                    float: left;
                    margin-right: 10px;

                    .register {
                        border-left: 1px solid #b3aeae;
                        padding: 0 5px;
                        margin-left: 5px;
                    }
                }
            }

            .typeList {
                float: right;

                a {
                    padding: 0 10px;

                    &+a {
                        border-left: 1px solid #b3aeae;
                    }
                }

            }

        }
    }

    &>.bottom {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;
        line-height: 67px;

        .logoArea {
            float: left;

            .logo {
                text-align: center;
                display: block;
                height: 60px;
                margin-bottom: 4px;
                margin-top: 3px;
                width: 210px;
                line-height: 55px;
                font-size: 35px;
                border: 1px white solid;
                box-sizing: border-box;
                border-radius: 30px;
                background-color: red;
                color: #fefefe;
                text-shadow: 0px 1px 0px #c0c0c0,
                    0px 2px 0px #b0b0b0,
                    0px 3px 0px #a0a0a0,
                    0px 4px 0px #909090,
                    0px 5px 10px rgba(0, 0, 0, .9);
                text-decoration: none;

                &:hover {
                    background-color: rgb(0, 255, 208);
                    border: 1px solid white;
                }
            }
        }

        .searchArea {
            float: right;
            margin-top: 24px;

            .searchForm {
                overflow: hidden;

                input {
                    box-sizing: border-box;
                    width: 490px;
                    height: 32px;
                    padding: 0px 4px;
                    border: 2px solid #ea4a36;
                    float: left;

                    &:focus {
                        outline: none;
                    }
                }

                button {
                    height: 32px;
                    width: 68px;
                    background-color: #ea4a36;
                    border: none;
                    color: #fff;
                    float: left;
                    cursor: pointer;

                    &:focus {
                        outline: none;
                    }
                }
            }
        }
    }
}
</style>