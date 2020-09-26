<template>
  <div class="mv-cinema">
    <div class="tit">
      <span class="iconfont iconleft" @click="$router.back()" ></span>
      <h3>{{movieDetail.nm}}</h3>
    </div>
    <div class="movieDetail">
      <div class="filter"></div>
      <div class="mask" :style="{'background-image': 'url(' + movieDetail.bgimg + ')' }" ></div>
      <div class="content">
        <div class="img-box">
          <img :src="movieDetail.img" alt="">
        </div>
        <div class="info">
          <h2 class="ellipsis">{{movieDetail.nm}}</h2>
          <h3 class="ellipsis">{{movieDetail.enm}}</h3>
          <h4 class="ellipsis" v-if="movieDetail.globalReleased">
            {{movieDetail.sc}}
            <i>({{movieDetail.snum | peop }}人评)</i>
          </h4>
          <h4 class="ellipsis" v-if="!movieDetail.globalReleased" style="font-size: 0.15rem" >
            {{movieDetail.wish}}人想看
          </h4>
          <h5 class="ellipsis">{{movieDetail.cat}}
            <img :src="imax" alt="" v-if="movieDetail.version == 'v2d imax'" >
          </h5>
          <h6 class="ellipsis">{{movieDetail.src}}/{{movieDetail.dur}}分钟</h6>
          <p class="ellipsis">{{movieDetail.pubDesc}}</p>
        </div>
        <div class="btn"><span @click="pushAction" class="iconfont iconarrow"></span></div>
      </div>
      
    </div>
    <div class="dates">
      <app-scroll class="scroll" :scrollX="true" >
        <ul>
          <li 
            v-for="item in dates" 
            :key="item.date" 
            :class="{active: item.date === date }" 
            @click="chooseDate(item.date)"
          >{{item.date | dateFil }}</li>
        </ul>
      </app-scroll>
    </div>
    <cinema-type :cinemaType="filter" @choosed="choosedAction" />
    <scroll-load class="scroll-load" >
      <div class="cinemas">
        <div class="cinemas-item" v-for="item in cinemaList" :key="item.id" @click="$emit('pushCinemaDetail',item.id)" >
          <h2 class="ellipsis">{{item.nm}}
            <span>{{item.sellPrice}}<i>元起</i></span>
          </h2>
          <h3>
            <span class="ellipsis">{{item.addr}}</span>
            <i>{{item.distance}}</i>
          </h3>
          <h4>
            <span class="allowRefund" v-if="item.tag.allowRefund">退</span>
            <span class="endorse" v-if="item.tag.endorse">改签</span>
            <span class="snack" v-if="item.tag.sell">小吃</span>
            <span class="vipTag" v-if="item.tag.vipTag">{{item.tag.vipTag}}</span>
            <span class="hallType" v-for="ha in item.tag.hallType">{{ha}}</span>
          </h4>
          <h5 v-if="item.promotion.cardPromotionTag" class="ellipsis">
            <img :src="cardImg" alt="">{{item.promotion.cardPromotionTag}}
          </h5>
          <h6 class="ellipsis">近期场次：{{item.showTimes}}</h6>
        </div>
      </div>
    </scroll-load>
    
  </div>
</template>

