<template>
  <div class="cinema-type">
    <div class="type-tab" v-show="!ischoose" >
        <div @click="showAction(1)">{{t1Text}}<span class="iconfont iconarrowdown-copy"></span></div>
        <div @click="showAction(2)">{{t2Text}}<span class="iconfont iconarrowdown-copy"></span></div>
        <div @click="showAction(3)">{{t3Text}}<span class="iconfont iconarrowdown-copy"></span></div>
    </div>
    <div class="type" v-show="ischoose" @click.self="hideAction" v-if="Object.keys(cinemaType).length !== 0" >
        <div class="type-tab">
            <div @click="choose1(1)" :class="{active: type ===1 }">{{t1Text}}<span class="iconfont iconarrowdown-copy"></span></div>
            <div @click="choose1(2)" :class="{active: type ===2 }">{{t2Text}}<span class="iconfont iconarrowdown-copy"></span></div>
            <div @click="choose1(3)" :class="{active: type ===3 }">{{t3Text}}<span class="iconfont iconarrowdown-copy"></span></div>
        </div>
        <div class="content">
            <div class="area-c" v-show="type === 1" >
                <div class="tit">
                    <span @click="choose2(1)" :class="{active: typeA ===1 }">商区</span>
                    <span @click="choose2(2)" :class="{active: typeA ===2 }">地铁站</span>
                </div>
                <div class="list">
                    <div class="district" v-show="typeA === 1" >
                        <div class="left">
                            <app-scroll class="scroll">
                                <p 
                                    v-for="item in cinemaType.district.subItems" 
                                    :key="item.id" 
                                    :class="{active: districtId2 === item.id}"
                                    @click="chooseDis(item.id)"
                                    class="ellipsis"
                                >
                                    {{item.name}}({{item.count}})
                                </p>
                            </app-scroll>
                        </div>
                        <div class="right">
                            <div 
                                v-for="item in cinemaType.district.subItems" 
                                :key="item.id" 
                                v-show="item.id == districtId2" 
                            >
                                <app-scroll class="scroll">
                                    <li 
                                        v-for="ar in item.subItems" 
                                        :key="ar.id" 
                                        @click="chooseArea(item,ar)"
                                        :class="{acitve: areaId === ar.id }"
                                    >
                                        <span class="iconfont" :class="{iconduihao: areaId === ar.id }" ></span>
                                        <span class="name ellipsis">{{ar.name}}</span>
                                        <span class="count">{{ar.count}}</span>
                                    </li>
                                </app-scroll>
                            </div>
                        </div>
                    </div>
                    <div class="subway" v-show="typeA === 2" >
                        <div class="left">
                            <app-scroll class="scroll">
                                <p 
                                    v-for="item in cinemaType.subway.subItems" 
                                    :key="item.id" 
                                    :class="{active: lineId2 === item.id}"
                                    @click="chooseSub(item.id)"
                                    class="ellipsis"
                                >
                                    {{item.name}}({{item.count}})
                                </p>
                            </app-scroll>
                        </div>
                        <div class="right">
                            <div 
                                v-for="item in cinemaType.subway.subItems" 
                                :key="item.id" 
                                v-show="item.id == lineId2" 
                            >
                                <app-scroll class="scroll">
                                    <li 
                                        v-for="st in item.subItems" 
                                        :key="st.id" 
                                        @click="chooseSta(item,st)"
                                        :class="{acitve: stationId === st.id }"
                                    >
                                        <span class="iconfont" :class="{iconduihao: stationId === st.id }" ></span>
                                        <span class="name ellipsis">{{st.name}}</span>
                                        <span class="count">{{st.count}}</span>
                                    </li>
                                </app-scroll>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="brand" v-show="type === 2">
                <app-scroll class="scroll">
                    <li 
                        v-for="item in cinemaType.brand.subItems" 
                        :key="item.id"
                        :class="{active: brandId === item.id }"
                        @click="chooseBra(item)"
                    >
                        <span class="iconfont" :class="{iconduihao: brandId === item.id }" ></span>
                        <span class="name ellipsis">{{item.name}}</span>
                        <span class="count">{{item.count}}</span>
                    </li>
                </app-scroll>
            </div>
            <div class="other" v-show="type === 3">
                <app-scroll class="scroll">
                    <div class="service it">
                        <h3>特色功能</h3>
                        <div>
                            <span 
                                v-for="item in cinemaType.service.subItems" 
                                :key="item.id"
                                :class="{active: serviceId === item.id}"
                                @click="chooseSer(item.id)"
                                class="ellipsis"
                            >{{item.name}}</span>
                        </div>
                    </div>
                    <div class="hallType it">
                        <h3>特殊厅</h3>
                        <div>
                            <span 
                                v-for="item in cinemaType.hallType.subItems" 
                                :key="item.id"
                                :class="{active: hallType === item.id}"
                                @click="chooseHall(item.id)"
                                class="ellipsis"
                            >{{item.name}}</span>
                        </div>
                    </div> 
                </app-scroll>
                <div class="bot">
                    <span class="reset" @click="resetAction">重置</span>
                    <span class="sure" @click="sureAction">确定</span>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
    props: {
        cinemaType: Object
    },
    data(){
        return {
            ischoose: false,
            t1Text: '全城', 
            t2Text: '品牌',
            t3Text: '特色',
            type: 1,        //展示全城/品牌/特色
            typeA: 1,       //全城分类展示区/地铁
            districtId: -1, //行政区id
            areaId: -1,     //区id
            lineId: -1,     //地铁线路id
            stationId: -1,  //地铁站id
            brandId: -1,    //品牌id
            serviceId: -1,  //特色
            hallType: -1,   //特殊厅
            districtId2: -1,
            lineId2: -1
        }
    },
    computed: {
        queryObj(){
            return {
                districtId: this.districtId,
                areaId: this.areaId,
                lineId: this.lineId,
                stationId: this.stationId,
                brandId: this.brandId,
                serviceId: this.serviceId,
                hallType: this.hallType
            }
        }
    },
    methods: {
        showAction(num){
            this.type = num;
            this.ischoose = true;
        },
        hideAction(){
            this.districtId2 = this.districtId;
            this.lineId2 = this.lineId;
            this.ischoose = false;
        },
        choose1(num){  //选择展示全城/品牌/特色
            this.type = num;
        },
        choose2(num){  //选择展示区/地铁
            this.typeA = num;
        },
        chooseDis(num){  //选择行政区
            if(num == -1 && this.districtId != -1 ){
                this.t1Text = '全城';
                this.districtId = -1 ;
                this.ischoose = false;
            }
            this.districtId2 = num;
            this.areaId = -1;
        },
        chooseArea(item,ar){  //选择区
            this.areaId = ar.id;
            this.districtId = item.id;
            if(ar.id == -1){
                this.t1Text = item.name;
            }else{
                this.t1Text = ar.name;
            }
            this.ischoose = false;
        },
        chooseSub(num){  //选择地铁线路
            if(num == -1 && this.lineId != -1 ){
                this.t1Text = '全城';
                this.lineId = -1;
                this.ischoose = false;
            }
            this.lineId2 = num;
            this.stationId = -1;
        },
        chooseSta(item,st){  //选择地铁站点
            this.stationId = st.id;
            this.lineId = item.id;
            if(st.id == -1){
                this.t1Text = item.name;
            }else{
                this.t1Text = st.name;
            }
            this.ischoose = false;
        },
        chooseBra(item){  //选择品牌
            this.brandId = item.id;
            this.t2Text = item.name;
            this.ischoose = false;
        },
        chooseSer(num){  //选择特色功能
            this.serviceId = num;
        },
        chooseHall(num){  //选择特殊厅
            this.hallType = num;
        },
        resetAction(){  //重置操作
            this.serviceId = -1;
            this.hallType = -1;
            this.ischoose = false;
        },
        sureAction(){  //确定操作
            this.ischoose = false;
        }
    },
    watch: {
        ischoose(newVal){
            if(!newVal){
                this.$emit('choosed',this.queryObj);
            }
        }
    }
}
</script>

