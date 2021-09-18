<template>
    <div class="empty-container">
        <Icon type="empty" />
        <p>{{ text }}</p>
    </div>
</template>

<script>
    import Icon from "../Icon"
    export default {
        components: {
            Icon
        },
        props: {
            // 要显示的文字
            text: {
                type: String,
                default: "无数据",
            },
        }
    }
</script>

<style lang="less" scoped>
    @import "~@/styles/mixin.less";
    @import "~@/styles/var.less";

    .empty-container {
        .self-center();
        color: @gray;
        text-align: center;
    }
    .icon-contanier {
        font-size: 80px;
    }
</style>