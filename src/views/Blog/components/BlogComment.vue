<template>
    <div class="blog-comment-container">
        <MessageArea title="评论列表" :subTitle="`(${data.total})`" :list="data.rows" :isListLoading="isLoading" @submit="handleSubmit"/>
    </div>
</template>

<script>
    import MessageArea from "@/components/MessageArea";
    import fetchData from "@/mixins/fetchData.js";
    import {
        getComment,postComment
    } from "@/api/blog.js"
    export default {
        mixins: [fetchData({
            total: 0,
            rows: []
        })],
        data() {
            return {
                page: 1,
                limit: 10
            }
        },
        components: {
            MessageArea
        },
        created(){
            this.$bus.$on("mainScroll",this.handleScroll)
        },
        destroyed(){
            this.$bus.$off("mainScroll",this.handleScroll)
        },
        computed:{
            hasMore(){
                return this.data.rows.length < this.data.total;
            }
        },
        methods: {
            handleScroll(dom){
                if(this.isLoading || !dom){
                    // 目前正在加载中
                    return
                }
                const range = 100; // 范围
                const dec = Math.abs(( dom.scrollTop + dom.clientHeight ) - dom.scrollHeight);
                if(dec <= range){
                    this.fetchMore();
                }
            },
            async fetchData() {
                return await getComment(this.$route.params.id, this.page, this.limit)
            },
            // 加载下一页
            async fetchMore(){
                if(!this.hasMore){
                    return
                }
                this.isLoading = true;
                this.page ++;
                const resp = await this.fetchData();
                this.data.total = resp.total;
                this.data.rows = this.data.rows.concat(resp.rows);
                this.isLoading = false;
            },
            async handleSubmit(formData,callback){
                const comment = await postComment({
                    blogId:this.$route.params.id,
                    ...formData
                });
                this.data.rows.unshift(comment);
                this.data.total++;
                // 告诉子组件，这边已经完成
                callback("评论成功");
            }
        }
    }
</script>

<style scoped lang="less">
    .blog-comment-container {
        margin: 30px 0;
    }
</style>