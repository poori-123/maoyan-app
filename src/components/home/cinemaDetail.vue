<template>
  <div class="cinemaDetail">
      <div class="tit">
          <span class="iconfont iconleft" @click="$router.back()" ></span>
          <h2 class="ellipsis">{{cinemaData.nm}}</h2>
      </div>
      <app-scroll class="scroll" v-if="loading">
          <div class="cin-info">
              <div class="top ellipsis">
                  <span>猫眼电影</span>
                  <span> > {{cinemaData.nm}}</span>
              </div>
              <div class="pos">
                  <div class="left">
                      <h3 class="ellipsis">{{cinemaData.nm}}</h3>
                      <h4 class="ellipsis">{{cinemaData.addr}}</h4>
                  </div>
                  <div class="right">
                      <span class="iconfont iconlocation"></span>
                  </div>
              </div>
              <div class="cinemas">
                  <div class="bgbox">
                    <div class="bgimg" :style="{'background-image': 'url(' + moviesList[mvActive].img  + ')' }" ></div>   
                    <div class="filter"></div>                   
                  </div>
                  <app-scroll class="cinema-scroll" :scrollX="true" >
                      <ul>
                        <li 
                            v-for="(item,index) in moviesList" 
                            :key="item.id" 
                            @click="chooseAction(index)"
                            :class="{active: index === mvActive }"
                        >
                            <img :src="item.img" alt="">
                        </li>
                      </ul>
                  </app-scroll>
              </div>
              <div class="movie-plays">
                  <div class="nm">
                      <h3>
                          <span>{{moviesList[mvActive].nm}}</span>
                          <i>{{moviesList[mvActive].sc}}<b>分</b></i>
                      </h3>
                      <h4>{{moviesList[mvActive].desc}}</h4>
                  </div>
                  <div class="day">
                      <app-scroll class="day-scroll" :scrollX="true" >
                          <ul>
                                <li 
                                    :class="{active: index === dayActive }"
                                    v-for="(item,index) in moviesList[mvActive].shows"
                                    :key="item.showDate"
                                    @click="dayAction(index)"
                                >{{item.dateShow}}</li>
                          </ul>
                      </app-scroll>
                  </div>
                  <div class="playList">
                    <div class="none" v-if="moviesList[mvActive].shows[dayActive].plist.length === 0">
                        <img :src="cdp" alt="">
                        <h3>今日场次已映完</h3>
                        <h4 @click="tomoAction" v-if="moviesList[mvActive].shows[dayActive+1]">点击查看{{moviesList[mvActive].shows[dayActive+1].dateShow}}场次</h4>
                        <h4 v-if="!moviesList[mvActive].shows[dayActive+1]">影片未上映</h4>
                    </div>
                    <li 
                        v-for="item in moviesList[mvActive].shows[dayActive].plist" 
                        :key="item.seqNo"
                        v-if="moviesList[mvActive].shows[dayActive].plist.length !== 0"
                    >
                        <div class="time">
                            <h3 class="ellipsis">{{item.tm}}</h3>
                            <h4 class="ellipsis">{{item.tm | dateFil(moviesList[mvActive].dur)}} 散场</h4>
                        </div>
                        <div class="hall">
                            <h3>{{item.lang}} {{item.tp}}</h3>
                            <h4>{{item.th}}</h4>
                        </div>
                        <div class="price ellipsis">
                            <span class="pr"><i>￥</i>{{item.pr}}</span>
                            <span class="vip" v-if="item.vipPrice"><i>{{item.vipPriceName}}</i>￥{{item.vipPrice}}</span>
                        </div>
                        <div class="buy ">
                            <span @click="buyAction(item.seqNo)" >购票</span>
                        </div>
                    </li>
                  </div>
              </div>
          </div>
      </app-scroll>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import cdp from '../../assets/cdp.png';
