<template>
  <div class="surebuy">
      <div class="tit">
          <span class="iconfont iconleft" @click="$router.back()" ></span>
          <h1>支付订单</h1>
          <span class="time ellipsis">{{this.time | timeF}}</span>
      </div>
      <div class="info">
          <div class="img">
              <img :src="info.img" alt="">
          </div>
          <div class="con">
              <h2 class="ellipsis">{{info.mn}}</h2>
              <h3 class="ellipsis">{{info.dateDesc}}{{info.showDate}} {{info.showTime}}({{info.lang}}{{info.dim}})</h3>
              <h4 class="ellipsis">{{info.cn}}</h4>
              <h5 class="ellipsis">{{info.hn}} <span v-for="item in info.seatList" :key="item.id">{{item.row}}排{{item.col}}座</span> </h5>
          </div>
          <div class="seats">{{info.seatList.length}}张 原价￥{{ info.seatList.reduce( (pre,item)=>{return pre + Number(item.pri)},0) }}</div>
      </div>
      <div class="changeD">
          <div class="wrap">
            <div>
               <div>
                    <img :src="no" alt="">
                    <span>不支持退票</span>
                </div>
                <div>
                    <img :src="yes" alt="">
                    <span>支持改签</span>
                </div> 
            </div>
            
            <p>退改签须知<span class="iconfont iconarrow"></span></p>  
          </div>
          
      </div>
      <div class="act">
          <div class="top">
              <p>活动与抵用券</p>
              <p>无可用<span class="iconfont iconarrow"></span></p>
          </div>
          <div class="res">
              <p>小计：<span>￥<i>{{ info.seatList.reduce( (pre,item)=>{return pre + Number(item.pri)},0) }}</i></span></p>
          </div>
      </div>
      <div class="beSure">
          <p><span>￥<i>{{ info.seatList.reduce( (pre,item)=>{return pre + Number(item.pri)},0) }}</i></span></p>
          <div @click="yesAction" >
              确认支付
          </div>
      </div>

  </div>
</template>

<script>
import Vue from 'vue';
import { Toast } from 'vant';

Vue.use(Toast);

import no from '../../assets/no.png'
import yes from '../../assets/yes.png'
export default {
    filters: {
        timeF: (str)=>{
            var mm = Math.floor(str/60);
            if(mm < 10){
                mm = '0' + mm;
            }
            var ss = str%60;
            if(ss < 10){
                ss = '0' + ss;
            }
            return mm + ':' + ss
        }
    },
    computed: {
        info(){
            return JSON.parse(this.$route.params.query)
        }
    },
    data(){
        return {
            time: 900,
            no,
            yes
        }
    },
    methods: {
        yesAction(){
            var user = JSON.parse(localStorage.getItem('logUser'));
            var orederList = JSON.parse(localStorage.getItem('orederList'));
            if(!orederList){
                var obj = {
                    user: user.name,
                    order: [this.info]
                };
                var arr = [obj];
                localStorage.setItem('orederList',JSON.stringify(arr));
            }else{
                var n = orederList.findIndex( item => item.name == user.name );
                if(n == -1){
                    var obj = {
                        user: user.name,
                        order: [this.info]
                    };
                    orederList.push(obj);
                    localStorage.setItem('orederList',JSON.stringify(orederList));
                }else{
                    orederList[n].order.push(this.info);
                    localStorage.setItem('orederList',JSON.stringify(orederList));
                }
            }
            Toast({
                message: '购买成功！',
                className: 'toastwrap'
            });
            
        }
    },
    watch:{
        time(newVal){
            if(newVal == 0){
                Toast({
                    message: '已超出时间，请从新选择！',
                    className: 'toastwrap'
                });
                this.$router.back();
            }
        }
    },
    mounted(){
        this.timer = setInterval(()=>{
            this.time --;
        },1000)
    }
}
</script>

