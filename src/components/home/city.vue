<template>
  <div id="city">
    <div class="scroll" ref="scroll" >
        <div class="scroll-wrap">
            <div class="pos">
                <h3 ref="pos">定位城市</h3>
                <div class="con">
                    <span @click="clickAction({id:30,nm:'深圳'})">深圳（默认，暂不支持定位）</span>
                </div>
            </div>
            <div class="near">
                <h3 ref="near">最近访问城市</h3>
                <div class="con">
                    <span v-for="item in nearCities" :key="item.id" @click="clickAction(item)">{{item.nm}}</span>
                </div>
            </div>
            <div class="hot">
                <h3 ref="hot">热门城市</h3>
                <div class="con">
                    <span 
                        v-for="item in hotCities" 
                        :key="item.id"
                        @click="clickAction(item)"
                    >{{item.nm}}</span>
                </div>
            </div>
            <div v-for="num in 26" :key="num" v-if="cities[String.fromCharCode(num+96)]">
                <h3 :ref="String.fromCharCode(num+64)" >{{String.fromCharCode(num+64)}}</h3>
                <ul>
                    <li 
                        v-for="item in cities[String.fromCharCode(num+96)]" 
                        :key="item.id"
                        @click="clickAction(item)"
                    >{{item.nm}}</li>
                </ul>
            </div>
        </div>
    </div>
    <ul>
        <li @click="scrollAction('pos')">定位</li>
        <li @click="scrollAction('near')">最近</li>
        <li @click="scrollAction('hot')">热门</li>
        <li 
            v-for="num in 26" 
            :key="num" 
            v-if="cities[String.fromCharCode(num+96)]"
            @click="scrollAction(String.fromCharCode(num+64))"
        >{{String.fromCharCode(num+64)}}</li>
    </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
    data(){
        return {
            hotCities: [
                {
                    nm: '上海',
                    id: 10
                },
                {
                    nm: '北京',
                    id: 1
                },
                {
                    nm: '广州',
                    id: 20
                },
                {
                    nm: '深圳',
                    id: 30
                },
                {
                    nm: '武汉',
                    id: 57
                },
                {
                    nm: '天津',
                    id: 40
                },
                {
                    nm: '西安',
                    id: 42
                },
                {
                    nm: '南京',
                    id: 55
                },
                {
                    nm: '杭州',
                    id: 50
                },
                {
                    nm: '成都',
                    id: 59
                },
                {
                    nm: '重庆',
                    id: 45
                },
            ]
        }
    },
    computed: {
        ...mapState({
            cities: state => state.city.cities,
            nearCities: state => state.city.nearCities
        })
    },
    methods: {
        scrollAction(str){
            this.scroll.refresh();
            if(str == 'pos' || str == 'hot' || str == 'near' ){
                var h = this.$refs[str].offsetTop;
            }else{
                var h = this.$refs[str][0].offsetTop;
            };
            this.scroll.scrollTo(0,-h,300);
        },
        clickAction(city){
            this.$store.commit('city/setChoose',city);
            this.$store.commit('setCity',city);
            this.$router.back();
        }
    },
    created(){
        this.$store.dispatch('city/getCities');
    },
    mounted(){
        this.scroll = new IScroll(this.$refs.scroll,{
            click: false,
            tap: false,
            probeType: 3,
        });
        this.scroll.on('beforeScrollStart' , () => {
            this.scroll.refresh();
        });
    }
}
</script>

<style scoped lang="scss" >
 #city{
     position: fixed !important;
     top: 0 !important;
     left: 0;
     bottom: 0;
     right: 0;
     background: #ebebeb !important;
     z-index: 99;
     .scroll{
        width: 100%;
        height: 100%;
        overflow: hidden;
     }
    .scroll-wrap>div{
        width: 100%;
        padding-right: 0.2rem;
        h3{
            width: 100%;
            padding-left: 0.14rem;
            height: 0.3rem;
            line-height: 0.3rem;
            font-size: 0.15rem;
            color: #333;
        }
        .con{
            background: #f5f5f5;
            padding: 0 0.3rem 0.08rem 0;
            display: flex;
            flex-wrap: wrap;
            span{
                font-size: 0.14rem;
                color: #333;
                min-width: 29%;
                padding: 0 0.2rem;
                margin-top: 0.15rem;
                margin-left: 4%;
                height: 0.33rem;
                line-height: 0.33rem;
                border: 1px solid #e6e6e6;
                border-radius: 0.03rem;
                text-align: center;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                background: #fff;
            }
        }
        ul{
            width: 100%;
            background: #f5f5f5;
            padding:0 0.3rem 0 0.15rem;
            li{
                height: 0.45rem;
                line-height: 0.45rem;
                border-bottom: 1px solid #c8c7cc;
                font-size: 28px;
                color: #333;
                text-size-adjust: none;
            }
        }
    }
    >ul{
        position: fixed;
        z-index: 9;
        right: 0.05rem;
        top: 0.75rem;
        font-size: 0.12rem;
        color: #333;
        li{
            text-align: right;
            height: 0.2rem;
            line-height: 0.2rem;

        }

    }
 }
</style>