<template>
  <div class="page" id="smallvideo">
    <scroll-load class="scroll">
      <ul>
        <li v-for="item in videoList" :key="item.id" :style="{'background-image':'url(' +item.images[0].url+')'}" >
          <h3>{{item.title}}</h3>
          <div class="user">
            <div class="left">
              <img :src="item.user.avatarurl" alt="">
              <span class="ellipsis">{{item.user.nickName}}</span>
            </div>
            <div class="right">
              <span class="iconfont icondianzan">{{item.upCount}}</span>
            </div>
          </div>
        </li>
      </ul>
    </scroll-load>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  computed: {
    ...mapState({
      videoList: state => state.smallVideo.videoList
    })
  },
  created(){
    this.$store.dispatch('smallVideo/getInit');
  }
}
</script>

<style lang="scss" scoped>
#smallvideo{
  .scroll{
    width: 100%;
    height: 100%;
    overflow: hidden;
    ul{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li{
        width: 49.5%;
        height: 3rem;
        margin-bottom: 0.02rem;
        background-size: cover;
        background-repeat: no-repeat;
        position: relative;
        h3{
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          font-size: 0.15rem;
          line-height: 0.21rem;
          position: absolute;
          bottom: 0.41rem;
          color: #fff;
          padding: 0 0.08rem;
        }
        .user{
          height: 0.215rem;
          width: 100%;
          position: absolute;
          bottom: 0.14rem;
          font-size: 0.13rem;
          color: #fff;
          display: flex;
          padding: 0 0.08rem;
          justify-content: space-between;
          align-items: center;
          .left{
            display: flex;
            align-items: center;
            img{
              width: 0.215rem;
              height: 0.215rem;
              border-radius: 50%;
            }
            span{
              margin: 0 0.05rem;
              width: 0.8rem;
            }
          }
          .right{
            .iconfont{
              line-height: 0.215rem;
              &::before{
                margin-right: 0.05rem;
              }
              font-size: 0.14rem;
            }
          }
        }
      }
    }
  }
}
</style>