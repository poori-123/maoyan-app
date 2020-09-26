<template>
  <div class="page" id="mycenter">
    <div v-show="islogin">
      <div class="tit">
        <span></span>
        <h1>我的</h1>
      </div>
      <div class="info">
        <div class="imgbox">
          <img :src="err" alt="">
        </div>
      </div>
      <div class="order">
        <h3>我的订单</h3>
        <div class="type">
          <div class="cine" @click="$router.push({name:'order'})" >
            <img :src="cine" alt="">
            <span>电影</span>
          </div>
          <div class="shop">
            <img :src="shop" alt="">
            <span>商城</span>
          </div>
        </div>
      </div>
      <div class="welfare">
        <div>
          <span class="left">优惠卷</span>
          <span class="iconfont iconarrow"></span>
        </div>
        <div>
          <span class="left">折扣卡</span>
          <span class="iconfont iconarrow"></span>
        </div>
      </div>
    </div>
    <login @loginSu="successAction" v-show="!islogin"/>
    
    <router-view/>
  </div>
</template>

<script>
import cine from '../assets/cine.png';
import shop from '../assets/shop.png';
import err from '../assets/error.jpg';
import login from '../components/login/login';
export default {
  components: {
    login,
  },
  data(){
    return {
      cine,
      shop,
      err,
      islogin: false,
      userInfo: ''
    }
  },
  methods:{
    successAction(){
      this.islogin = true;
    }
  },
  created(){

    var logUser = localStorage.getItem('logUser');
    if(logUser){
      this.islogin = true;
      this.userInfo = logUser;
    }else{
      this.islogin = false;
      this.userInfo = '';
    }

  }
}
</script>

<style scoped lang="scss" >
#mycenter{
  background: #f3f3f3;
  .tit{
    position: absolute;
    height: 0.5rem;
    width: calc(100% - 0.5rem);
    left: 0;
    top: -0.5rem;
    background: #e54847;
    display: flex;
    span{
      width: 0.5rem;
      height: 100%;
    }
    h1{
      width: calc(100% - 0.5rem);
      font-size: 0.18rem;
      line-height: 0.5rem;
      font-weight: 400;
      color: #fff;
      font-weight: 400;
      text-align: center;
    }
  }
  .info{
    width: 100%;
    height: 1.5rem;
    background: url('https://s0.meituan.net/bs/file/?f=myfe/canary:static/deploy/dpmmweb/client/dpmmweb/component/mycenter/img/bg.png') no-repeat center;
    background-size: cover;
    overflow: hidden;
    .imgbox{
      width: 0.66rem;
      height: 0.66rem;
      margin: 0.3rem auto 0;
      border: 0.03rem solid #fff;
      border-radius: 50%;
      overflow: hidden;
      background: #ccc;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
  .order{
    width: 100%;
    margin-top: 0.1rem;
    background: #fff;
    height: 1.5rem;
    overflow: hidden;
    h3{
      margin-top: 0.13rem;
      height: 0.21rem;
      line-height: 0.21rem;
      text-align: center;
      font-size: 0.15rem;
      color: #333;
      display: flex;
      align-items: center;
      justify-content: center;
      &::before{
        content: '';
        width: 0.4rem;
        height: 0.01rem;
        background: #d8d8d8;
        margin-right: 0.1rem;
      }
      &::after{
        content: '';
        width: 0.4rem;
        height: 0.01rem;
        background: #d8d8d8;
        margin-left: 0.1rem;
      }

    }
    .type{
      width: 100%;
      display: flex;
      div{
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 0.18rem;
        img{
          width: 0.42rem;
          height: 0.42rem;
          margin-bottom: 0.1rem;
        }
        span{
          height: 0.21rem;
          line-height: 0.21rem;
          color: #333;
          font-size: 0.15rem;
        }
      }
    }
  }
  .welfare{
    width: 100%;
    background: #fff;
    margin-top: 0.1rem;
    padding-left: 0.15rem;
    div{
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding-right: 0.15rem;
      height: 0.44rem;
      border-bottom: 1px solid #d8d8d8;
      line-height: 0.44rem;
      &:nth-last-child(1){
        border-bottom: none;
      }
      .left{
        font-size: 0.15rem;
        color: #333;
      }
      .iconfont{
        font-size: 0.16rem;
        color: #ccc;
      }
    }
  }
}
</style>