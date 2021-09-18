<template>
  <div v-loading="loading" class="home-container" ref="container" @wheel="handleWheel">
    <ul class="carousel-container" :style="{
          marginTop
          }"
          @transitionend="handleTransitionEnd"
        >
      <li v-for="item in data" :key="item.id">
        <CarouselItem :carousel="item"/>
      </li>
    </ul>
    <div class="icon icon-up" v-show="index >= 1" @click="switchTo(index - 1)">
      <Icon type="arrowUp" />
    </div>
    <div class="icon icon-down" v-show="index < data.length - 1" @click="switchTo(index + 1)">
      <Icon type="arrowDown" />
    </div>
    <ul class="indicator">
      <li :class="{ active:index===i }" @click="switchTo(i)" v-for="(item,i) in data" :key="item.id"></li>
    </ul>
  </div>

</template>

<script>
  import CarouselItem from "./Carouselitem.vue";
  import Icon from "@/components/Icon";
  import { mapState } from "vuex";
  export default {
    components: {
      CarouselItem,
      Icon,
    },
    data() {
      return {
        // isLoading:true, // 是否在加载中
        // banners: [],
        // 该代码放在混合组件中

        index: 0, // 当前显示的是第几张轮播图
        containerHeight: 0, // 整个容器的高度
        switching: false, // 是否在翻页中
      }
    },
    // async created() {
    //   this.banners = await getBanners();
    //   this.isLoading = false;
    // },
    created(){
      this.$store.dispatch("banner/fetchBanner")
    },
    mounted() {
      this.containerHeight = this.$refs.container.clientHeight;
      // 监听视图是否发生变化，变化了就重新渲染一次
      window.addEventListener("resize", this.handleResize);
    },
    destroyed() {
      window.removeEventListener("resize", this.handleResize);
    },
    computed: {
      marginTop() {
        return -this.index * this.containerHeight + "px";
      },
      ...mapState("banner",["loading","data"])
    },
    methods: {
      // 轮播图切换
      switchTo(i) {
        this.index = i;
      },
      handleWheel(e) {
        if (this.switching) {
          return;
        }
        if (e.deltaY <= -125 && this.index > 0) {
          this.switching = true;
          this.index--;
        } else if (e.deltaY >= 125 && this.index < this.data.length - 1) {
          this.switching = true;
          this.index++;
        }
      },
      handleTransitionEnd() {
        this.switching = false;
      },
      handleResize() {
        this.containerHeight = this.$refs.container.clientHeight;
      },
      // // 获取远程数据
      // async fetchData(){
      //   return await getBanners();
      // }
    }
  };
</script>

<style scoped lang="less">
  @import "~@/styles/mixin.less";
  @import "~@/styles/var.less";

  .home-container {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;

    // 测试
    // width: 60%;
    // height: 40%;
    // overflow: visible;
    // border: 2px solid red;
    // margin: 30px auto;

    ul {
      margin: 0;
      list-style: none;
      padding: 0;
    }
  }

  .carousel-container {
    width: 100%;
    height: 100%;
    transition: 500ms;

    li {
      width: 100%;
      height: 100%;
    }
  }

  .icon {
    @gap: 20px;
    .self-center();
    font-size: 30px;
    color: @gray;
    cursor: pointer;
    transform: translateX(-50%);

    &.icon-up {
      top: @gap;
      animation: jump-up 2s infinite;
    }

    &.icon-down {
      top: auto;
      bottom: @gap;
      animation: jump-down 2s infinite;
    }
  }

  .indicator {
    .self-center();
    transform: translateY(-50%);
    left: auto;
    right: 20px;

    li {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: @words;
      cursor: pointer;
      margin-bottom: 10px;
      border: 1px solid #fff;
      box-sizing: border-box;
      transition: 500ms;

      &.active {
        background: #fff;
      }
    }
  }

  @jump: 10px;

  @keyframes jump-up {
    0% {
      transform: translate(-50%, @jump);
    }

    50% {
      transform: translate(-50%, -@jump);
    }

    100% {
      transform: translate(-50%, @jump);
    }
  }

  @keyframes jump-down {
    0% {
      transform: translate(-50%, -@jump);
    }

    50% {
      transform: translate(-50%, @jump);
    }

    100% {
      transform: translate(-50%, -@jump);
    }
  }
</style>