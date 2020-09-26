<template>
  <div class="login">
    <div class="tit">
        <span class="iconfont iconleft" @click="$router.back()"></span>
        <h1>猫眼电影</h1>
        <span></span>
    </div>
    <div v-show="!islog">
    <div class="type">美团账号登录</div>
    <div class="wrap">
        <div class="name">
            <input type="text" v-model="name" placeholder="账号" >
        </div>
        <div class="psd">
            <input type="password" v-model="psd" placeholder="密码">
        </div>
        <span @click="loginAction">登录</span>
        <p @click="logAction(true)">立即注册</p>
    </div>  
    </div>
    <div v-show="islog">
    <div class="type">账号注册</div>
    <div class="wrap">
        <div class="name">
            <input type="text" v-model="name" placeholder="账号" >
        </div>
        <div class="psd">
            <input type="password" v-model="psd" placeholder="密码">
        </div>
        <span @click="addAction">注册</span>
        <p @click="logAction(false)">已有账号返回登录</p>
    </div> 
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Toast } from 'vant';

Vue.use(Toast);
export default {
    data(){
        return {
            islog: false,
            name: '',
            psd: ''
        }
    },
    methods: {
        logAction(boo){
            this.islog = boo;
        },
        loginAction(){
            if(this.name == '' || this.psd == ''){
                Toast({
                    message: '账号或密码不能为空!',
                    className: 'toast'
                });
                return;
            }
            var userList =  JSON.parse(localStorage.getItem('userList')) ;
            var res = userList.filter(item => item.name == this.name);
            if(res.length == 0){
                Toast({
                    message: '用户名不存在!',
                    className: 'toast'
                });
                return;
            }
            if(res[0].psd != this.psd){
                Toast({
                    message: '密码错误!',
                    className: 'toast'
                });
                return;
            };
            Toast({
                message: '登录成功!',
                className: 'toast'
            });
            var obj = {
                name: this.name,
                psd: this.psd
            }
            localStorage.setItem('logUser',JSON.stringify(obj));
            this.$emit('loginSu');

        },
        addAction(){
            if(this.name == '' || this.psd == ''){
                Toast({
                    message: '账号或密码不能为空!',
                    className: 'toast'
                });
                return;
            }
            var userList =  JSON.parse(localStorage.getItem('userList')) ;
            var res = userList.filter(item => item.name == this.name);
            if(res.length !== 0){
                Toast({
                    message: '账号已被占用!',
                    className: 'toast'
                });
                this.name = '';
                this.psd = '';
                return;
            }
            var obj = {
                name : this.name,
                psd: this.psd
            };
            userList.push(obj);
            localStorage.setItem('userList' , JSON.stringify(userList)) ;
            Toast({
                message: '注册成功!',
                className: 'toast'
            });
            this.name = '';
            this.psd = '';
            this.islog = false;
        }
    }
}
</script>

<style lang="scss">
.toast{
    z-index: 9999 !important;
    transform: translate3d(-50%,-50%,0) scale(2);
    transform-origin: center;
}
</style>
<style scoped lang="scss">
.login{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #f3f3f3;
    z-index: 2999;
    .tit{
        height: 0.5rem;
        background: #e54847;
        width: 100%;
        display: flex;
        span{
            width: 0.5rem;
            height: 100%;
            text-align: center;
            color: #fff;
            font-size: 0.24rem;
            line-height: 0.5rem;
        }
        h1{
            flex: 1;
            line-height: 0.5rem;
            text-align: center;
            font-size: 0.18rem;
            color: #fff;
        }
    }
    .type{
        width: 100%;
        text-align: center;
        line-height: 0.44rem;
        height: 0.44rem;
        background: #fff;
        font-size: 0.16rem;
        color: #333;
        margin-bottom: 0.06rem;
    }
    .wrap{
        width: 100%;
        div{
            width: 100%;
            height: 0.44rem;
            border-bottom: 1px solid #d8d8d8;
            background: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            input{
                height: 0.3rem;
                width: 90%;
                background: #E8F0FE;
                line-height: 0.3rem;
                padding-left: 0.06rem;
                border-radius: 0.04rem;
                border: 0;
            }
        }
        span{
            display: block;
            margin: 0.14rem 0.1rem;
            height: 0.3rem;
            line-height: 0.3rem;
            background: #df2d2d;
            border-radius: 0.04rem;
            text-align: center;
            font-size: 0.14rem;
            color: #fff;
        }
        p{
            padding-left: 0.1rem;
            font-size: 0.13rem;
            color: #FE8C00;
        }
    }
}
</style>