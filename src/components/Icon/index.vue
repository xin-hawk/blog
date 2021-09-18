<template>
<div class="icon-contanier">
  <i class="iconfont" :class="fontClass"></i>
</div>
</template>

<script>
const classMap = {
  home: "iconzhuye",
  success: "iconzhengque",
  error: "iconcuowu",
  close: "iconguanbi",
  warn: "iconjinggao",
  info: "iconxinxi",
  blog: "iconblog",
  code: "iconcode",
  about: "iconset_about_hov",
  weixin: "iconweixin",
  mail: "iconemail",
  github: "icongithub",
  qq: "iconsign_qq",
  arrowUp: "iconiconfonticonfonti2copy",
  arrowDown: "iconiconfonticonfonti2",
  empty: "iconempty",
  chat: "iconliuyan",
};
export const types = Object.keys(classMap);
export default {
    props:{
        type:{
            type:String,
            required:true
        },
    },
    computed:{
        //图标类样式，用来映射
        fontClass(){
            return classMap[this.type]
        }
    }
}
</script>

<style scoped>
@import "//at.alicdn.com/t/font_2164449_nalfgtq7il.css";
.iconfont {
    /* 只需继承 */
  color: inherit;
  font-size: inherit;
}
</style>
