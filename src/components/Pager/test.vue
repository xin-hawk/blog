<template>
  <div id="app">
    <h1>app组件</h1>
    <Pager :total="total" :current="current" @pageChange="handlePageChange($event)" />
  </div>
</template>

<script>
  import Pager from './index.vue';
  export default {
    components: {
      Pager
    },
    data() {
      return {
        total: 302,
        current: 1
      }
    },
    methods: {
      handlePageChange(newPage) {
        this.current = newPage;
        console.log('a')
      }
    }
  };
</script>

<style scoped>
  .iconfont {
    font-size: 30px;
    color: aqua;
  }
</style>