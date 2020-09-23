<template>
  <div class="page" id="video">
    <app-scroll :scrollX="true" class="scroll">
      <div class="tab">
        <span 
          :class="{active: tabId === item.id}" 
          v-for="item in tabList" 
          :key="item.id"
          @click="changeAction(item.id)"
        >{{item.name}}</span>
      </div>
    </app-scroll>
    <scroll-load 
      class="scroll-list"
      v-if="loading" 
      :inLoadMore="isloadMore"
      :maxNum="isMax"
      @loadMore="loadMore"
      :reload="reload" 
    >
      <div class="video-list">
        <div class="item" v-for="item in videoList" :key="item.id" @click="detail(item)" >
          <h1>{{item.title}}</h1>
          <div class="imgbox">
            <img :src="item.images[0].url" alt="">
            <div class="pause"><span class="iconfont icontriangle-right"></span></div>
            <div class="showCount">
              <span class="iconfont icontriangle-right"></span>
              <span>{{item.video.viewCount}}</span>
            </div>
            <div class="dur">{{item.video.dur | timeF}}</div>
          </div>
          <div class="info">
            <div class="user">
              <div class="img"><img :src="item.user.avatarurl" alt=""></div>
              <div class="nickname">{{item.user.nickName}}</div>
            </div>
            <div class="icon">
              <div class="up">
                <span class="iconfont icondianzan"></span>
                <i>{{item.upCount}}</i>
              </div>
              <div class="msg">
                <span class="iconfont iconxinxi"></span>
                <i>{{item.commentCount}}</i>
              </div>
              <div class="share"><span class="iconfont iconicon--"></span></div>
            </div>
          </div>
        </div>
      </div>
    </scroll-load>
    <router-view/>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  filters: {
    timeF: (ss)=>{
      if(ss < 60){
        return '00:' + ss
      }else{
        var mm = parseInt(ss/60);
        ss = ss%60;
        if(mm < 10){
          mm = '0' + mm;
        }
        if(ss < 10){
          ss = '0' + ss;
        }
        return mm + ':' + ss
      }
    }
  },
  data(){
    return {
      tabList: [
        {
          name: '预告片',
          id: '1067226'
        },
        {
          name: '新片看点',
          id: '1331498'
        },
        {
          name: '每周必看',
          id: '1560874'
        },
        {
          name: '说电影',
          id: '1074953'
        },
        {
          name: '好片推荐',
          id: '1794454'
        },
        {
          name: '犯罪',
          id: '1150199'
        },
        {
          name: '奇幻',
          id: '1466543'
        },
        {
          name: '科幻',
          id: '1614507'
        },
        {
          name: '爱情',
          id: '1731520'
        },
        {
          name: '追剧',
          id: '1871222'
        },
        {
          name: '追星',
          id: '1480140'
        },
      ],
      tabId: '1067226',
      handleLoading:true,
      offset: 0,
      reload: 0
    }
  },
  computed: {
    ...mapState({
      videoList: state => state.video.videoList,
      loading: state => state.video.isload,
      isloadMore: state => state.video.isloadMore,
      isMax: state => state.video.isMax
    })
  },
  methods: {
    changeAction(id){
      this.offset = 0;
      this.tabId = id;
      this.reload ++;
      this.$store.dispatch('video/getVideo',this.tabId);
    },
    loadMore(){
      this.offset += 10;
      this.$store.dispatch('video/loadMore',{
        feedChannelId: this.tabId,
        offset: this.offset
      });
    },
    detail(item){
      this.$router.push({
        name: 'videoDetail',
        params: {
          query: JSON.stringify({
            tit: item.title,
            user: item.user,
            video: item.video
          })
        }
      })
    }
  },
  created(){
    this.$store.dispatch('video/getVideo',this.tabId);
  }
}
</script>

<style lang="scss">
#video{
  .scroll-wrap{
    width:max-content;
  }
  .scroll-list .scroll-wrap{
    width: 100%;
  }
}
</style>
<style scoped lang="scss">
#video{
  background: #f4f4f4;
  .scroll{
    width: 100%;
    height: 0.46rem;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    .tab{
      display: flex;
      background: #fff;
      width: max-content;
      span{
        margin: 0 0.125rem;
        height: 100%;
        line-height: 0.46rem;
        font-size: 0.15rem;
        color: #333;
        position: relative;
        &.active{
          &::after{
            content: '';
            position: absolute;
            bottom: 0.01rem;
            width: 0.2rem;
            height: 0.03rem;
            background: #f03d37;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      }
    }
  }
  .scroll-list{
    position: absolute;
    top: 0.46rem;
    bottom: 0;
    width: 100%;
    left: 0;
    .video-list{
      width: 100%;
      .item{
        position: relative;
        width: 100%;
        margin-bottom: 0.06rem;
        background: #fff;
        h1{
          position: absolute;
          top: 0;
          left: 0;
          font-size: 0.17rem;
          line-height: 0.24rem;
          color: #fff;
          margin: 0.09rem 0.15rem 0.19rem;
          word-break: break-all;
          overflow: hidden;
          z-index: 1;
        }
        .imgbox{
          position: relative;
          width: 100%;
          height: 2.11rem;
          img{
            width: 100%;
            height: 100%;
          }
          .pause{
            position: absolute;
            width: 0.58rem;
            height: 0.58rem;
            border-radius: 50%;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            background: rgb(0, 0, 0);
            opacity: 0.4;
            text-align: center;
            line-height: 0.58rem;
            .iconfont{
              font-size: 0.22rem;
              color: #fff;
            }
          }
          .showCount{
            height: 0.3rem;
            position: absolute;
            bottom: 0;
            left: 0.15rem;
            font-size: 0.12rem;
            color: #fff;
            line-height: 0.3rem;
            display: flex;
            align-items: center;
            span{
              margin-right: 0.05rem;
            }
          }
          .dur{
            height: 0.3rem;
            line-height: 0.3rem;
            font-size: 0.12rem;
            color: #fff;
            position: absolute;
            bottom: 0;
            right: 0.1rem;
          }
        }
        .info{
          position: relative;
          width: 100%;
          height: 0.46rem;
          padding-left: 0.15rem;
          display: flex;
          justify-content: space-between;
          .user{
            display: flex;
            align-items: center;
            .img{
              width: 0.22rem;
              height: 0.22rem;
              border-radius: 50%;
              overflow: hidden;
              img{
                width: 100%;
                height: 100%;
              }
            }
            .nickname{
              margin-left: 0.08rem;
              font-size: 0.14rem;
              color: #666;
            }
          }
          .icon{
            display: flex;
            align-items: center;
            font-size: 0.12rem;
            color: #333;
            margin-right: 0.15rem;
            .iconfont{
              color: #999;
              margin-right: 0.03rem;
              font-size: 0.2rem;
            }
            .up,.msg{
              display: flex;
              align-items: center;
              margin-right: 0.2rem;
            }
          
          }
        }
      }
    }
  }
  
}
</style>