<script>
import {mapState} from 'vuex';
import imax from '../../assets/imax.png';
import cinemaType from './cinemaType';
export default {
  filters: {
    peop: (num) =>{
      if(num>=10000){
        return parseInt(num/1000)/10 + '万';
      }else{
        return num
      }
    },
    dateFil: (str) => {
      var reg = /(\d+)-(\d+)-(\d+)/g;
      reg.test(str);
      var date = new Date();
      var d = date.getDate();
      if( RegExp.$3 == d){
        return '今天' + RegExp.$2 + '月' + RegExp.$3 + '日';
      }else if( RegExp.$3 == d+1 ){
        return '明天' + RegExp.$2 + '月' + RegExp.$3 + '日';
      }else if( RegExp.$3 == d+2 ){
        return '后天' + RegExp.$2 + '月' + RegExp.$3 + '日';
      }else{
        var d2 = new Date(str);
        var n = d2.getDay();
        var arr = ['日','一','二','三','四','五','六',];
        return '周'+ arr[n] + RegExp.$2 + '月' + RegExp.$3 + '日';
      }
      
    }
  },
  components: {
    cinemaType
  },
  data(){
    return {
      imax,
      date: '',
      cardImg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAeCAYAAABNChwpAAAAAXNSR0IArs4c6QAAAgFJREFUSA3Nlz1LA0EQhmf3kouFEQwi+FEYQ+xEsImFoCDoL/CLaKd/QbC0sbCzFVuxsRS1jEVAsUqrIILRQAhaBGKMuawzwpGAm83mNhddCHfZnd3n3Z2ZuxsG2JI3YtQpVw6AiTkhYJj6/GqMwSsIdm312DsnMyzLCF79rGRAiIhfUOm6jL0FQvZU4Gfn0GU4KcINE5vjsc9LFXajE9kcfT7UDZaMQWwuG9Dpi/YyiIWZjqnSxrOAtWgANsYDysV1Bj0L0Flcx8ZoC1F0wf50UMo5fqjCY1FIxxo7jQSUHWgK+ag2YprfGwnIlQTQTk3a/46B2UEOIUu+v0gIIMgZLLTIZHJTOl+TL4K9ShckMc36Q+pc356QB6FLLJQFCqi4f39d2WoKLTy03ckg2OjAvcyXh9n1KX8eA0YC4n0MtuLoJru+o3bvjAS8o2vpfXCYsGEzZkFYHQ5SbcoglM5o6KQAoxhIDHBYiVqYERZcZB04f3aghNGv04wEuIDbQg3u8Lc4YsHymAVLeD17cuDypbWKjgggIZTpVwhM5x1YxzdlpaaXXB0T4J5GEbPy6F7/8WwUhC7U5OpZgIPfU5qnrNTn+UmoXLWNQc8n0AZDacqxUskpLXwcJDbHMinlI0O9NLI51WiAZZLa0odRZBKbU4FINRoDdtoNdxCDWMQk9jePWpE8hVOLbwAAAABJRU5ErkJggg==',
      query: {
        districtId: -1,
        areaId: -1,
        lineId: -1,
        stationId: -1,
        brandId: -1,
        serviceId: -1,
        hallType: -1
      },
    }
  },
  computed: {
    ...mapState({
      movieDetail: state => state.movieCinema.movieDetail,
      filter: state => state.movieCinema.filter,
      cinemaList: state => state.movieCinema.cinemaList,
      dates: state => state.movieCinema.dates,
    })
  },
  methods: {
    chooseDate(str){
      this.date = str;
      var id = this.$route.params.id;
      this.$store.dispatch('movieCinema/chooseCinema',{
        id,
        date: str,
        query: this.query
      })
    },
    choosedAction(obj){
      this.query = obj;
      this.$store.dispatch('movieCinema/chooseCinema',{
        id: this.$route.params.id,
        date: this.date,
        query: this.query
      })
    },
    pushAction(){
      this.$emit('pushMovieDetail',this.movieDetail.id)
    }
  },
  created(){
    var id = this.$route.params.id;
    this.$store.dispatch('movieCinema/initMovie',id);
  },
  watch: {
    movieDetail(newVal){
      var id = this.$route.params.id;
      if(newVal.globalReleased){
        var date = new Date();
        var y = date.getFullYear();
        var m = date.getMonth()+1;
        var d = date.getDate();
        if( m < 10 ){
            m = '0' + m;
        }
        if( d < 10 ){
            d = '0' + d;
        }
        var datestr = y + '-' + m + '-' + d;
        this.date = datestr;
        this.$store.dispatch('movieCinema/initCinema',{
          id,
          date: this.date,
          query: this.query
        });
      }else{
        var date = newVal.rt;
        this.date = date;
        this.$store.dispatch('movieCinema/initCinema',{
          id,
          date,
          query: this.query
        });
      }
    },
    dates(newVal){
      this.date = newVal[0].date;
    }
  }
}
</script>

