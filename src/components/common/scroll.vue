<template>
    <div class="scroll-box" ref="scroll_box">
        <div class="scroll-wrap">
            <slot/>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        scrollX: {
            type: Boolean,
            default: false
        },
        scrollAction: Function
    },
    mounted(){
        var scroll = new IScroll(this.$refs.scroll_box,{
            click: true,
            tap: true,
            probeType: 3,
            scrollX: this.scrollX,
            scrollY: !this.scrollX,
            
        });
        scroll.on('beforeScrollStart' , () => {
            scroll.refresh();
        });
        scroll.on( 'scroll', () => {
            if(this.scrollAction){
                this.scrollAction( { x: scroll.x, y: scroll.y, scroll } )
            }
        } );
    }
}
</script>

<style>
.scroll-wrap{
    overflow: hidden;
}
</style>