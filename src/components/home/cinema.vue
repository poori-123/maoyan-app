<template>
  <div class="cinema">
      <cinema-type/>
      <scroll-load class="scroll" v-if="loading" @loadMore="getMore" :inLoadMore="isLoadMore">
        <div class="cinema-list" v-html="cinemaList">

        </div>
      </scroll-load>
  </div>
</template>

<script>
import CinemaType from './cinemaType';
import {mapState} from 'vuex';
export default {
  components: {
    CinemaType
  },
  data(){
    return {
      handleLoading: true,
      offset: 0
    }
  },
  computed: {
    ...mapState({
      cinemaList: state => state.cinema.cinemaList,
      chooseCity: state => state.chooseCity,
      loading: state => state.cinema.isinit,
      isLoadMore: state => state.cinema.isLoadMore
    })
  },
  methods:{
    getMore(){
      this.offset += 20;
      this.$store.dispatch('cinema/getMore',{offset: this.offset});
    }
  },
  watch:{
    chooseCity(newVal){
      this.$store.dispatch('cinema/getInit');
      this.offset = 0;
    }
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
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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
        flex-wrap: wrap;
        overflow: hidden;
        div{
          margin-left: 0.05rem;
          height: 0.17rem;
          padding: 0 0.03rem;
          line-height: 0.15rem;
          border-radius: 0.02rem;
          &:nth-child(1){
            margin-left: 0;
          }
        }
        .allowRefund{
          color: #589daf;
          border: 1px solid #589daf;
        }
        .endorse,.hallType{
          color: #589daf;
          border: 1px solid #589daf;
        }
        .snack,.vipTag{
          color: #f90;
          border: 1px solid #f90;
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
          margin-top: 0.03rem;
          margin-right: 0.05rem;
          img{
            width: 100%;
            height: 100%;
          }
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
  .cinema-type{
    width: 100%;
    height: 0.4rem;
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