<template>
    <div @click="handleClick" v-show="show" class="to-top-container">
        TOP
    </div>
</template>

<script>
export default {
    data(){
        return{
            show:false
        }
    },
    created(){
        this.$bus.$on("mainScroll",this.handleScroll);
    },
    destroyed(){
        this.$bus.$off("mainScroll",this.handleScroll)
    },
    methods:{
        handleScroll(dom){
            if(!dom){
                this.show = false;
                return;
            }
            this.show = dom.scrollTop >= 500
        },
        handleClick(){
            // 回到顶部
            this.$bus.$emit("setMainScroll",0)
        }
    }
}
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.to-top-container{
    position: fixed;
    right: 50px;
    bottom: 50px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: @primary;
    color: #fff;
    line-height: 50px;
    text-align: center;
    cursor: pointer;
    z-index: 99;
}
</style>