<template>
  <div id="app">
    <h1>app组件</h1>
    <div class="item" v-for="t in types" :key="t">
      <Icon :type="t" />
      <label>{{t}}</label>
    </div>
  </div>
</template>

<script>
  import Icon, {
    types
  } from './index.vue';
  export default {
    components: {
      Icon
    },
    data() {
      return {
        types
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