<style scoped lang="scss" >
.type-tab{
    width: 100%;
    height: 100%;
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
.type{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background: rgba(0, 0, 0, 0.5);
    .type-tab{
        position: absolute;
        top: 0.95rem;
        height: 0.4rem;
        .active{
            color: #F03D37;
            span{
                transform: rotate(180deg);
            }
        }
    }
    .content{
        position: absolute;
        top: 1.35rem;
        width: 100%;
        background: #fff;
        height: 4rem;
        &>div{
            width: 100%;
            height: 100%;
            position: relative;
        }
        .area-c{
            .tit{
                width: 100%;
                height: 0.44rem;
                background: #fff;
                display: flex;
                justify-content: space-around;
                span{
                    // width: 45%;
                    flex: 1;
                    height: 100%;
                    text-align: center;
                    line-height: 0.44rem;
                    font-size: 0.15rem;
                    color: #777;
                    border-bottom: 0.02rem solid transparent;
                    &.active{
                        color: #F03D37;
                        border-bottom-color: #F03D37;
                    }
                }
            }
            .list{
                position: absolute;
                top: 0.44rem;
                bottom: 0;
                width: 100%;
                overflow: hidden;
                .subway,.district{
                    width: 100%;
                    height: 100%;
                    .left{
                        position: absolute;
                        top: 0;
                        height: 100%;
                        left: 0;
                        width: 35%;
                        .scroll{
                            width: 100%;
                            height: 100%;
                            overflow: hidden;
                        }
                        p{
                            width: 100%;
                            height: 0.44rem;
                            padding: 0 0.1rem;
                            font-size: 0.14rem;
                            line-height: 0.44rem;
                            color: #777;
                            background: #fff;
                            &.active{
                                color: #F03D37;
                                background: #f5f5f5;
                            }
                        }
                    }
                    .right{
                        position: absolute;
                        width: 65%;
                        height: 100%;
                        top: 0;
                        right: 0;
                        background: #f5f5f5;
                        >div{
                            width: 100%;
                            height: 100%;
                            padding: 0 0.25rem 0 0.15rem;
                            .scroll{
                                width: 100%;
                                height: 100%;
                                overflow: hidden;
                            }
                            li{
                                width: 100%;
                                height: 0.45rem;
                                font-size: 0.14rem;
                                color: #333;
                                line-height: 0.45rem;
                                display: flex;
                                &.acitve{
                                    color: #F03D37;
                                    .count{
                                        color: #F03D37;
                                    }
                                }
                                .iconfont{
                                    width: 0.25rem;
                                    height: 100%;
                                    text-align: center;
                                    font-size: 0.12rem;
                                }
                                .name{
                                    width: calc(100% - 0.5rem);
                                    height: 100%;
                                }
                                .count{
                                    width: 0.25rem;
                                    height: 100%;
                                    text-align: right;
                                    color: #777;
                                }
                            }
                        }
                    }
                }
            }
        }
        .brand{
            width: 100%;
            height: 100%;
            .scroll{
                width: 100%;
                height: 100%;
                overflow: hidden;
                padding-right: 0.2rem;
                li{
                    width: 100%;
                    height: 0.45rem;
                    border-bottom: 1px solid #ccc;
                    padding-right:0.2rem;
                    font-size: 0.14rem;
                    color: #333;
                    line-height: 0.45rem;
                    display: flex;
                    &.active{
                        color: #F03D37;
                        .count{
                            color: #F03D37;
                        }
                    }
                    .iconfont{
                        width: 0.25rem;
                        height: 100%;
                        text-align: center;
                        font-size: 0.12rem;
                    }
                    .name{
                        width: calc(100% - 0.5rem);
                        height: 100%;
                    }
                    .count{
                        width: 0.25rem;
                        height: 100%;
                        text-align: right;
                        color: #777;
                    }
                }
            }
        }
        .other{
            width: 100%;
            height: 100%;
            position: relative;
            .scroll{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                bottom: 0.7rem;
                overflow: hidden;
                .it{
                    width: 100%;
                    padding-left: 0.12rem;
                    h3{
                        height: 0.2rem;
                        margin-top: 0.11rem;
                        line-height: 0.2rem;
                        font-size: 0.15rem;
                        color: #777;
                    }
                    div{
                        display: flex;
                        flex-wrap: wrap;
                        span{
                            width: 21%;
                            height: 0.38rem;
                            line-height: 0.38rem;
                            border: 0.01rem solid #ccc;
                            margin-right: 3%;
                            margin-top: 0.1rem;
                            border-radius: 0.05rem;
                            font-size: 0.12rem;
                            text-align: center;
                            color: #777;
                            &.active{
                                background: #fcf0f0;
                                color: #f03d37;
                                border-color: #f03d37;
                            }
                        }
                    }
                }
            }
            .bot{
                width: 100%;
                height: 0.6rem;
                position: absolute;
                bottom: 0;
                left: 0;
                background: #fafafa;
                border-top: 1px solid #e5e5e5;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 0.12rem;
                span{  
                    width: 21%;
                    height: 0.38rem;
                    line-height: 0.38rem;
                    border: 0.01rem solid #ccc;
                    border-radius: 0.05rem;
                    font-size: 0.12rem;
                    text-align: center;
                    color: #777;
                    &.sure{
                        color: #fff;
                        background: #f03d37;
                        border-color: #f03d37;
                    }
                }
            }
        }
    }
}
</style>