<style lang="scss">
.toastwrap{
    transform: translate3d(-50%,-50%,0) scale(2);
    transform-origin: center center;
}
</style>
<style scopde lang="scss">
.surebuy{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #f3f3f3;
    text-overflow: ellipsis;
    z-index: 199;

    .tit{
        width: 100%;
        height: 0.5rem;
        line-height: 0.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #7EA6BB;
        .iconfont{
            font-size: 0.24rem;
            color: #fff;
            width: 0.5rem;
            text-align: center;
        }
        h1{
            flex: 1;
            text-align: center;
            font-size: 0.16rem;
            color: #fff;
        }
        .time{
            width: 0.5rem;
            font-size: 0.12rem;
            text-align: center;
            color: #fff;
            height: 0.3rem;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 0.15rem 0 0 0.15rem;
            line-height: 0.3rem;
            padding-left: 0.1rem;
        }
    }
    .info{
        width: 100%;
        background: #7EA6BB;
        padding: 0.125rem;
        display: flex;
        position: relative;
        .img{
            width: 0.72rem;
            height: 0.99rem;
            background: #bbb;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .con{
            width: calc(100% - 0.72rem);
            padding-left: 0.1rem;
            h2{
                height: 0.25rem;
                width: 100%;
                line-height: 0.25rem;
                font-size: 0.18;
                color: #fff;
            }
            h3{
                margin-top: 0.1rem;
                height: 0.18rem;
                line-height: 0.18rem;
                width: 100%;
                font-size: 0.13rem;
                color: #fff;
            }
            h4,h5{
                margin-top: 0.05rem;
                height: 0.18rem;
                line-height: 0.18rem;
                width: 100%;
                font-size: 0.13rem;
                color: #fff;
            }
            h5{
                span{
                    margin-right: 0.03rem;
                }
            }
        }
        .seats{
            position: absolute;
            height: 0.25rem;
            line-height: 0.25rem;
            right: 0.125rem;
            top: 0.125rem;
            font-size: 0.13rem;
            color: #Fff;
        }
    }
    .changeD{
        width: 100%;
        height: 0.65rem;
        background: #7EA6BB;
        .wrap{
            padding: 0 0.15rem;
            height: 100%;
            border-radius: 0.12rem 0.12rem 0 0 ;
            background: rgba(0,0,0,.12);
            display: flex;
            justify-content: space-between;
            >div{
                display: flex;
                >div{
                    height: 0.44rem;
                    line-height: 0.44rem;
                    font-size: 0.13rem;color: #fff;
                    display: flex;
                    align-items: center;
                    margin-right: 0.1rem;
                    img{
                        width: 0.13rem;
                        height: 0.13rem;
                        margin-right: 0.05rem;
                    }
                }
            }
            p{
                height: 0.44rem;
                line-height: 0.44rem;
                font-size: 0.13rem;
                color: #fff;
                display: flex;
                align-items: center;
                .iconfont{
                    margin-right: 0.05rem;
                    font-size: 0.13rem;
                }
            }
        }
        
    }
    .act{
        width: 100%;
        background: #fff;
        border-radius: 0.12rem 0.12rem 0 0;
        margin-top: -0.22rem;
        padding: 0 0.15rem;
        .top{
            display: flex;
            border-bottom: 1px solid #d8d8d8;
            height: 0.46rem;
            line-height: 0.46rem;
            justify-content: space-between;
            font-size: 0.14rem;
            color: #333;
            p{
                &:nth-child(2){
                    font-size: 0.12rem;
                    color: #999;
                    display: flex;
                    align-items: center;
                    .iconfont {
                        margin-left: 0.05rem;
                    }
                }
            }
        }
        .res{
            height: 0.46rem;
            line-height: 0.46rem;
            font-size: 0.14rem;
            color: #333;
            display: flex;
            justify-content: flex-end;
            span{
                color: #ef4238;
                margin-left: 0.05rem;
                i{
                    font-size: 0.18rem;
                }
            }
        }
    }
    .beSure{
        position: absolute;
        bottom: 0;
        left: 0;
        height: 0.65rem;
        padding: 0.1rem;
        background: #fff;
        width: 100%;
        display: flex;
        justify-content: space-between;
        p{
            height: 100%;
            line-height: 0.45rem;
            font-size: 0.14rem;
            color:#ef4238 ;
            i{
                font-size: 0.2rem;
                font-weight: 500;
            }
        }
        div{
            width: 1.5rem;
            height: 0.45rem;
            line-height: 0.45rem;
            background: #ff9e05;
            font-size: 0.16rem;
            color: #fff;
            text-align: center;
            border-radius: 0.04rem;
        }

    }
    
}
</style>