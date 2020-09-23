<template>
  <div class="movie" v-if="loading" >
    <scroll-load 
      class="scroll" 
      @loadMore="loadMore" 
      :inLoadMore="isLoadMore"
      :maxNum="!isMore"
    >
      <div class="hot-wrap" ref="hotwrap" v-html="hotReputation"></div>
      <div class="movie-list">
        <div class="movie-list-item" v-for="item in hotMovieList" :key="item.id" @click="mcAction(item.id)" >
          <div class="image">
            <img :src="item.img" alt="">
          </div>
          <div class="info">
            <div class="content">
              <h3>{{item.nm}} <span v-if="item.version" :class="item.version" ></span></h3>
              <h4 v-if="item.globalReleased">{{ item.sc ? '观众评' : '暂无评分' }} <span>{{ item.sc ? item.sc : '' }}</span> </h4>
              <h4 v-if="!item.globalReleased"><span>{{item.wish}}</span> 人想看</h4>
              <h5>主演：{{item.star}}</h5>
              <h6>{{item.showInfo}}</h6>
            </div>
            <div class="buy">
              <span v-if="item.globalReleased" class="buynow">购票</span>
              <span v-if="!item.globalReleased" class="buybefore">预售</span>
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
  data(){
    return {
      handleLoading:true
    }
  },
  computed: {
    ...mapState({
      hotReputation: state => state.movie.hotReputation,
      hotMovieList: state => state.movie.hotMovieList,
      loading: state => state.movie.isGetTop,
      isLoadMore: state => state.movie.isLoadMore,
      isMore: state => state.movie.isMore
    })
  },
  methods:{
    loadMore(){
      this.$store.dispatch('movie/getMoreMovie');
    },
    mcAction(id){
      this.$router.push({
        name: 'movieCinema',
        params: {
          id: id
        }
      })
    },
  },
  watch: {
    hotReputation(newVal){
      if(newVal){
        this.$nextTick( ()=>{
          var _this = this;
          var hotWrap = this.$refs.hotwrap;
          var items = hotWrap.querySelectorAll('.top-rated-item');
          for(let i = 0; i < items.length; i++){
            items[i].onclick = function(){
              var id = this.getAttribute('data-id');
              _this.$router.push({
                name: 'movieDetail',
                params: {
                  id: id
                }
              })
            }
          }
        } )
      }
      
    }
  },
  created(){
    this.$store.dispatch('movie/getGoodReputation');
    // this.$store.dispatch('movie/getHotMovieList'); //数据获取不到临时!!!!
  }
}
</script>

