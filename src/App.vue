<template>
  <div id="app">
    <header>
      <span></span>
      <h3>猫眼电影</h3>
      <span class="iconfont iconliebiao" @click.stop="showHeaderMenuAction" ></span>
      <div class="header-menu" v-show="showHeaderMenu">
        <span @click.stop="routerChangeAction('/home')" >首页</span>
        <span @click.stop="routerChangeAction('/rank')" >榜单</span>
        <span @click.stop="routerChangeAction('/hot')" >热点</span>
        <span @click.stop="routerChangeAction('/shop')" >商城</span>
      </div>
    </header>
    <router-view/>
    <footer>
      <div 
        v-for="item in routerIcon" 
        :key="item.icon"
        @click="routerChangeAction(item.path)"
        :class="{ active: nowRoute === item.path }"
      >
        <span class="iconfont" :class="item.icon"></span>
        <span>{{item.text}}</span>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  data(){
    return {
      routerIcon: [
        {
          icon: 'icondianying',
          text: '电影/影院',
          path: '/home'
        },
        {
          icon: 'iconshipin',
          text: '视频',
          path: '/video'
        },
        {
          icon: 'iconshipinbofangyingpian',
          text: '小视频',
          path: '/smallvideo'
        },
        {
          icon: 'iconbiaoqiankuozhan_wode-140',
          text: '我的',
          path: '/mycenter'
        }
      ],
      nowRoute: '/home',
      showHeaderMenu: false
    }
  },
  methods: {
    routerChangeAction(path){
      var str = '^(' + path + '\/?)';
      var reg = new RegExp(str,'i');
      if(reg.test(this.$route.path)){
        return;
      };
      this.nowRoute = path;
      this.showHeaderMenu = false;
      this.$router.push(path);
    },
    showHeaderMenuAction(){
      this.showHeaderMenu = !this.showHeaderMenu;
    }
  }
}
</script>

<style lang="scss">
html,body,#app{
  width: 100%;
  height: 100%;
  position: relative;
}
html{
  touch-action: none;
}
*{box-sizing: border-box;}
#app{
  position: relative;
  header{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 0.5rem;
    background: #E54847;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h3{
      font-size: 0.18rem;
      line-height: 0.5rem;
      color: #fff;
    }
    span{
      width: 0.5rem;
      height: 0.5rem;
      font-size: 0.2rem;
      line-height: 0.5rem;
      color: #efefef;
      text-align: center;
    }
    .header-menu{
      position: absolute;
      z-index: 19;
      top: 0.46rem;
      right: 0.12rem;
      background: #fff;
      box-shadow: 0 3px 9px 0 rgba(0,0,0,.1);
      span{
        display: block;
        width: 1.1rem;
        height: 0.46rem;
        line-height: 0.46rem;
        border-bottom: 1px solid #ddd;
        text-align: center;
        font-size: 0.15rem;
        color: #333;
        &:nth-last-child(1){
          border-bottom: none;
        }
      }
    }
  }
  .page{
    position: absolute;
    top: 0.5rem;
    width: 100%;
    bottom: 0.49rem;
  }
  .bpage{
    position: absolute;
    top: 0.5rem;
    bottom: 0;
    width: 100%;
    z-index: 9;
  }
  
  footer{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.49rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-top: 1px solid #D8D8D8;
    div{
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      span{
        font-size: 0.12rem;
        color: #696969;
        &.iconfont{
          font-size: 0.24rem;
        }
      }
      &.active{
        span{
          color: #F03D37;
        }
      }
    }
  }
}
</style>
