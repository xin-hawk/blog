<template>
  <div class="message-container" ref="messageContainer">
    <MessageArea @submit="handleSubmit" title="留言板" :subTitle="`(${data.total})`" :list="data.rows"
      :isListLoading="isLoading" />
  </div>
</template>

<script>
  import MessageArea from "@/components/MessageArea";
  import fetchData from "@/mixins/fetchData";
  import * as msgApi from "@/api/message";
  import mainScroll from "@/mixins/mainScroll";
  export default {
    mixins: [fetchData({
      total: 0,
      rows: []
    }), mainScroll("messageContainer")],
    data() {
      return {
        page: 1,
        limit: 10
      }
    },
    components: {
      MessageArea
    },
    created() {
      this.$bus.$on("mainScroll", this.handleScroll)
    },
    destroyed() {
      this.$bus.$off("mainScroll", this.handleScroll);
    },
    computed: {
      hasMore() {
        return this.data.rows.length < this.data.total;
      },
    },
    methods: {
      async fetchData() {
        return await msgApi.getMessage(this.page, this.limit)
      },
      // 提交事件
      async handleSubmit(data, callback) {
        const resp = await msgApi.postMessage(data);
        callback("感谢您的留言");
        this.data.rows.unshift(resp);
        this.data.total++;
      },
      // 滚动条事件
      handleScroll(dom) {
        if (this.isLoading || !dom) {
          // 目前正在加载更多
          return;
        }
        const range = 100; // 顶一个可接受的范围，在这个范围内都算达到了底部
        const dec = Math.abs(dom.scrollTop + dom.clientHeight - dom.scrollHeight);
        if (dec <= range) {
          this.fetchMore();
        }
      },
      // 加载下一页
      async fetchMore() {
        if (!this.hasMore) {
          // 没有更多啦
          return;
        }
        this.isLoading = true;
        this.page++;
        const resp = await this.fetchData();
        this.data.total = resp.total;
        this.data.rows = this.data.rows.concat(resp.rows);
        this.isLoading = false;
      },
    }
  }
</script>

<style scoped>
  .message-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 25px 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
  }

  .message-area-container {
    width: 700px;
    margin: 0 auto;
  }
</style>