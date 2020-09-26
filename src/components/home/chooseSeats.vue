<template>
  <div class="chooseSeats" v-if="loading" >
      <div class="tit">
          <span class="iconfont iconleft" @click="$router.back()" ></span>
          <h2>{{baseInfo.cinema.cinemaName}}</h2>
      </div>
      <div class="content">
          <div class="top">
              <div class="title">
                  <h3>{{baseInfo.movie.movieName}}</h3>
                  <h4>{{baseInfo.show.showDate}} {{baseInfo.show.showTime}} {{baseInfo.show.lang}} {{baseInfo.show.dim}}</h4>
              </div>
              <div class="notice" :class="{show: isShow}" >
                  <div class="pos ellipsis" @click="showAction">
                      {{baseInfo.notice.length}}个通知<span class="iconfont iconxia"></span>
                  </div>
                  <li v-for="(item,index) in baseInfo.notice" :key="index">
                      <div class="img"><img :src="item.imgUrl" alt=""></div>
                      <p>{{item.detail}}</p>
                  </li>
              </div>
          </div>
          <div class="main" ref="main">
              <div class="hall">{{baseInfo.hall.hallName}}</div>
              <div class="num" ref="num">
                  <span v-for="num in seatArr.rowSize" :key="num">
                      {{num}}
                  </span>
              </div>
              <div class="seatWrap" ref="seatWrap" >
                  <ul ref="rows" v-for="row in seatArr.rows" :key="row.rowId">
                      <li ref="cols" v-for="(col,index) in row.seats" :key="index">
                        <div 
                            v-show="col.columnId" 
                            :style="{'background-image': 'url('+ (col.seatStatus == 4 ?  seatImg.seatLegends[2].legendIcon : ( col.seatStatus == 3 ?  seatImg.seatLegends[1].legendIcon : seatImg.seatLegends[0].legendIcon)) +')' }" 
                            @click="addAction($event,col)"
                        ></div>
                      </li>
                  </ul>
              </div>
          </div>
          <div class="bot">
            <div class="title">
                <div v-show="chooseSeat.length === 0" v-for="item in seatImg.seatLegends" :key="item.legendType">
                    <img :src="item.legendIcon" alt="">
                    <span>{{item.legendName}}</span>
                </div>
            </div>
            <div class="seat" v-show="chooseSeat.length !== 0">
                <h4>已选座位</h4>
                <ul>
                    <li v-for="(item,index) in chooseSeat" :key="item.id">
                        <h5>{{item.row}}排{{item.col | colF}}座</h5>
                        <h6>￥{{item.pri}}</h6>
                        <span @click="delAction(index)">x</span>
                        <i></i>
                    </li>
                </ul>
            </div>
            <div class="buy">
                <span class="no" v-show="chooseSeat.length === 0">请先选座</span>
                <span class="yes" 
                    v-if="chooseSeat.length !== 0"
                    @click="buyAction"
                >￥{{ chooseSeat.reduce( (pre,item)=>{return pre + Number(item.pri)},0) }} 确认选座</span>
            </div>
          </div>
      </div>
      <router-view/>
      <login @loginSu="successAction" v-show="!islogin"/>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import Vue from 'vue';
import { Toast } from 'vant';

Vue.use(Toast);

