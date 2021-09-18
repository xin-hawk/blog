<template>
  <Layout>
    <div ref="mainContainer" class="main-container" v-loading="isLoading">
      <BlogDetail :blog="data" v-if="data" />
      <BlogComment v-if="!isLoading" />
    </div>
    <template #right>
      <div class="right-container" v-loading="isLoading">
        <BlogTOC :toc="data.toc" v-if="data" />
      </div>
    </template>
  </Layout>
</template>

<script>
  import fetchData from "@/mixins/fetchData.js";
  import Layout from "@/components/Layout";
  import {
    getBlog
  } from "@/api/blog.js";
  import BlogDetail from "./components/BlogDetail.vue";
  import BlogTOC from "./components/BlogTOC.vue";
  import BlogComment from "./components/BlogComment.vue";
  import mainScroll from "@/mixins/mainScroll.js";
  import {
    titleController
  } from "@/utils";
  export default {
    mixins: [fetchData(null), mainScroll("mainContainer")],
    components: {
      Layout,
      BlogDetail,
      BlogTOC,
      BlogComment,
    },
    methods: {
      async fetchData() {
        let resp = await getBlog(this.$route.params.id);
        if (!resp) {
          this.$router.push("/404");
          return;
        }
        titleController.setRouteTitle(resp.title)
        return resp;
      },

    },
    updated() {
      const hash = location.hash;
      location.hash = "";
      setTimeout(() => {
        location.hash = hash;
      }, 50);
    },

  }
</script>

<style scoped lang="less">
  .main-container {
    position: relative;
    overflow-y: scroll;
    height: 100%;
    box-sizing: border-box;
    padding: 20px;
    width: 100%;
    overflow-x: hidden;
    scroll-behavior: smooth;
  }

  .right-container {
    width: 300px;
    height: 100%;
    overflow-y: scroll;
    box-sizing: border-box;
    padding: 20px;
    position: relative;

    .blog-toc-container {
      padding: 0;
    }
  }
</style>