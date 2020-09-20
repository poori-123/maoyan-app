<template>
    <div class="scroll-box" ref="scroll_box">
        <div class="scroll-wrap">
            <slot/>
            <div class="pull-up">
                <img :src="pull_up_img" alt="" :class="{'turn': !isTurn}">
                <span>{{ pull_up_text }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import arrow from '../../assets/arrow.jpg';
import load from '../../assets/loading.gif';
import noMore from '../../assets/music.png';
export default {
    props: {
        scrollX: {
            type: Boolean,
            default: false
        },
        inLoadMore: Boolean,
        maxNum: Boolean
    },
    data(){
        return {
            isTurn: false,
            pull_up_text: '上拉加载更多...',
            pull_up_img: arrow,
        }
    },
    mounted(){
        this.scroll = new IScroll(this.$refs.scroll_box,{
            click: true,
            tap: true,
            probeType: 3,
            scrollX: this.scrollX,
            scrollY: !this.scrollX
        });
        this.scroll.on( 'beforeScrollStart' , () => {
            this.scroll.refresh();
        });

        /* 上拉加载更多 */
        this.scroll.on( 'scroll', () => {
            if(this.inLoadMore || this.maxNum){
                return;
            }
            if( this.scroll.y <= this.scroll.maxScrollY){
                this.pull_up_text = '松手加载更多...';
                this.isTurn = true;
            }else if( this.scroll.y > this.scroll.maxScrollY && this.scroll.y < (this.scroll.maxScrollY + 100) ){
                this.pull_up_text = '上拉加载更多...';
                this.isTurn = false;
            }
        });
        this.scroll.on('scrollEnd', () => {
            if(this.inLoadMore || this.maxNum){
                return;
            }
            if( this.scroll.y > this.scroll.maxScrollY && this.scroll.y < (this.scroll.maxScrollY + 100) ){
                this.scroll.scrollTo(0, (this.scroll.maxScrollY + 100), 300);
            }else if( this.scroll.y <= this.scroll.maxScrollY ){
                this.pull_up_text = '正在加载更多...';
                this.pull_up_img = load;
                this.$emit('loadMore');
            }
        })

    },
    watch: {
        inLoadMore(newVal){
            if(!newVal){
                this.pull_up_img = arrow;
                this.pull_up_text = '上拉加载更多...';
            }
        },
        maxNum(newVal){
            if(newVal){
                this.pull_up_img = noMore;
                this.pull_up_text = '没有更多了...';
            }else{
                this.pull_up_img = arrow;
                this.pull_up_text = '上拉加载更多...';
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.scroll-box{
    overflow: hidden;
    .pull-up{
        width: 100%;
        height: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        // border: 2px solid #000;
        img{
            width: 0.3rem;
            height: 0.3rem;
            transition: all 300ms;
        }
        .turn{
            transform: rotate(180deg);
        }
        span{
            font-size: 0.14rem;
            color: #333;
            margin-left: 0.1rem;
        }
    }
    // .scroll-wrap{
    //     min-height: calc(100% + 1rem);
    //     position: relative;
    //     padding-bottom: 0.5rem;
    //     .pull-up{
    //         position: absolute;
    //         left: 0;
    //         bottom: 0;
    //     }
    // }
}
</style>