import login from '../login/login';
export default {
    filters: {
        colF: (num)=>{
            if(num < 10){
                return '0' + num;
            }else{
                return num
            }
        }
    },
    components: {
        login
    },
    data(){
        return {
            isShow: false,
            chooseSeat: [],
            islogin: false,
        }
    },
    computed: {
        ...mapState({
            baseInfo: state => state.chooseSeats.baseInfo,
            seatImg: state => state.chooseSeats.seatImg,
            seatArr: state => state.chooseSeats.seatArr,
            loading: state => state.chooseSeats.loading,
        })
    },
    methods: {
        showAction(){
            this.isShow = !this.isShow;
        },
        delAction(index){
            var r = this.chooseSeat[index].row;
            var c = this.chooseSeat[index].col;
            var row = this.$refs.rows[r - 1]
            var lis = row.querySelectorAll('li')
            var col = lis[lis.length-c].querySelector('div');
            col.setAttribute('flag',0);
            col.style.backgroundImage = 'url(' + this.seatImg.seatLegends[0].legendIcon + ')';

            this.chooseSeat.splice(index,1);
        },
        addAction(e,col){
            // r是行 c是列   s是状态（4是不可售，3是已售，1拾是可选)
            var r = col.rowId;
            var c = col.columnId;
            var s = col.seatStatus;
            var id = col.seatNo;

            var tar = e.target;
            
            if(s == 1){
                var f = tar.getAttribute('flag');
                if(f == 1){
                    tar.setAttribute('flag',0);
                    tar.style.backgroundImage = 'url(' + this.seatImg.seatLegends[0].legendIcon + ')';
                    this.chooseSeat = this.chooseSeat.filter( item => item.id != id );
                }else if(f == 0 || !f){
                    
                    var max = this.baseInfo.show.buyNumLimit;
                    if(this.chooseSeat.length >= max){
                        Toast({
                            message: '最多只能购买' + max + '张!',
                            className: 'toastBox'
                        })
                        return ;
                    }

                    tar.setAttribute('flag',1);
                    tar.style.backgroundImage = 'url(' + this.seatImg.selectedImages[0] + ')';
                    var obj = {
                        row: r,
                        col: c,
                        id: id,
                        pri: this.baseInfo.price
                    };
                    this.chooseSeat.push(obj)
                }
            }
        },
        buyAction(){
            var obj = {
                cn: this.baseInfo.cinema.cinemaName,
                hn: this.baseInfo.hall.hallName,
                mn: this.baseInfo.movie.movieName,
                showDate: this.baseInfo.show.showDate,
                dateDesc: this.baseInfo.show.dateDesc,
                lang: this.baseInfo.show.lang,
                dim: this.baseInfo.show.dim,
                showTime: this.baseInfo.show.showTime,
                seatList: this.chooseSeat
            };
            console.log(obj);
            this.$router.push({
                name: 'surebuy',
                params:{
                    query: JSON.stringify(obj)
                }
            })
        },
        successAction(){
            this.islogin = true;
        }
    },
    watch:{
        seatArr(newVal){
            if(newVal){
                this.$nextTick( ()=>{
                    var w1 = this.$refs.main.offsetWidth;
                    var w2 = w1*0.8;
                    var n = w2 / this.$refs.seatWrap.offsetWidth;
                    this.$refs.seatWrap.style.transform = 'translate( -50%, -50%) scale(' + n + ')';
                    this.$refs.num.style.transform = 'translateY(-50%) scale(' + n + ')';
                })
            }
        }
    },
    created(){
        this.$store.dispatch('chooseSeats/getSeats',this.$route.params.no);

        var logUser = localStorage.getItem('logUser');
        if(logUser){
            this.islogin = true;
        }else{
            this.islogin = false;
        }
    }
}
</script>

<style lang="scss">

