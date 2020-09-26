<template>
  <div class="scroll-box" ref="scroll_box_x">
      <div class="scroll-wrap">
          <slot/>
          <div class="load">{{loadText}}</div>
      </div>
  </div>
</template>

<script>
export default {
    props: {
        maxNum: Boolean
    },
    data(){
        return {
            loadText: '加载更多'
        }
    },
    mounted(){
        this.scroll = new IScroll(this.$refs.scroll_box_x,{
            click: false,
            tap: false,
            probeType: 3,
            scrollX: true,
            scrollY: false
        });
        this.scroll.on( 'beforeScrollStart' , () => {
            this.scroll.refresh();
        });
        this.scroll.on('scrollEnd', () => {
            if(this.maxNum){
                return;
            }
            if( this.scroll.x <= this.scroll.maxScrollX ){
                this.$emit('loadMore');
            }
        })
    },
    watch: {
        maxNum(newVal){
            if(newVal){
                this.loadText = '没有更多了';
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.scroll-box{
    overflow: hidden;
    .scroll-wrap{
        position: relative;
        min-width: 100%;
        width: max-content;
        .load{
            position: absolute;
            width: 0.5rem;
            height: 100%;
            top: 0;
            right: -0.5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #666;
            font-size: 0.12rem;
        }
    }
}
</style>