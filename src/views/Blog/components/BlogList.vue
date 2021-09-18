<template>
    <div class="blog-list-container" v-loading="isLoading" ref="mainContainer">
        <ul>
            <li v-for="item in data.rows" :key="item.id">
                <div class="thumb" v-if="item.thumb">
                    <router-link :to="{
                        name:'BlogDetail',
                        params:{
                            id:item.id
                        }
                    }">
                        <img v-lazy="item.thumb" :alt="item.title" :title="item.title" />
                    </router-link>
                </div>
                <div class="main">
                    <router-link :to="{
                        name:'BlogDetail',
                        params:{
                            id:item.id
                        }
                    }">
                        <h2>{{item.title}}</h2>
                    </router-link>
                    <div class="aside">
                        <span>日期：{{ formatDate(item.createDate) }}</span>
                        <span>浏览：{{ item.scanNumber }}</span>
                        <span>评论{{ item.commentNumber }}</span>
                        <router-link :to="{
                            name:'CategoryBlog',
                            params:{
                                categoryId:item.category.id
                            }
                        }" class="">{{item.category.name}}</router-link>
                    </div>
                    <div class="desc">
                        {{item.description}}
                    </div>
                </div>
            </li>
        </ul>
        <Empty v-if="data.rows.length === 0 && !isLoading" />
        <!-- 分页放到这里 -->
        <Pager v-if="data.total" :current="routeIofo.page" :total="data.total" :limit="routeIofo.limit"
            :visiableNumber="10" @pageChange="handlePageChange" />
    </div>
</template>

<script>
    import Pager from "@/components/Pager";
    import fetchData from "@/mixins/fetchData.js";
    import mainScroll from "@/mixins/mainScroll.js";
    import Empty from "@/components/Empty";
    import {
        formatDate
    } from "@/utils";
    import {
        getBlogs
    } from "@/api/blog.js"
    export default {
        mixins: [fetchData({
            total: 0,
            rows: []
        }), mainScroll("mainContainer")],
        components: {
            Pager,
            Empty
        },
        methods: {
            async fetchData() {
                return await getBlogs(this.routeIofo.page, this.routeIofo.limit, this.routeIofo.categoryId);
            },
            formatDate,
            handlePageChange(newPage) {
                // 跳转到 当前的分类id  当前的页容量 newPage的页码
                // /article?page=${newPage}&limit=${this.routeInfo.limit}
                // /article/cate/${this.routeInfo.categoryId}?page=${newPage}&limit=${this.routeInfo.limit}

                const query = {
                    page: newPage,
                    limit: this.routeIofo.limit
                }
                if (this.routeIofo.categoryId === -1) {
                    // 当前没有分类
                    this.$router.push({
                        name: "Blog",
                        query
                    })
                } else {
                    // 有分类
                    this.$router.push({
                        name: "CategoryBlog",
                        query,
                        params: {
                            categoryId: this.routeIofo.categoryId
                        }
                    })
                }
            },

        },

        computed: {
            // 获取路由信息
            routeIofo() {
                const categoryId = +this.$route.params.categoryId || -1;
                const page = +this.$route.query.page || 1;
                const limit = +this.$route.query.limit || 10;
                return {
                    categoryId,
                    page,
                    limit
                }
            }
        },
        watch: {
            $route: {
                async handler() {
                    this.isLoading = true;
                    this.$refs.mainContainer.scrollTop = 0;
                    this.data = await this.fetchData();
                    this.isLoading = false;
                }
            }
        }
    }
</script>

<style scoped lang="less">
    @import "~@/styles/var.less";

    .blog-list-container {
        line-height: 1.7;
        position: relative;
        padding: 20px;
        overflow-y: scroll;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        scroll-behavior: smooth;

        ul {
            list-style: none;
            margin: 0;
            padding: 0;
        }
    }

    li {
        display: flex;
        padding: 15px 0;
        border-bottom: 1px solid @gray;

        .thumb {
            flex: 0 0 auto;
            margin-right: 15px;

            img {
                display: block;
                max-width: 200px;
                border-radius: 5px;
            }
        }

        .main {
            flex: 1 1 auto;

            h2 {
                margin: 0;
            }
        }

        .aside {
            font-size: 12px;
            color: @gray;

            span {
                margin-right: 15px;
            }
        }

        .desc {
            margin: 15px 0;
            font-size: 14px;
        }
    }
</style>