.toastBox{
    transform: translate3d(-50%,-50%,0) scale(2);
    transform-origin: center center;
}
</style>
<style scoped lang="scss" >
.chooseSeats{
    position: fixed;
    top: 0.5rem;
    bottom: 0;
    z-index: 999;
    .tit{
        position: absolute;
        top: -0.5rem;
        left: 0;
        width: calc(100% - 0.5rem) ;
        background: #E54847;
        line-height: 0.5rem;
        color: #fff;
        display: flex;
        .iconfont{
            width: 0.5rem;
            text-align: center;
            font-size: 0.24rem;
        }
        h2{
            font-size: 0.18rem;
            width: calc(100% - 0.5rem);
            text-align: center;
        }
    }
    .content{
        width: 100%;
        height: 100%;
        position: relative;
        .top{
            width: 100%;
            background: #fff;
            .title{
                padding: 0.15rem;
                h3{
                    width: 100%;
                    height: 0.24rem;
                    line-height: 0.24rem;
                    font-size: 0.16rem;
                    font-weight: 700;
                    color: #333;
                }
                h4{
                    height: 0.13rem;
                    margin-top: 0.02rem;
                    line-height: 0.13rem;
                    font-size: 0.13rem;
                    color: #777;
                }
            }
            .notice{
                width: 100%;
                position: relative;
                height: 0.31rem;
                overflow: hidden;
                &.show{
                    height: auto;
                    .pos{
                        .iconfont{
                            transform: rotate(180deg);
                        }
                    }
                }
                .pos{
                    position: absolute;
                    right: 0.15rem;
                    top: 0.06rem;
                    font-size: 0.12rem;
                    color: #f90;
                    width: 0.6rem;
                    line-height: 0.2rem;
                    .iconfont{
                        font-size: 0.12rem;
                        color: #666;
                        margin-left: 0.05rem;
                    }
                }
                &::before{
                    position: absolute;
                    content: '';
                    left: 0.15rem;
                    right: 0.15rem;
                    height: 1px;
                    background-color: #d8d8d8;
                }
                li{
                    margin: 0.025rem 0.15rem;
                    padding-top: 0.06rem;
                    line-height: 0.2rem;
                    display: flex;
                    .img{
                        width: 0.17rem;
                        margin-right: 0.02rem;
                        img{
                            width: 100%;
                        }
                    }
                    p{
                        width: 72%;
                        font-size: 0.12rem;
                        color: #666;
                        line-height: 0.2rem;
                    }
                }
            }
        }
        .main{
            width: 100%;
            height: 4.14rem;
            position: relative;
            .hall{
                font-size: 0.14rem;
                color: #777;
                background: #e3e3e3;
                height: 0.18rem;
                width: 2rem;
                position: absolute;
                left: 50%;
                top: 0;
                transform: translateX(-50%);
                border-radius: 0 0 0.18rem 0.18rem;
                text-align: center;
                line-height: 0.18rem;
                z-index: 9;
            }
            .num{
                position: absolute;
                top: 50%;
                transform-origin: left center;
                transform: translateY(-50%) scale(0.6);
                left: 0;
                z-index: 9;
                width: 0.16rem;
                font-size: 0.13rem;
                background: rgba(0,0,0,.05);
                span{
                    display: block;
                    height: 0.48rem;
                    line-height: 0.48rem;
                    font-size: 0.13rem;
                    color: #777;
                    text-align: center;
                }
            }
            .seatWrap{
                width: max-content;
                height: auto;
                position: absolute;
                top: 50%;
                left: 50%;
                transform:translate( -50%, -50%) scale(0.6);
                transform-origin: center center;
                ul{
                    display: flex;
                    width: max-content;
                    height: auto;
                    li{
                        width: 0.46rem;
                        height: 0.48rem;
                        padding: 0.06rem 0.03rem;
                        div{
                            width: 100%;
                            height: 100%;
                            padding: 0.03rem 0.06rem;
                            background-size: cover;
                            background-repeat: no-repeat;
                        }
                    }
                }
            }
        }
        .bot{
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            z-index: 19;
            .title{
                display: flex;
                width: 100%;
                height: 0.36rem;
                justify-content: center;
                align-items: center;
                div{
                    padding: 0 0.05rem;
                    display: flex;
                    align-items: center;
                    img{
                        height: 0.15rem;
                        margin-right: 0.05rem;
                    }
                    span{
                        font-size: 0.12rem;
                        color: #777;
                    }
                }
            }
            .buy{
                width: 100%;
                height: 0.65rem;
                padding: 0.1rem;
                background: #fff;
                span{
                    display: block;
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    line-height: 0.45rem;
                    color: #fff;
                    border-radius: 0.04rem;
                    font-size: 0.18rem;
                    font-weight: 700;
                }
                .no{
                    background: #ffddb2;
                }
                .yes{
                    background: #f90;
                }
            }
            .seat{
                width: 100%;
                padding: 0 0.1rem;
                background: #fff;
                h4{
                    padding-top: 0.05rem;
                    height: 0.25rem;
                    line-height: 0.2rem;
                    font-size: 0.12rem;
                    color: #333;
                }
                ul{
                    display: flex;
                    flex-wrap: wrap;
                    li{
                        width: 0.825rem;
                        height: 0.37rem;
                        margin: 0.05rem 0.02rem;
                        text-align: center;
                        border: 1px solid #d8d8d8;
                        position: relative;
                        h5{
                            padding-top: 0.03rem;
                            font-size: 0.12rem;
                            color: #333;
                            line-height: 0.19rem;
                        }
                        h6{
                            font-size: 0.12rem;
                            color: #fa5939;
                            line-height: 0.15rem;
                        }
                        span{
                            position: absolute;
                            right: 0.04rem;
                            top: 50%;
                            transform: translateY(-50%);
                            font-size: 0.15rem;
                            color: #ddd;
                        }
                        i{
                            position: absolute;
                            left: -1px;
                            top: 50%;
                            transform: translateY(-50%);
                            width: 0.06rem;
                            height: 0.12rem;
                            border-top-right-radius: 1.12rem;
                            border-bottom-right-radius: 1.12rem;
                            background: #fff;
                            border: 1px solid #d8d8d8;
                            border-left-color: #fff;
                        }
                    }
                }
            }
        }
    }
}
</style>