export default {
    filters: {
        dateFil: (str,dur)=>{
            var reg = /^(\d+):(\d+)/g;
            reg.test(str);
            var hh = parseInt(dur/60);
            var mm = dur%60;
            var nh = Number(RegExp.$1) + hh;
            var nm = Number(RegExp.$2) + mm;
            if(nm >= 60){
                nh++;
                nm -= 60;
            }
            if(nh >= 24){
                nh -= 24;
            }
            if(nh < 10){
                nh = '0' + nh;
            }
            if(nm < 10){
                nm = '0' + nm;
            }
            return nh + ':' + nm;
        }
    },
    data(){
        return {
            handleLoading: true,
            mvActive: 0,
            dayActive: 0,
            cdp
        }
    },
    computed: {
        ...mapState({
            cinemaData: state => state.cinemaDetail.cinemaData,
            moviesList: state => state.cinemaDetail.moviesList,
            loading: state => state.cinemaDetail.isload
        })
    },
    methods:{
        chooseAction(index){
            this.mvActive = index;
            this.dayActive = 0;
        },
        dayAction(index){
            this.dayActive = index;
        },
        buyAction(str){
            console.log(str)
        },
        tomoAction(){
            this.dayActive ++;
        }
    },
    created(){
        this.$store.dispatch('cinemaDetail/initDetail',this.$route.params.id);
    }
}
</script>

