<template>
    <div class="test-container">
        <ImageLoader
            src="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?fit=crop&crop=entropy&w=3456&h=2304"
            placeholder="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?w=100"
            @load="handleLoaded" />
    </div>
</template>

<script>
    import ImageLoader from "./index.vue"
    export default {
        components: {
            ImageLoader
        },
        methods: {
            handleLoaded() {
                console.log('图片加载完成')
            }
        }
    }
</script>

<style scoped lang="less">
    .test-container {
        width: 500px;
        height: 400px;
        margin: 0 auto;
        border: 1px solid;
    }
</style>