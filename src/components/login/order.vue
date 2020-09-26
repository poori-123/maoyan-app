<template>
<div class="order-wrap">
    <div class="tit">
        <span class="iconfont iconleft" @click="$router.back()" ></span>
        <h1>我的电影订单</h1>
    </div>
    <div class="con" v-if="datalist">
        <app-scroll class="scroll">
            <div class="items" v-for="(item,index) in datalist" :key="index">
                <h6>{{item.cn}} <span class="iconfont iconarrow"></span></h6>
                
                <div class="info">
                    <div class="img"></div>
                    <div class="concon">
                        <h2 class="ellipsis">{{item.mn}}</h2>
                        <h3 class="ellipsis">{{item.showDate}} {{item.showTime}}</h3>
                        <h5 class="ellipsis">{{item.hn}} <span v-for="se in item.seatList" :key="se.id">{{se.row}}排{{se.col}}座</span> </h5>
                    </div>
                </div>
                <div class="price">
                    <span>总价：{{ item.seatList.reduce( (pre,pr)=>{return pre + Number(pr.pri)},0) }}元</span> 
                </div>
            </div>
        </app-scroll>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return {
            datalist: ''
        }
    },
    created(){
        var username = JSON.parse(localStorage.getItem('logUser')).name;
        var orderList = JSON.parse(localStorage.getItem('orederList'));
        var list = orderList.filter( item => item.user == username )[0].order;
        this.datalist = list;
    }
}
</script>

<style scoped lang="scss" >
.order-wrap{
    width: 100%;
    position: fixed;
    top: 0.5rem;
    bottom: 0;
    z-index: 99;
    background: #f3f3f3;
    .tit{
        position: absolute;
        height: 0.5rem;
        width: calc(100% - 0.5rem);
        left: 0;
        top: -0.5rem;
        background: #e54847;
        display: flex;
        .iconfont{
            width: 0.5rem;
            height: 100%;
            font-size: 0.24rem;
            color: #fff;
            line-height: 0.5rem;
            text-align: center;
        }
        h1{
            width: calc(100% - 0.5rem);
            font-size: 0.18rem;
            line-height: 0.5rem;
            font-weight: 400;
            color: #fff;
            font-weight: 400;
            text-align: center;
        }
    }
    .con{
        width: 100%;
        height: 100%;
        .scroll{
            width: 100%;
            height: 100%;
            overflow: hidden;
            .items{
                width: 100%;
                height: 1.84rem;
                margin-bottom: 0.1rem;
                background: #fff;
                h6{
                    width: 100%;
                    padding: 0 0.15rem;
                    height: 0.38rem;
                    line-height: 0.38rem;
                    font-size: 0.14rem;
                    color: #777;
                    display: flex;
                    align-items: center;
                    border-bottom: 1px solid #d8d8d8;
                    span{
                        font-size: 0.12rem;
                    }
                }
                .info{
                    width: 100%;
                    padding: 0.12rem 0.15rem;
                    height: 1.04rem;
                    border-bottom: 1px solid #d8d8d8;
                    display: flex;
                    .img{
                        width: 0.57rem;
                        height: 0.8rem;
                        background: #bbb;
                    }
                    .concon{
                        width: calc(100% - 0.57rem);
                        padding-left: 0.12rem;
                        padding-top: 0.04rem;
                        h2{
                            height: 0.21rem;
                            line-height: 0.21rem;
                            color: #333;
                            font-size: 0.15rem;
                        }
                        h3,h5{
                            font-size: 0.12rem;
                            height: 0.18rem;
                            line-height: 0.18rem;
                            color: #888;
                            margin-top: 0.05rem;
                        }
                        h5{
                            span{
                                margin-right: 0.05rem;
                            }
                        }
                    }
                }
                .price{
                    height: 0.42rem;
                    line-height: 0.42rem;
                    padding: 0 0.15rem;
                    font-size: 0.14rem;
                    color: #999;
                }
            }
        }
    }
}
</style>