<style lang="scss" scoped>
.movie{
  overflow: hidden;
  .movie-list{
    width: 100%;
    background: #fff;
    .movie-list-item{
      padding-left: 0.15rem;
      padding-top: 0.12rem;
      display: flex;
      .image{
        width: 0.64rem;
        height: 0.9rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .info{
        width: calc(100% - 0.74rem);
        height: 1.02rem;
        padding-right: 0.14rem;
        margin-left: 0.1rem;
        display: flex;
        border-bottom: 1px solid #eee;
        .content{
          width: calc(100% - 0.47rem);
          padding-right: 0.05rem;
          h3{
            font-size: 0.17rem;
            color: #333;
            line-height: 0.24rem;
            font-weight: bold;
            margin-bottom: 0.07rem;
            display: flex;
            align-items: center;
            span{
              margin-left: 0.05rem;
              width: 0.43rem;
              height: 0.14rem;
              background-size: 100%;
              background-repeat: no-repeat;
              &.v2d.imax{
                background-image: url(data:image/png;base64,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);
              }
              &.v3d.imax{
                background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFYAAAAcCAYAAAD7lUj9AAAAAXNSR0IArs4c6QAABqJJREFUaAXtWmlMVFcUPrMCMjigDCM6CkpRiqDWfW2sodpi2mpImjZN1ajdTJrYP60/2vRXTZp0t2l/dYmJtWqtTdxSBRXXigpYFUU2hWGQdUB2mKXnu/Kmj8dsFIhtnZNMuO++e8+997tn+c4wKmLJ2pk/1+1y7He7yeImtxp9IRkcAnqNuoln5Ljdunf2rZ9VrQKoLqfj4sMG9MCG+YM7yb9stL2zl06UNvTuvWprc7u06VphqSErHfI1xUToKCs9XseKDHsLqz9Xw/2HrDWkwIPAisdidSqVKkP9sEOAZ0f/kwYst9vhjAklqhG60BCwIWBHCIERUqsNpFerVhEHZEocM4qcLjdVNHXQ6fJGcnAbkhJnoCn8ThJ017Z1k7W5k+rbe6TuIf3N5fVcnGWfSooVek6WNVBnr4vmT4ym2Ei9T905pQ0c71y0KCGGEPvkUtPaTQXVLWQM19KSxDHyV1TS0C4+E43hlB4/ut+7HqeLsksaiGGhp6eaSKPihhfxCywW3Z6ZSuNHh/NBnEKJXqumtWnx9N7hIurgvgWTYmgNP3uTQlsLfXOuYsgA77tqIxxIAnZ3QTXVi8sz0+sLE7wtLYD5+my5eJcQEzEA2F/+tNGJknrSMEJp40YLgCVFcYYw+ij7NnXxpXzxQhqNiwqTXtHOy1V0+GYtZc0Y7xNUDPYbY19bmChA/fZ8Ba3/OZ/W8efAtRqyREfQc9PHeRZD4/2jN+mVn67Qxj0FtI1Bx8anm6Po0+fTKCrM7/310zOYB1huR4/T65RDRfe89qMTgJ2/0yTOBi88yZYtFxjUliWTkd3pK76cB75JdP1eKx25VUdJYyPp5ScmyKcMaPsEFqaeym5e0tBGx27XU6/TLdzqaHGtUBIvu0V0wKJxSFQgxfVttCvfSp/klgpQA21iwK6C6ICldfGax9nqlII9nL9jF9aofIfnsxWNYu6GeZMonr0xp3SgDoSZjGQT3axtpYM37onL2HGunPQaFW19MsmvtWINn8AiVm7cW0jvHirCOI/MjDeKdhEvGEjyKpvprr1DhItAYwf73hQZRlNNBjrCbtkX7j0qjrJVOTkmL1bETmlANl+GMVxHsy1GWs5xG/kAxqCUTQsSyMwGtKvASp/lllEdx+V1cyeRhWNvIPEJrHLiZl7k49Wp9MaiBPrteg3BDYMRa0sXjRml55sOeqlg1Ioxqx83Ux3H2rxKu2cOPOv34jqayUnHYozw9EsN7Ke4ro2WTRkrrA7AQrLZK5USzvlk67IkcrDOS1V2vohoykyJUw7z+hz0aeMMepGB1ZwFARLYQjDS3u0QwwxhmmCGD2oMLDKGL+2gLJ6eZje/39VLq1PNXnXBWiESoDhXKueCcxxzEXuVEs1sQtdnFCY/DEQ5L2hgt+eU0CYODV+eKadMtpQXZ/oP3tJCJs6wPbzhpo5eqWvY/uJyVzHlQVgqZxoIOcwgI27OYetSCsJDLntapF5LdzhEgY7hY2TwkCMArlwQYnBeMBLQTXhCPlO0YMQnsKAYby1KpKWT+3O8M8wpmzk5zOPgHkgMeg1NjY0ka0tnoKH/+P2qaXHCosACbnDWBs/OTDGTN3+6XNUs9t7e4yBQMelzoQ/QHEUi/PWajW7VtRJCzgcZ0yiS2c0Onne/zwv9bdonD2phd8pga5jLAIKaSAkCwRx0xHa/y59eitCp6c3Fk8Vm9jFdGymBqyIknK1oolpOLhE6Da1IfhA3lWsiDCCU7Vibzry2f2GBjA+AcS7w9rLGDtpTaBPtV+dYRPjbPD+BLbhMcPNtK5KV6vs9+wQWlc0xNv1n+PY/XJlCp9iFUOWApPPXYoIkyzXhEuzs7iggYO0g3Tg0DvPH3b+Ti3zOcLVhUXBxhASEqVEMrlJAwVBppXFSA3BKQXUJYLHfl2ZZBICo9t5eOsWTeJcnjaULd5voIifL45zsUHn5Ep/AYsJ3eZXCUldOM9GMvtIOYQAuBCuWy7N8ARAQbpS04L+ISVeswcUkua7BtpM53IB6oRQFyN6Ev90XewM43mT2hGhBwU6VNTJfd1MVUzBUlCjZ5bKFvfAWs4rvL1WKcldelcnHqdb8wP+VCSAgxeaocEGqh6v+Vy75X//XjPw8a3/MI78WKw3uYR6HGwxJ8Aj4ZAXBqwiN9IZACFhvqAxDH1Ns1cByYxgUP6oqwD7CtBo7aJ31UQVhJM6N3xa43e5stUqtzQpZ7dAhhqXuv1bz4Acb/GsYUfmFfmI0dGDh/rBU6SdGfwHhesSi+VnXOAAAAABJRU5ErkJggg==);;
              }
            }
          }
          h4{
            line-height: 0.15rem;
            font-size: 0.13rem;
            color: #666;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            span{
              color: #faaf00;
              font-size: 0.15rem;
              font-weight: 700;
            }
          }
          h5{
            margin-top: 0.06rem;
            font-size: 0.13rem;
            line-height: 0.15rem;
            color: #666;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          h6{
            margin-top: 0.06rem;
            font-size: 0.13rem;
            line-height: 0.15rem;
            color: #666;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .buy{
          display: flex;
          align-items: center;
          width: 0.47rem;
          span{
            width: 100%;
            height: 0.27rem;
            line-height: 0.27rem;
            text-align: center;
            font-size: 0.12rem;
            color: #fff;
            border-radius: 0.05rem;
            &.buynow{
              background: #F03D37;
            }
            &.buybefore{
              background: #3C9FE6;
            }
          }
        }
      }
    }
  }
  .scroll{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>

<style lang="scss">
.movie{
  .hot-wrap{
    height: 2rem;
    width: 100%;
    margin-bottom: 0.1rem;
    .top-rated{
      width: 100%;
      height: 100%;
      padding: 0.12rem 0.15rem;
      background: #fff;
      overflow: hidden;
      .title{
        font-size: 0.14rem;
        color: #333;
        margin-bottom: 0.12rem;
      }
      .top-rated-list{
        display: flex;
        overflow: auto;
        .top-rated-item{
          width: 0.85rem;
          margin-right: 0.1rem;
          .poster{
            width: 0.85rem;
            height: 1.15rem;
            margin-bottom: 0.06rem;
            position: relative;
            img{
              width: 100%;
              height: 100%;
            }
            .wish-bg{
              width: 100%;
              height: 0.35rem;
              position: absolute;
              bottom: 0;
              left: 0;
              background: linear-gradient(-180deg,rgba(77,77,77,0),#000);
            }
            .wish,.score{
              position: absolute;
              bottom: 0.02rem;
              left: 0.04rem;
              color: #faaf00;
              font-size: 0.11rem;
              font-weight: 600;
            }
          }
          .name{
            font-size: 0.13rem;
            color: #333;
            margin-bottom: 0.03rem;
            font-weight: bold;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
}
</style>