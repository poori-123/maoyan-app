<template>
  <div class="willplay" v-if="loading">
    <scroll-load 
      class="scroll" 
      @loadMore="loadMore" 
      :inLoadMore="isLoadMore"
      :maxNum="isComingMax"
    >
      <div class="most-expected">
        <h2>近期最受期待</h2>
        <scroll-load-x class="scroll" @loadMore="getMoreExpected" :maxNum="isExpectedMax" >
          <div class="expected-list">
            <div class="list-item" v-for="item in mostExpectedList" :key="item.id" >
              <div class="imgbox">
                <img :src="item.img" alt="">
                <div class="mask"></div>
                <span class="wish">{{item.wish}}想看</span>
                <div class="love">
                  <span class="iconfont iconguanzhu"></span>
                </div>
              </div>
              <h3>{{item.nm}}</h3>
              <h4>{{item.comingTitle.split(' ')[0]}}</h4>
            </div>
          </div>
        </scroll-load-x>
      </div>
      <div class="coming-list">
          <div class="date" v-for="item in comingMovieList" :key="item.date">
            <h3>{{item.date}}</h3>
            <ul class="date-list">
              <li v-for="mv in item.list" :key="mv.id">
                <div class="image">
                  <img :src="mv.img" alt="">
                </div>
                <div class="info">
                  <div class="content">
                    <h3>{{mv.nm}} <span v-if="item.version" :class="mv.version" ></span></h3>
                    <h4><span>{{mv.wish}}</span> 人想看</h4>
                    <h5>主演：{{mv.star}}</h5>
                    <h6>{{mv.rt}}</h6>
                  </div>
                  <div class="buy">
                    <span v-if="mv.showst == 1" class="buynow">想看</span>
                    <span v-if="mv.showst == 4" class="buybefore">预售</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
      </div>
    </scroll-load>
  </div>
</template>

<script>
import ScrollLoadX from '../../components/common/scroll_load_x';
import { mapState, mapGetters } from 'vuex';
export default {
  components: {
    ScrollLoadX,
  },
  data(){
    return {
      expectedPage: 0,
      handleLoading:true
    }
  },
  computed: {
    ...mapState({
      mostExpectedList: state => state.willplay.mostExpectedList,
      isExpectedMax: state => state.willplay.isExpectedMax,
      comingMovieList: state => state.willplay.comingMovieList,
      isLoadMore: state => state.willplay.isLoadMore,
      isComingMax: state => state.willplay.isComingMax,
    }),
    ...mapGetters({
      loading: 'willplay/isInit'
    })
  },
  methods: {
    getMoreExpected(){
      this.expectedPage++;
      this.$store.dispatch('willplay/getMostExpectedList',{ offset: this.expectedPage*10 });
    },
    loadMore(){
      this.$store.dispatch('willplay/getMoreMovie');
    }
  },
  created(){
    this.$store.dispatch('willplay/getMostExpectedList');
    this.$store.dispatch('willplay/getComingMovieList');
  }
}
</script>

<style lang="scss" scoped>
.willplay{
  .scroll{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .most-expected{
    width: 100%;
    height: 2.16rem;
    margin-bottom: 0.1rem;
    padding: 0.12rem 0.15rem;
    background: #fff;
    h2{
      height: 0.19rem;
      line-height: 0.19rem;
      font-size: 0.14rem;
      color: #333;
      margin-bottom: 0.12rem;
    }
    .scroll{
      width: 100%;
      overflow: hidden;
    }
    .expected-list{
      display: flex;
      width: max-content;
      height: 1.6rem;
      .list-item{
        width: 0.85rem;
        margin-right: 0.1rem;
        .imgbox{
          width: 0.85rem;
          height: 1.15rem;
          margin-bottom: 0.06rem;
          position: relative;
          overflow: hidden;
          img{
            width: 100%;
            height: 100%;
          }
          .mask{
            position: absolute;
            bottom: 0;
            height: 0.3rem;
            left: 0;
            width: 100%;
            background: linear-gradient(-180deg,rgba(77,77,77,0),#000);
          }
          .love{
            width: 0.28rem;
            height: 0.28rem;
            position: absolute;
            top: 0;
            left: 0;
            background: rgba(61,63,71,.6);
            border-bottom-right-radius: 10px;
            text-align: center;
            line-height: 0.28rem;
            .iconfont{
              font-size: 0.11rem;
              color: #ddd;
            }
          }
          .wish{
            position: absolute;
            color: #faaf00;
            width: 100%;
            overflow: hidden;
            font-size: 0.12rem;
            font-weight: 600;
            bottom: 0.02rem;
            left: 0.04rem;
          }
        }
        h3{
          font-size: 0.13rem;
          line-height: 0.17rem;
          color: #222;
          margin-bottom: 0.03rem;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: bold;
        }
        h4{
          font-size: 0.12rem;
          line-height: 0.16rem;
          color: #999;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: bold;
        }
      }
    }
  }
  .coming-list{
    width: 100%;
    background: #fff;
    .date{
      width: 100%;
      >h3{
        width: 100%;
        padding: 0.12rem 0.15rem 0;
        font-size: 0.14rem;
        color: #333;
        line-height: 0.19rem;
      }
      .date-list{
        li{
          width: 100%;
          padding-left: 0.15rem;
          height: 1.14rem;
          display: flex;
          overflow: hidden;
          .image{
            width: 0.64rem;
            height: 0.9rem;
            margin-top: 0.12rem;
            margin-right: 0.1rem;
            img{
              width: 100%;
              height: 100%;
            }
          }
          .info{
            width: calc(100% - 0.74rem);
            height: 100%;
            padding: 0.12rem 0.14rem 0.12rem 0;
            display: flex;
            border-bottom: 1px solid #ccc;
            .content{
              width: calc(100% - 0.47rem);
              height: 100%;
              h3{
                line-height: 0.24rem;
                height: 0.24rem;
                margin-bottom: 0.07rem;
                color: #333;
                font-size: 0.17rem;
                font-weight: 700;
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              h4{
                height: 0.2rem;
                font-size: 0.13rem;
                color: #666;
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                span{
                  color: #faaf00;
                  font-size: 0.15rem;
                  font-weight: 600;
                }
              }
              h5,h6{
                font-size: 0.13rem;
                line-height: 0.15rem;
                margin-top: 0.06rem;
                color: #666;
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
            .buy{
              width: 0.47rem;
              height: 100%;
              display: flex;
              align-items: center;
              span{
                width: 100%;
                height: 0.27rem;
                line-height: 0.27rem;
                text-align: center;
                border-radius: 0.04rem;
                font-size: 0.12rem;
                color: #fff;
                &.buynow{
                  background: #faaf00;
                }
                &.buybefore{
                  background: #3C9FE6;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>