<style lang="scss">
.cinemaDetail{
    .cinema-scroll{
        .scroll-wrap{
            width: max-content;
            overflow: visible;
        }
    }
    .day-scroll{
        .scroll-wrap{
            width: max-content;
            height: 100%;
            overflow: visible;
        }
    }
}
</style>
<style  scoped lang="scss" >
.cinemaDetail{
    position: fixed;
    top: 0.5rem;
    bottom: 0;
    width: 100%;
    background: #fff;
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
    .scroll{
        width: 100%;
        height: 100%;
        overflow: hidden;
        .cin-info{
            width: 100%;
            .top{
                align-items: center;
                width: 100%;
                height: 0.29rem;
                padding: 0.1rem 0 0 0.15rem;
                font-size: 0.14rem;
                color: #777;
                line-height: 0.19rem;
            }
            .pos{
                width: 100%;
                height: 0.74rem;
                padding: 0.15rem 0;
                display: flex;
                align-items: center;
                .left{
                    width: calc(100% - 0.7rem);
                    padding-left: 0.15rem;
                    h3{
                        width: 100%;
                        font-size: 0.17rem;
                        line-height: 0.24rem;
                        color: #333;
                        font-weight: 700;
                    }
                    h4{
                        font-size: 0.13rem;
                        line-height: 0.185rem;
                        margin-top: 0.02rem;
                        color: #999;
                        width: 100%;
                    }
                }
                .right{
                    width: 0.7rem;
                    height: 0.31rem;
                    border-left: 1px solid #d8d8d8;
                    text-align: center;
                    line-height: 0.31rem;
                    color: #84C0FF;
                    .iconfont{
                        font-size: 0.24rem;
                    }
                }
            }
            .cinemas{
                width: 100%;
                height: 1.35rem;
                position: relative;
                overflow: hidden;
                .bgbox{
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    z-index: -1;
                    .bgimg{
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        top: 0;
                        left: 0;
                        background-size: cover;
                        background-repeat: no-repeat;
                        background-position: center;
                        filter: blur(0.15rem);
                    }
                    .filter{
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        top: 0;
                        left: 0;
                        background: #40454d;
                        opacity: 0.55;
                    }
                }
                .cinema-scroll{
                    width: 100%;
                    height: 100%;
                    padding: 0.2rem 0;
                    ul{
                        display: flex;
                        width: max-content;
                        li{
                            width: 0.65rem;
                            height: 0.95rem;
                            margin: 0 0.07rem;
                            position: relative;
                            img{
                                width: 100%;
                                height: 100%;
                            }
                            &.active{
                                transform: scale(1.2);
                                border: 0.02rem solid #fff;
                                &::after{
                                    content: '';
                                    position: absolute;
                                    border: 0.07rem solid transparent;
                                    border-top-color: #fff;
                                    left: 50%;
                                    bottom: 0;
                                    transform: translate(-50%,100%);

                                }
                            }
                        }
                    }
                }
            }
            .movie-plays{
                width: 100%;
                .nm{
                    width: 100%;
                    padding: 0.11rem 0.15rem;
                    h3{
                        height: 0.24rem;
                        line-height: 0.24rem;
                        font-size: 0.17rem;
                        color: #333;
                        font-weight: 700;
                        text-align: center;
                        i{
                            margin-left: 0.05rem;
                            font-size: 0.16rem;
                            color: #ffb400;
                            b{
                                font-size: 0.12rem;
                            }
                        }
                    }
                    h4{
                        margin-top: 0.02rem;
                        height: 0.185rem;
                        line-height: 0.185rem;
                        text-align: center;
                        font-size: 0.13rem;
                        color: #999;
                    }
                }
            }
            .day{
                width: 100%;
                height: 0.45rem;
                border-top: 1px solid #d8d8d8;
                border-bottom: 1px solid #d8d8d8;
                .day-scroll{
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    ul{
                        width: max-content;
                        display: flex;
                        height: 100%;
                        li{
                            height: 100%;
                            width: 1rem;
                            line-height: 0.45rem;
                            text-align: center;
                            margin: 0 0.05rem;
                            font-size: 0.14rem;
                            color: #666;
                            &.active{
                                color: #f03d37;
                                border-bottom: 0.02rem solid #f03d37;
                            }
                        }
                    }
                }
            }
            .playList{
                width: 100%;
                li{
                    width: 100%;
                    height: 0.77rem;
                    padding: 0.17rem 0;
                    margin-left: 0.125rem;
                    border-bottom: 1px solid #d8d8d8;
                    display: flex;
                    .time{
                        height: 100%;
                        width: 0.6rem;
                        text-align: center;
                        h3{
                            font-size: 0.2rem;
                            line-height: 0.2rem;
                            color: #333;
                        }
                        h4{
                            width: 100%;
                            font-size: 0.12rem;
                            color: #999;
                            line-height: 0.12rem;
                            margin-top: 0.1rem;
                        }
                    }
                    .hall{
                        width: 0.92rem;
                        margin-left: 0.16rem;
                        h3{
                            font-size: 0.13rem;
                            line-height: 0.18rem;
                            margin-top: 0.02rem;
                            color: #333;
                        }
                        h4{
                            font-size: 0.11rem;
                            color: #999;
                            line-height: 0.16rem;
                            margin-top: 0.07rem;
                        }
                    }
                    .price{
                        width: 1.3rem;
                        margin-left: 0.05rem;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        .pr{
                            font-size: 0.19rem;
                            color: #f03d37;
                            line-height: 0.21rem;
                            height: 0.21rem;
                            i{
                                font-size: 0.11rem;
                            }
                        }
                        .vip{
                            height: 0.14rem;
                            border: 1px solid #ff9000;
                            font-size: 0.11rem;
                            line-height: 0.14rem;
                            color: #ff9000;
                            margin-left: 0.05rem;
                            i{
                                background: #ff9000;
                                color: #fff;
                            }
                        }
                    }
                    .buy{
                        width: 0.45rem;
                        margin-left: 0.02rem;
                        display: flex;
                        align-items: center;
                        span{
                            width: 100%;
                            line-height: 0.27rem;
                            height: 0.27rem;
                            font-size: 0.12rem;
                            background: #f03d37;
                            border-radius: 0.04rem;
                            color: #fff;
                            text-align: center;
                        }
                    }
                }
                .none{
                    width: 100%;
                    height: 2.3rem;
                    background: #f0f0f0;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    img{
                        width: 0.775rem;
                    }
                    h3{
                        height: 0.16rem;
                        font-size: 0.16rem;
                        color: #acacac;
                        margin-top: 0.12rem;
                    }
                    h4{
                        width: 1.72rem;
                        height: 0.37rem;
                        margin-top: 0.2rem;
                        background: #fff;
                        border: 1px solid #d8d8d8;
                        color: #f03d37;
                        font-size: 0.14rem;
                        line-height: 0.37rem;
                        text-align: center;
                    }
                }
            }
        }
    }
}
</style>