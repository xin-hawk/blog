<template>
    <div class="carousel-item-container" ref="container" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
        <div class="carousel-img" :style="imagePosition" ref="image" >
            <ImageLoader @load="this.showWords" :src="carousel.bigImg" :placeholder="carousel.midImg" />
        </div>
        <div class="title" ref="title">{{ carousel.title }}</div>
        <div class="desc" ref="desc">{{ carousel.description }}</div>
    </div>
</template>

<script>
    import ImageLoader from "@/components/ImageLoader"
    export default {
        props: ["carousel"],
        components: {
            ImageLoader,
        },
        data() {
            return {
                titleWidth: 0,
                descWidth: 0,
                containerSize: null, // 外层容器的尺寸
                innerSize: null, // 里层图片的尺寸
                mouseX : 0, // 鼠标的横坐标
                mouseY : 0, // 鼠标的纵坐标
            };
        },
        computed: {
            // 得到图片坐标
            imagePosition() {
                // 一开始没有值，得等其挂载上去才有，因此先判断
                if(!this.innerSize || !this.containerSize){
                    return;
                }
                // 图片与容器宽高的差值
                const extraWidth = this.innerSize.width - this.containerSize.width;
                const extraHeight = this.innerSize.height - this.containerSize.height;
                
                const left = -extraWidth / this.containerSize.width * this.mouseX;
                const top = -extraHeight / this.containerSize.height * this.mouseY 
                return {
                    transform: `translate(${left}px,${top}px)`
                }
            },
            center(){
                return{
                    x:this.containerSize.width / 2,
                    y:this.containerSize.height / 2,
                }
            }
        },
        mounted() {
            // 标题和描述的宽度
            this.titleWidth = this.$refs.title.clientWidth;
            this.descWidth = this.$refs.desc.clientWidth;

            // 容器和图片的尺寸
            this.getSize();
            this.mouseX = this.center.x;
            this.mouseY = this.center.y;
            // 兼容，当页面尺寸发生改变时，重新获取宽高
            window.addEventListener("resize",this.getSize);
        },
        destroyed(){
            window.removeEventListener("resize",this.getSize);
        },
        methods: {
            // 调用该方法显示文字
            showWords() {
                // 标题字体显示
                this.$refs.title.style.opacity = 1;
                this.$refs.title.style.width = 0;
                // 强制让浏览器渲染一次(因为浏览器是异步的，不能捕获到前面还设置了width=0)
                this.$refs.title.clientWidth; //reflow
                this.$refs.title.style.transition = "1s";
                this.$refs.title.style.width = this.titleWidth + "px";

                // 描述字体显示
                this.$refs.desc.style.opacity = 1;
                this.$refs.desc.style.width = 0;
                // 强制让浏览器渲染一次(因为浏览器是异步的，不能捕获到前面还设置了width=0)
                this.$refs.desc.clientWidth; //reflow
                this.$refs.desc.style.transition = "2s 1s";
                this.$refs.desc.style.width = this.descWidth + "px";
            },
            getSize() {
                this.containerSize = {
                    width: this.$refs.container.clientWidth,
                    height: this.$refs.container.clientHeight,
                };
                this.innerSize = {
                    width: this.$refs.image.clientWidth,
                    height: this.$refs.image.clientHeight,
                };
            },
            handleMouseMove(e){
                // 获取容器的矩形属性
                const rect = this.$refs.container.getBoundingClientRect();
                this.mouseX = e.clientX - rect.left;
                this.mouseY = e.clientY - rect.top;
            },
            handleMouseLeave(){
                this.mouseX = this.center.x;
                this.mouseY = this.center.y;
            }
        }
    }
</script>

<style scoped lang="less">
    @import "~@/styles/var.less";

    .carousel-item-container {
        width: 100%;
        height: 100%;
        background: @dark;
        color: #fff;
        position: relative;
        overflow: hidden;
    }

    .carousel-img {
        width: 110%;
        height: 110%;
        position: absolute;
        transition: 0.3s;
    }

    .title,
    .desc {
        position: absolute;
        left: 30px;
        color: #fff;
        white-space: nowrap;
        overflow: hidden;
        opacity: 0;
    }

    .title {
        top: calc(50% - 40px);
        font-size: 2em;
        text-shadow: 1px 0 0 rgba(0, 0, 0, 0.5), -1px 0 0 rgba(0, 0, 0, 0.5),
            0 1px 0 rgba(0, 0, 0, 0.5), 0 -1px 0 rgba(0, 0, 0, 0.5);
    }

    .desc {
        top: calc(50% + 10px);
        font-size: 1.2em;
        color: lighten(@gray, 20%);
    }
</style>