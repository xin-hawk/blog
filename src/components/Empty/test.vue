<template>
    <div class="test-container">
        <Empty />
    </div>
</template>

<script>
    import Empty from './index.vue'
    export default {
        components: {
            Empty
        }
    }
</script>

<style>
.test-container{
    width: 500px;
    height: 400px;
    border: 2px solid;
    margin: 0 auto;
    position: relative;
}
</style>