<template>
  <div class="classic" v-if="loading" >
    <scroll-load 
      class="scroll" 
      @loadMore="loadMore" 
    >
      <div class="classic-movie-list" v-html="classicMovieList"></div>
    </scroll-load>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  data(){
    return {
      handleLoading:true,
      offset: 0
    }
  },
  computed: {
    ...mapState({
      classicMovieList: state => state.classic.classicMovieList,
      isLoadMore: state => state.classic.isLoadMore,
      loading: state => state.classic.isFirstLoad
    })
  },
  methods: {
    loadMore(){
      this.offset += 10;
      this.$store.dispatch('classic/getClassicMovie',{ offset: this.offset });
    }
  },
  created(){
    this.$store.dispatch('classic/getClassicMovie');
  }
}
</script>

<style lang="scss">
.classic{
  .scroll{
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #fff;
  }
  .classic-movie-list{
    padding-top: 0.15rem;
    padding-left: 0.2rem;
    .movie-list-item{
      margin-bottom: 0.2rem;
      width: 100%;
      height: 0.94rem;
      .classic-movie{
        display: flex;
      }
      .avatar{
        width: 0.66rem;
        height: 0.94rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .movie-info{
        margin-left: 0.1rem;
        width: calc(100% - 1.36rem);
        height: 100%;
        .title{
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 0.17rem;
          color: #333;
          line-height: 0.24rem;
          font-weight: 700;
          margin-bottom: 0.04rem;
        }
        .english-title{
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 0.13rem;
          color: #666;
          line-height: 0.18rem;
          margin-bottom: 0.04rem;
        }
        .actors{
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 0.13rem;
          color: #666;
          line-height: 0.18rem;
          margin-bottom: 0.04rem;
        }
        .show-info{
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 0.13rem;
          color: #666;
          line-height: 0.18rem;
          margin-bottom: 0.04rem;
        }
      }
      .movie-score{
        width: 0.6rem;
        height: 0.17rem;
        font-size: 0.12rem;
        color: #999;
        line-height: 0.17rem;
        .score{
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: center;
          .grade{
            font-size: 0.15rem;
            color: #faaf00;
          }
        }
      }
    }
  }
}
</style>