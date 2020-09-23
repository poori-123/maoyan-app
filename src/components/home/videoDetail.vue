<template>
  <div class="videoDetail">
      <div class="vd-top">
          <span class="iconfont iconleft" @click="$router.back()" ></span>
          <span>猫眼电影</span>
          <span></span>
      </div>
      <div class="vd">
          <span class="iconfont icontriangle-right" @click="playAction" v-show="show" ></span>
          <video ref="vid" :src="query.video.url" controls="controls" width="50%" height="50%" :poster="query.video.imgUrl"></video>
      </div>
      <div class="msg">
          <div class="title ellipsis">{{query.tit}}</div>
          <div class="user">
              <div class="left">
                  <img :src="query.user.avatarurl" alt="">
                  <span>{{query.user.nickName}}</span>
              </div>
              <div class="right">
                  {{query.video.viewCount}}次播放
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    computed: {
        query(){
            return JSON.parse(this.$route.params.query)
        }
    },
    data(){
        return {
            show: true
        }
    },
    methods: {
        playAction(){
            this.$refs.vid.play();
        }
    },
    mounted(){
        var vid = this.$refs.vid;
        vid.onplay = ()=>{
            this.show = false;
        };
        vid.onpause = ()=>{
            this.show = true;
        }
    }
}
</script>

<style scoped lang="scss" >
.videoDetail{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #f4f4f4;
    z-index: 999;
    .vd-top{
        width: 100%;
        height: 0.44rem;
        background: #EF4238;
        display: flex;
        justify-content: space-between;
        span{
            // width: 0.5rem;
            padding: 0 0.15rem;
            min-width: 0.5rem;
            height: 0.44rem;
            line-height: 0.44rem;
            font-size: 0.2rem;
            text-align: center;
            color: #fff;
        }
    }
    .vd{
        width: 100%;
        height: 2.11rem;
        position: relative;
        video{
            transform: scale(2);
            transform-origin: left top;
        }
        span{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            width: 0.42rem;
            height: 0.42rem;
            background: #fff;
            border-radius: 50%;
            text-align: center;
            line-height: 0.42rem;
            font-size: 0.2rem;
            color: #000;
            z-index: 9 ;
        }
    }
    .msg{
        width: 100%;
        padding: 0.14rem 0.15rem 0.15rem;
        background: #fff;
        .title{
            font-size: 0.15rem;
            color: #333;
            line-height: 0.22rem;
            height: 0.22rem;
        }
        .user{
            height: 0.25rem;
            margin-top: 0.08rem;
            width: 100%;
            display: flex;
            justify-content: space-between;
            .left{
                font-size: 0.13rem;
                color: #333;
                display: flex;
                align-items: center;
                img{
                    width: 0.25rem;
                    height: 0.25rem;
                    border-radius: 50%;
                    margin-right: 0.1rem;
                }
            }
            .right{
                font-size: 0.12rem;
                color: #999;
                line-height: 0.25rem;
            }
        }
    }
}
</style>