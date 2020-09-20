<template>
  <div class="cinema">
      <div class="type-tab">
        <div>全城<span class="iconfont iconarrowdown-copy"></span></div>
        <div>品牌<span class="iconfont iconarrowdown-copy"></span></div>
        <div>特色<span class="iconfont iconarrowdown-copy"></span></div>
      </div>
      <scroll-load class="scroll">
        <div class="cinema-list" v-html="cinemaList">

        </div>
      </scroll-load>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  data(){
    return {
      
    }
  },
  computed: {
    ...mapState({
      cinemaList: state => state.cinema.cinemaList
    })
  },
  created(){
    this.$store.dispatch('cinema/getInit');
  }
}
</script>

<style lang="scss">
.cinema-list{
  width: 100%;
  .cinema-list-item{
    width: 100%;
    .item{
      padding: 0.13rem 0.15rem 0.13rem 0;
      margin-left: 0.15rem;
      border-bottom: 1px solid #ccc;
      .title{
        height: 0.23rem;
        line-height: 0.23rem;
        color: #000;
        font-size: 0.16rem;
        .price-block{
          padding: 0.09rem 0 0 0.03rem;
          .price{
            font-size: 0.18rem;
            color: #f03d37;
          }
          .q{
            margin-left: 0.03rem;
            font-size: 0.11rem;
            color: #f03d37;
          }
        }
      }
      .location-block{
        margin-top: 0.06rem;
        font-size: 0.13rem;
        color: #666;
        line-height: 0.19rem;
        display: flex;
        justify-content: space-between;
        .flex{
          width: 3rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .distance{
          margin-left: 0.05rem;
        }
      }
      .label-block{
        height: 0.17rem;
        line-height: 0.17rem;
        margin: 0.04rem 0;
        display: flex;
        .allowRefund{
          color: #589daf;
          border: 1px solid #589daf;
          padding: 0 0.03rem;
          line-height: 0.15rem;
          border-radius: 0.02rem;
        }
        .endorse,.hallType{
          color: #589daf;
          border: 1px solid #589daf;
          padding: 0 0.03rem;
          line-height: 0.15rem;
          border-radius: 0.02rem;
          margin-left: 0.05rem;
        }
        .snack,.vipTag{
          color: #f90;
          border: 1px solid #f90;
          padding: 0 0.03rem;
          line-height: 0.15rem;
          border-radius: 0.02rem;
          margin-left: 0.05rem;
        }
      }
      .discount-block{
        overflow: hidden;
        >div{
          margin-bottom: 0.04rem;
          display: flex;
          height: 0.21rem;
        }
        .discount-label{
          width: 0.15rem;
          height: 0.14rem;
          margin-top: 0.04rem;
          margin-right: 0.05rem;
        }
        .discount-label-text{
          font-size: 0.11rem;
          line-height: 0.21rem;
          color: #999;
        }
      }
    }
  }
}
</style>
<style scoped lang="scss" >
.cinema{
  .type-tab{
    width: 100%;
    height: 0.4rem;
    border-bottom: 1px solid #ccc;
    display: flex;
    background: #fff;
    div{
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.13rem;
      color: #666;
      .iconfont{
        margin-left: 0.04rem;
      }
      &:nth-of-type(2){
        position: relative;
        &::before{
          content: '';
          position: absolute;
          width: 1px;
          height: 50%;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          background: #ccc;
        }
        &::after{
          content: '';
          position: absolute;
          width: 1px;
          height: 50%;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
          background: #ccc;
        }

      }
    }
  }
  .scroll{
    background: #fff;
    position: absolute;
    top: 0.4rem;
    bottom: 0;
    width: 100%;
    overflow: hidden;
  }
}
</style>