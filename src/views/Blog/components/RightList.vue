<template>
    <ul class="right-list-container">
        <li v-for="(item,i) in list" :key="i">
            <span @click="handleClick(item)" :class="{active:item.isSelect}">{{item.name}}</span>
            <span @click="handleClick(item)" class="aside" v-if="item.aside" :class="{active:item.isSelect}" >{{item.aside}}</span>
            <!-- 显示当前组件，使用组件递归 -->
            <RightList :list="item.children" @select="handleClick" />
        </li>
    </ul>
</template>

<script>
    export default {
        name: "RightList",
        props: {
            // 列表的默认值是：
            // [ {name:'xxx', isSelect:true, children: [ {name:'yyy'} , isSelect:false, ] } ]
            list: {
                type: Array,
                default: () => [],
            }
        },
        methods: {
            handleClick(item) {
                if (!item.isSelect) {
                    this.$emit("select", item)
                }
            }
        }
    }
</script>

<style scoped lang='less'>
    @import "~@/styles/var.less";

    .right-list-container {
        list-style: none;
        padding: 0;

        .right-list-container {
            margin-left: 1em;
        }

        li {
            min-height: 40px;
            line-height: 40px;
            font-size: 14px;
            cursor: pointer;

            .active {
                font-weight: bold;
                color: @warn;
            }
        }
        .aside{
            margin-left: 1em;
            font-size: 12px;
            color: @gray;
        }
    }
</style>