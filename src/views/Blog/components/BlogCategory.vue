<template>
  <div class="blog-category-container" v-loading="isLoading">
    <h2>文章分类</h2>
    <RightList :list="list" @select="handleSelect" />
  </div>
</template>

<script>
  import RightList from "./RightList.vue";
  import fetchData from "@/mixins/fetchData.js";
  import {
    getBlogTypes
  } from "@/api/blog.js"
  export default {
    mixins: [fetchData([])],
    components: {
      RightList
    },
    computed: {
      categoryId() {
        return +this.$route.params.categoryId || -1;
      },
      limit() {
        return +this.$route.query.limit || 10;
      },
      list() {
        const totalAticleCount = this.data.reduce((a, b) => a + b.articleCount, 0)
        const result = [{
            name: "全部",
            id: -1,
            articleCount: totalAticleCount
          },
          ...this.data
        ];
        return result.map((it) => ({
          ...it,
          aside:`${it.articleCount}篇`,
          isSelect: it.id === this.categoryId,
        }));
      }
    },
    methods: {
      async fetchData() {
        return await getBlogTypes();
      },
      handleSelect(item) {
        const query = {
          page: 1,
          limit: this.limit,
        };
        if (item.id === -1) {
          this.$router.push({
            name: "Blog",
            query
          })
        } else {
          this.$router.push({
            name: "CategoryBlog",
            query,
            params: {
              categoryId: item.id
            }
          })
        }

      }
    }
  }
</script>

<style scoped lang="less">
  .blog-category-container {
    width: 300px;
    box-sizing: border-box;
    padding: 20px;
    position: relative;
    height: 100%;
    overflow-y: auto;
    
    h2 {
      font-weight: bold;
      letter-spacing: 2px;
      font-size: 1em;
      margin: 0;
    }
  }
</style>