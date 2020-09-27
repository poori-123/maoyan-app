<template>
  <div class="movieDetail" :style="{'background-color': movieDetail.backgroundColor}" >
      <app-scroll class="scroll" v-if="movieDetail">
          <div class="tit">
            <span @click="$router.back()">猫眼电影 > </span>
            <span>{{movieDetail.nm}}</span>
        </div>
        <div class="content">
            <div class="imgbox">
                <img :src="movieDetail.img" alt="">
                <div class="pause"><span class="iconfont icontriangle-right"></span></div>
            </div>
            <div class="info">
                <h2 class="ellipsis">{{movieDetail.nm}}</h2>
                <h3 class="ellipsis">{{movieDetail.enm}}</h3>
                <h4 class="ellipsis">{{movieDetail.cat}}</h4>
                <h5 class="ellipsis">{{movieDetail.star}}</h5>
                <h6 class="ellipsis">{{movieDetail.pubDesc}}/{{movieDetail.dur}}分钟 ></h6>
                <div class="btn">
                    <span class="iconfont iconguanzhu">想看</span>
                    <span class="iconfont iconxing">看过</span>
                </div>
            </div>
        </div>
        <div class="rate">
            <div class="top">
                <div class="left">
                    <img :src="logo" alt="">
                    <span>事实口碑</span>
                </div>
                <div class="right" v-if="movieDetail.globalReleased" >
                    <span>{{movieDetail.wish}}想看</span>
                    <span>{{movieDetail.watched}}看过</span>
                </div>
            </div>
            <div class="bot" v-if="movieDetail.globalReleased">
                <div class="left">
                    <span class="num">{{movieDetail.sc}}</span>
                    <span class="peop">{{movieDetail.snum}}人评</span>
                </div>
                <div class="right">
                    <div v-for="item in movieDetail.distributions">
                        <div class="stars"><span v-for="item in 5" class="iconfont iconxing"></span></div>
                        <div class="bar">
                            <span :style="{width: item.proportion + '%'}"></span>
                        </div>
                        <div class="percent">{{item.proportion}}%</div>
                    </div>
                </div>
            </div>
            <div class="bot" v-if="!movieDetail.globalReleased">
                <h3><span>{{movieDetail.wish | peopleNumT }}</span>人想看</h3>
            </div>  
        </div>
        <div class="intro">
            <div class="title">
                <span>简介</span>
                <p @click="hideAction">展开<span class="iconfont iconxia"></span></p>
            </div>
            <div class="msg">
                <p :class="{hide:ishide}">{{movieDetail.dra}}</p>
            </div>
        </div>
        <div class="actor">
            <div class="title">
                <span>演职人员</span>
                <p @click="hideAction">全部<span class="iconfont iconarrow"></span></p>
            </div>
            <div class="list">
                <div class="item"></div>
                <div class="item"></div>
                <div class="item"></div>
                <div class="item"></div>
            </div>
        </div>
        <div class="video">
            <div class="title">
                <span>视频推荐</span>
                <p @click="hideAction">全部{{movieDetail.vnum}}个<span class="iconfont iconarrow"></span></p>
            </div>
            <div class="content">
                <li>
                    <img :src="movieDetail.videoImg" alt="">
                    <span class="iconfont icontriangle-right"></span>
                </li>
                <li>
                    <img :src="movieDetail.videoImg" alt="">
                    <span class="iconfont icontriangle-right"></span>
                </li>
            </div>
        </div>
        <div class="photos">
            <div class="title">
                <span>剧照</span>
                <p @click="hideAction">全部{{movieDetail.photos.length}}张<span class="iconfont iconarrow"></span></p>
            </div>
            <div class="content">
                <app-scroll class="pho-scroll" :scrollX="true">
                    <ul>
                        <li v-for="item in movieDetail.photos">
                            <img :src="item" alt="">
                        </li> 
                    </ul>
                    
                </app-scroll>
            </div>
        </div>
      </app-scroll>
      <div class="buy">
          <span class="iconfont iconicon--"></span>
          <i @click="buyAction">特惠购票</i>
      </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import logo from '../../assets/logo.png';
