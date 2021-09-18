<template>
    <div class="site-aside-container">
        <template v-if="data">
            <Avatar :url="data.avatar" />
            <h1 class="title">{{ data.siteTitle }}</h1>
        </template>
        <Menu v-if="data"/>
        <Contact v-if="data"/>
    </div>
</template>

<script>
    import Avatar from "@/components/Avatar";
    import Menu from "./Menu";
    import Contact from "./Contact";
    import {
        mapState
    } from "vuex";
    export default {
        components: {
            Avatar,
            Menu,
            Contact
        },
        computed: mapState("setting", ["data"]),
    }
</script>

<style scoped lang="less">
    @import "~@/styles/var.less";

    .site-aside-container {
        width: 100%;
        height: 100%;
        background: @dark;
        padding: 20px 0;
        box-sizing: border-box;
        overflow-x: hidden;
        overflow-y: auto; //这里有点问题，滚动与隐藏

        .title {
            font-size: 1.2em;
            color: #fff;
            text-align: center;
        }
    }

    .avatar-container {
        margin: 0 auto;
    }
</style>