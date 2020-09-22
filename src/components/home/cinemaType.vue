<template>
  <div class="cinema-type">
    <div class="type-tab" v-show="!ischoose" >
        <div @click="showAction">全城<span class="iconfont iconarrowdown-copy"></span></div>
        <div @click="showAction">品牌<span class="iconfont iconarrowdown-copy"></span></div>
        <div @click="showAction">特色<span class="iconfont iconarrowdown-copy"></span></div>
    </div>
    <div class="type" v-show="ischoose" @click.self="hideAction">
        <div class="type-tab">
            <div>全城<span class="iconfont iconarrowdown-copy"></span></div>
            <div>品牌<span class="iconfont iconarrowdown-copy"></span></div>
            <div>特色<span class="iconfont iconarrowdown-copy"></span></div>
        </div>
        <div class="content">

        </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            ischoose: false
        }
    },
    methods: {
        showAction(){
            this.ischoose = true;
        },
        hideAction(){
            this.ischoose = false;
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
    }
    .content{
        position: absolute;
        top: 1.35rem;
        width: 100%;
        background: #fff;
        height: 3.45rem;
    }
}
</style>