export default {
    filters: {
        peopleNumT: (num)=>{
            if(num >= 1000000){
                var a = Math.floor(num / 1000000);
                var b = Math.floor((num - a*1000000)/1000);
                var c = num % 1000;
                return a + ',' + b + ',' + c;
            }else if( num >= 1000 ){
                var b = Math.floor(num/1000);
                var c = num % 1000;
                return  b + ',' + c;
            }else{
                return num;
            }
        }
    },
    data(){
        return {    
            logo,
            ishide: true
        }
    },
    computed: {
        ...mapState({
            movieDetail: state => state.movieDetail.movieDetail
        })
    },
    methods: {
        hideAction(){
            this.ishide = !this.ishide;
        },
        buyAction(){
            var id = this.$route.params.id;
            this.$emit('pushMovieCinema',id)
        }
    },
    created(){
        this.$store.dispatch('movieDetail/getMovieDetail',this.$route.params.id);
    }
}
</script>
<style lang="scss">
.movieDetail{
    .scroll-wrap{
        padding-bottom: 0.4rem;
    }
    .photos{
        .pho-scroll{
            .scroll-wrap{
                width: max-content;
                padding-bottom: 0;
            }
        }
    }
}
</style>
<style scoped lang="scss" >
.movieDetail{
    background: #fff;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    padding: 0.21rem 0.16rem;
    z-index: 999;
    .scroll{
        position: absolute;
        padding: 0.21rem 0.16rem;
        top: 0;
        left: 0;
        bottom: 0.6rem;
        width: 100%;
        overflow: hidden;
        .tit{
            margin-bottom: 0.15rem;
            line-height: 0.21rem;
            font-size: 0.14rem;
            color: #ccc;
        }
        .content{
            width: 100%;
            height: 1.38rem;
            overflow: hidden;
            display: flex;
            .imgbox{
                width: 1rem;
                height: 1.38rem;
                overflow: hidden;
                position: relative;
                img{
                    width: 100%;
                    height: 100%;
                }
                .pause{
                    width: 0.3rem;
                    height: 0.3rem;
                    background: rgba(255, 255, 255, 0.8);
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    border-top-right-radius: 0.3rem;
                    text-align: center;
                    line-height: 0.3rem;
                    .iconfont{
                        color: #333;
                        font-size: 0.14rem;
                    }
                }
            }
            .info{
                width: calc(100% - 1rem);
                padding-left: 0.12rem;
                h2{
                    width: 100%;
                    font-size: 0.2rem;
                    color: #fff;
                    line-height: 0.3rem;
                    height: 0.3rem;
                    font-weight: 700;
                }
                h3,h4,h5,h6{
                    width: 100%;
                    font-size: 0.12rem;
                    height: 0.18rem;
                    line-height: 0.18rem;
                    opacity: 0.6;
                    color: #fff;
                }
                h6{
                    line-height: 0.21rem;
                    height: 0.21rem;
                }
                .btn{
                    width: 100%;
                    height: 0.3rem;
                    display: flex;
                    justify-content: space-between;
                    span{
                        width: 1.1rem;
                        height: 100%;
                        background: rgba(240, 240, 240, 0.5);
                        color: #fff;
                        text-align: center;
                        line-height: 0.3rem;
                        font-size: 0.14rem;
                        border-radius: 0.04rem;
                        &::before{
                            margin-right: 0.02rem;
                        }
                    }
                }
            }
        }
        .rate{
            margin-top: 0.15rem;
            width: 100%;
            height: 1.78rem;
            padding: 0.1rem 0.12rem;
            border-radius: 0.06rem;
            background: rgba(0, 0, 0, 0.2);
            .top{
                width: 100%;
                height: 0.18rem;
                line-height: 0.18rem;
                display: flex;
                justify-content: space-between;
                .left{
                    font-size: 0.12rem;
                    color: #fff;
                    display: flex;
                    align-items: center;
                    img{
                        width: 0.14rem;
                        height: 0.14rem;
                        margin-right: 0.02rem;
                    }
                }
                .right{
                    font-size: 0.12rem;
                    color: #fff;
                    opacity: 0.6;
                    span{
                        &:nth-child(1){
                            margin-right: 0.05rem;
                        }
                    }
                }
            }
            .bot{
                width: 100%;
                height: 1.3rem;
                padding: 0.2rem 0;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                &::after{
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 1px;
                    background: #e8e8e8;
                    transform: scaleY(0.5);
                    transform-origin: bottom center;
                }
                .left{
                    width: 0.58rem;
                    height: 0.58rem;
                    margin-right: 0.2rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    .num{
                        font-size: 0.34rem;
                        height: 0.4rem;
                        line-height: 0.4rem;
                        text-align: center;
                        color: #ffb400;
                    }
                    .peop{
                        font-size: 0.12rem;
                        height: 0.18rem;
                        line-height: 0.18rem;
                        color: #fff;
                        opacity: 0.6;
                    }
                }
                .right{
                    width: 1.9rem;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    div{
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .stars{
                            width: 0.35rem;
                            height: 0.05rem;
                            display: flex;
                            justify-content: space-between;
                            color: #ccc;
                            opacity: 0.6;
                            span{
                                font-size: 0.15rem;
                                width: 0.05rem;
                                height: 0.05rem;
                                transform: scale(0.3);
                                transform-origin: left top;
                            }
                        }
                        .bar{
                            width: 1rem;
                            margin: 0 0.05rem;
                            height: 0.05rem;
                            background: rgba(200, 200, 200, 0.3);
                            position: relative;
                            span{
                                position: absolute;
                                height: 100%;
                                left: 0;
                                top: 0;
                                background: #ffb400;
                            }
                        }
                        .percent{
                            width: 0.4rem;
                            height: 0.18rem;
                            line-height: 0.18rem;
                            font-size: 0.12rem;
                            color: #ccc;
                            opacity: 0.6;
                        }
                        &:nth-child(2){
                            .stars{
                                span:nth-child(1){
                                    color: transparent;
                                }
                                span:nth-child(2){
                                    color: transparent;
                                }
                            }
                        }
                        &:nth-child(3){
                            .stars{
                                span:nth-child(1){
                                    color: transparent;
                                }
                                span:nth-child(2){
                                    color: transparent;
                                }
                                span:nth-child(3){
                                    color: transparent;
                                }
                                span:nth-child(4){
                                    color: transparent;
                                }
                            }
                        }
                    }
                    
                }
                h3{
                    padding: 0.2rem 0;
                    font-size: 0.22rem;
                    height: 0.8rem;
                    line-height: 0.4rem;
                    color: #fff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    span{
                        line-height: 0.4rem;
                        font-size: 0.28rem;
                        color: #ffbb29;
                        margin-right: 0.05rem;
                    }
                }
            }
        }
        .intro{
            width: 100%;
            padding-top: 0.16rem;
            .title{
                height: 0.22rem;
                line-height: 0.22rem;
                display: flex;
                justify-content: space-between;
                font-size: 0.15rem;
                color: #fff;
                p{
                    font-size: 0.12rem;
                    color: #fff;
                    opacity: 0.6;
                    line-height: 0.22rem;
                    span{
                        margin-left: 0.03rem;
                        font-size: 0.12rem;
                    }
                }
            }
            .msg{
                p{
                    font-size: 0.15rem;
                    line-height: 0.26rem;
                    color: #fff;
                    margin: 0.07rem 0;
                }
                .hide{
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 3;
                    text-overflow: ellipsis;
                    word-wrap: break-word;
                    word-break: break-all;
                    overflow: hidden;
                }
            }
        }
        .actor{
            width: 100%;
            margin: 0.18rem 0 0.15rem 0;
            .title{
                height: 0.22rem;
                line-height: 0.22rem;
                display: flex;
                justify-content: space-between;
                font-size: 0.15rem;
                color: #fff;
                p{
                    font-size: 0.12rem;
                    color: #fff;
                    opacity: 0.6;
                    line-height: 0.22rem;
                    span{
                        margin-left: 0.03rem;
                        font-size: 0.12rem;
                    }
                }
            }
            .list{
                margin-top: 0.11rem;
                width: 100%;
                height: 1.48rem;
                display: flex;
                justify-content: space-between;
                div{
                    width: 0.82rem;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.2);
                }
            }
        }
        .video{
            width: 100%;
            margin-top: 0.18rem;
            .title{
                height: 0.22rem;
                line-height: 0.22rem;
                display: flex;
                justify-content: space-between;
                font-size: 0.15rem;
                color: #fff;
                p{
                    font-size: 0.12rem;
                    color: #fff;
                    opacity: 0.6;
                    line-height: 0.22rem;
                    span{
                        margin-left: 0.03rem;
                        font-size: 0.12rem;
                    }
                }
            }
            .content{
                margin-top: 0.11rem;
                width: 100%;
                height: 0.93rem;
                display: flex;
                li{
                    margin-left: 0.08rem;
                    width: 1.4rem;
                    height: 100%;
                    position: relative;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                    span{
                        width: 0.32rem;
                        height: 0.32rem;
                        border-radius: 50%;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%,-50%);
                        background: #fff;
                        text-align: center;
                        line-height: 0.32rem;
                        font-size: 0.12rem;
                        color: #000;

                    }
                }
            }
        }
        .photos{
            width: 100%;
            margin-top: 0.18rem;
            .title{
                height: 0.22rem;
                line-height: 0.22rem;
                display: flex;
                justify-content: space-between;
                font-size: 0.15rem;
                color: #fff;
                p{
                    font-size: 0.12rem;
                    color: #fff;
                    opacity: 0.6;
                    line-height: 0.22rem;
                    span{
                        margin-left: 0.03rem;
                        font-size: 0.12rem;
                    }
                }
            }
            .content{
                margin-top: 0.11rem;
                width: 100%;
                height: 0.99rem;
                .pho-scroll{
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    ul{
                        width: max-content;
                        height: 100%;
                        display: flex;
                    }
                    li{
                        width: 1.4rem;
                        height: 0.99rem;
                        margin-right: 0.08rem;
                        img{
                            width: 100%;
                        }
                    }
                }
            }
        }
    }
    .buy{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0.6rem;
        display: flex;
        align-items: center;
        background: #fff;
        span{
            margin: 0 0.3rem 0 0.24rem;
            font-size: 0.2rem;
            color: #000;
        }
        i{
            width: 2.82rem;
            height: 0.44rem;
            line-height: 0.44rem;
            text-align: center;
            font-size: 0.17rem;
            color: #fff;
            border-radius: 0.22rem;
            margin-left: 0.1rem;
            background: linear-gradient(-90deg,#fb3333,#ff5269);
        }
    }
}
</style>