<template>
  <div class="page" id="home">
    <div class="home-nav" >
      <div class="area" @click="$router.push('city')" >
        <span>{{chooseCity.nm}}</span>
        <span class="iconfont iconarrowdown-copy"></span>
      </div>
      <div class="mode">
        <span 
          v-for="item in children" 
          :key="item.path"
          :class="{active: childRoute == item.path}"
          @click="routerChildAction(item.path)"
          >{{item.text}}</span>
      </div>
      <div class="search">
        <span class="iconfont iconsearch"></span>
      </div>
    </div>

    <!-- 需要缓存的路由 -->
    <keep-alive>
      <router-view 
        @pushMovieDetail="pushMovieAction" 
        @pushMovieCinema="pushMcAction"
        @pushCinemaDetail="pushCdAction"
        @pushChooseSeats="pushCSAction"
        class="subpage" 
      />
    </keep-alive>

    <!-- 不能缓存的路由 -->
    <router-view 
        @pushMovieDetail="pushMovieAction" 
        @pushMovieCinema="pushMcAction"
        @pushCinemaDetail="pushCdAction"
        @pushChooseSeats="pushCSAction"
        class="subpage" 
        name="noCatch"
      />
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  data(){
    return {
      children: [
        {
          path:'movie',
          text:'热映'
        },
        {
          path:'cinema',
          text:'影院'
        },
        {
          path:'willplay',
          text:'待映'
        },
        {
          path:'classic',
          text:'经典电影'
        }
      ],
      childRoute: 'movie'
    }
  },
  computed:{
    ...mapState({
      chooseCity: state => state.chooseCity
    })
  },
  methods: {
    routerChildAction(path){
      var str = path + '\/?';
      var reg = new RegExp(str,'i');
      if(reg.test(this.$route.path)){
        return;
      };
      this.$router.push(path);
      this.childRoute = path;
    },
    pushMovieAction(id){
      this.$router.push({
        name: 'movieDetail',
        params: {
          id
        }
      })
    },
    pushMcAction(id){
      this.$router.push({
        name: 'movieCinema',
        params: {
          id
        }
      })
    },
    pushCdAction(id){
      this.$router.push({
        name: 'cinemaDetail',
        params: {
          id
        }
      })
    },
    pushCSAction(obj){
      var no = obj.no;
      var img = obj.img;
      this.$router.push({
        name: 'chooseSeats',
        params: {
          query: JSON.stringify(obj)
        }
      })
    }
  },
  watch: {
    $route: {
      handler(newVal){
        this.childRoute = newVal.name;
      },
      immediate: true
    }
  },
  created(){
    var userlist = localStorage.getItem('userList');
    if(!userlist){
      var arr = [
        {
          name: 'xiaowang',
          psd: '123456',
        },
        {
          name: 'xiaohong',
          psd: '123456'
        }
      ];
      localStorage.setItem('userList' , JSON.stringify(arr)) ;
    };
  }
}
</script>

<style scoped lang="scss" >
#home{
  .home-nav{
    position: absolute;
    top: 0;
    left: 0;
    height: 0.45rem;
    width: 100%;
    background: #fff;
    z-index: 4;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    justify-content: space-between;
    .area{
      width: 0.62rem;
      padding-left: 0.15rem;
      height: 100%;
      display: flex;
      align-items: center;
      span{
        font-size: 0.15rem;
        color: #666;
      }
      .iconfont{
        margin-left: 0.05rem;
        font-size: 0.08rem;
      }
    }
    .mode{
      height: 0.44rem;
      line-height: 0.44rem;
      display: flex;
      justify-content: space-around;
      span{
        font-size: 0.15rem;
        font-weight: 700;
        color: #666;
        // padding: 0 0.05rem;
        width: 0.4rem;
        margin:  0 0.05rem;
        text-align: center;
        position: relative;
        &.active{
          color: #333;
          font-size: 0.17rem;
          &::after{
            content: '';
            position: absolute;
            bottom: 0.015rem;
            width: 50%;
            height: 0.03rem;
            background: #F03D37;
            left: 50%;
            transform: translateX(-50%);
          }
        }
        &:nth-child(4){
          width: 0.8rem;
        }
      }
    }
    .search{
      width: 0.45rem;
      padding-right: 0.1rem;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      span.iconfont{
        font-size: 0.2rem;
        color: #F03D37;
        font-weight: 700;
      }
    }
  }
}
.subpage{
  position: absolute;
  top: 0.45rem;
  bottom: 0;
  width: 100%;
  background: #F5F5F5;
}
</style>