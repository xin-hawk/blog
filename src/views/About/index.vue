<template>
  <div class="about-container" v-loading="isLoading">
    <iframe :src="data" frameborder="0" class="about-content"></iframe>
  </div>
</template>

<script>
import fetchData from "@/mixins/fetchData.js";
import { getAbout } from "@/api/about.js"
export default {
  mixins:[fetchData()],
  methods:{
    async fetchData(){
      return await getAbout();
    }
  }
}
</script>

<style scoped>
.about-container{
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  
}
.about-content{
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>