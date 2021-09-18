<template>
    <!-- 只有总页数大于1时才显示 -->
    <div class="page-container" v-if="pageNumber > 1">
        <a @click="handleClick(1)" :class="{disabled: current === 1}">|&lt;&lt;</a>
        <a @click="handleClick(current - 1)" :class="{disabled: current === 1}">&lt;&lt;</a>
        <a @click="handleClick(n)" v-for="(n,i) in numbers" :key="i" :class="{active : n === current}">{{n}}</a>
        <a @click="handleClick(current + 1)" :class="{disabled: current === pageNumber}">&gt;&gt;</a>
        <a @click="handleClick(pageNumber)" :class="{disabled: current === pageNumber}">&gt;&gt;|</a>
    </div>
</template>

<script>
    export default {
        // 定义属性
        props: {
            // 当前页码
            current: {
                type: Number,
                default: 1
            },
            // 总数据量
            total: {
                type: Number,
                default: 0
            },
            // 页容量
            limit: {
                type: Number,
                default: 10
            },
            // 可见页码数
            visibleNumber: {
                type: Number,
                default: 10
            }
        },
        computed: {
            // 总页数
            pageNumber() {
                return Math.ceil(this.total / this.limit)
            },
            // 得到显示的页码中最小的数字
            visibleMin() {
                let min = this.current - Math.floor(this.visibleNumber / 2);
                if (min < 1) {
                    min = 1;
                }
                return min;
            },
            visibleMax() {
                let max = this.visibleMin + this.visibleNumber - 1;
                if (max > this.pageNumber) {
                    max = this.pageNumber;
                }
                return max;
            },
            numbers() {
                let nums = [];
                for (let i = this.visibleMin; i <= this.visibleMax; i++) {
                    nums.push(i);
                }
                return nums;
            }
        },
        methods: {
            handleClick(newPage) {
                if (newPage < 1) {
                    newPage = 1;
                }
                if (newPage > this.pageNumber) {
                    newPage = this.pageNumber;
                }
                if (newPage === this.current) {
                    return;
                }
                // 抛出一个事件
                this.$emit("pageChange", newPage)
            }
        }
    }
</script>

<style lang='less' scoped>
    // 导入定义模块
    @import "~@/styles/var.less";

    .page-container {
        display: flex;
        justify-content: center;
        margin: 20px 0;

        a {
            color: @primary;
            margin: 0 6px;
            cursor: pointer;

            &.disabled {
                color: @lightWords;
                cursor: not-allowed;
            }

            &.active {
                color: @words;
                font-weight: bold;
                cursor: text;
            }
        }
    }
</style>