<style lang="scss">
.mv-cinema{
  .dates{
    .scroll-wrap{
      width: max-content;
    }
  }
}
</style>
<style scoped lang="scss" >
.mv-cinema{
  background: #fff;
  position: fixed;
  top: 0.5rem;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 999;
  .tit{
    position: absolute;
    top: -0.5rem;
    left: 0;
    width: calc(100% - 0.5rem);
    height: 0.5rem;
    background: #E54847;
    display: flex;
    z-index: -1;
    .iconfont{
      width: 0.5rem;
      text-align: center;
      line-height: 0.5rem;
      font-size: 0.25rem;
      color: #fff;
    }
    h3{
      width: calc(100% - 0.5rem);
      text-align: center;
      line-height: 0.5rem;
      font-size: 0.18rem;
      color: #fff;
    }
  }
  .movieDetail{
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    height: 1.88rem;
    .filter{
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #333;
    }
    .mask{
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-size: cover;
      opacity: 0.55;
      filter: blur(0.15rem);
    }
    .content{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding: 0.19rem 0.15rem;
      display: flex;
      .img-box{
        width: 1.1rem;
        height: 1.5rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .info{
        width: calc(100% - 1.2rem);
        padding-left: 0.125rem;
        h2{
          width: 100%;
          font-size: 0.2rem;
          height: 0.2rem;
          line-height: 0.2rem;
          font-weight: 700;
          color: #fff;
          margin-top: 0.02rem;
        }
        h3{
          width: 100%;
          height: 0.12rem;
          font-size: 0.12rem;
          margin-top: 0.1rem;
          color: #fff;
          opacity: 0.8;
          line-height: 0.12rem;
        }
        h4{
          width: 100%;
          font-size: 0.18rem;
          margin-top: 0.11rem;
          font-weight: 700;
          height: 0.18rem;
          color: #fc0;
          i{
            font-size: 0.12rem;
            color: #fff;
            opacity: 0.8;
            font-weight: 700;
          }
        }
        h5{
          display: flex;
          img{
            margin-left: 0.03rem;
          }
        }
        h5,h6,p{
          width: 100%;
          height: 0.14rem;
          font-size: 0.12rem;
          color: #fff;
          opacity: 0.8;
          margin-top: 0.1rem;
          line-height: 0.14rem;;
        }
      }
      .btn{
        width: 0.1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        span{
          color: #ccc;
          font-size: 0.14rem;
        }
      }
    }
    
  }
  .dates{
    width: 100% ;
    position: absolute;
    top: 1.88rem;
    left: 0;
    height: 0.45rem;
    background: #fff;
    border-bottom: 1px solid #e5e5e5;
    .scroll{
      width: 100%;
      height: 100%;
      overflow: hidden;
      ul{
        display: flex;
        width: max-content;
        li{
          width: 1.2rem;
          height: 0.45rem;
          margin-left: 0.045rem;
          line-height: 0.45rem;
          font-size: 0.14rem;
          color: #666;
          text-align: center;
          &.active{
            color: #f03d37;
            border-bottom: 0.02rem solid #f03d37;
          }
        }
      }
    }
  }
  .cinema-type{
    position: absolute;
    top: 2.33rem;
    left: 0;
    width: 100%;
    height: 0.4rem;
  }
  .scroll-load{
    position: absolute;
    top: 2.73rem;
    left: 0;
    width: 100%;
    bottom: 0;
    overflow: hidden;
    .cinemas{
      width: 100%;
      padding-left: 0.15rem;
      .cinemas-item{
        width: 100%;
        padding: 0.13rem 0.15rem 0.13rem 0;
        border-bottom: 1px solid #e5e5e5;
        h2{
          height: 0.23rem;
          line-height: 0.23rem;
          font-size: 0.16rem;
          color: #333;
          span{
            color: #f03d37;
            font-size: 0.18rem;
            margin-left: 0.05rem;
            i{
              margin-left: 0.03rem;
              font-size: 0.11rem;
            }
          }
        }
        h3{
          margin-top: 0.06rem;
          font-size: 0.13rem;
          color: #666;
          height: 0.19rem;
          line-height: 0.19rem;
          display: flex;
          span{
            width: calc(100% - 0.5rem);
          }
          i{
            width: 0.5rem;
            text-align: right;
          }
        }
        h4{
          height: 0.17rem;
          line-height: 0.17rem;
          margin: 0.04rem 0;
          display: flex;
          flex-wrap: wrap;
          overflow: hidden;
          span{
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
        h5{
          img{
            width: 0.15rem;
            height: 0.14rem;
            margin-top: 0.03rem;
            margin-right: 0.05rem;
          }
          display: flex;
          line-height: 0.21rem;
          font-size: 0.12rem;
          color: #999;
        }
        h6{
          line-height: 0.18rem;
          font-size: 0.12rem;
          color: #999;
          margin-top: 0.03rem;
        }
      }
    }
    
  }
}
</style>