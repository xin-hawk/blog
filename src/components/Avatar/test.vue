<template>
  <div id="app">
    <h1>app组件</h1>
    <Avatar url="https://resource.zaixiankaoshi.com/pc/logo.png" :size="50"/>
  </div>
</template>

<script>
  import Avatar from './index.vue';
  export default {
    components: {
      Avatar
    },
  };
</script>

<style scoped>
  .iconfont {
    font-size: 30px;
    color: aqua;
  }
</style>