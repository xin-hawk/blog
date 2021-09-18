import Vue from 'vue';
import VueRouter from "vue-router";
import routes from "./routes"; //导入路由路径规则
import {
  titleController
} from "@/utils";

if (!window.VueRouter) {
  Vue.use(VueRouter); //使用vue-router插件
}

const router = new VueRouter({
  routes, //路由匹配规则
  mode: 'history',
});

router.afterEach((to) => {
  if (to.meta.title) {
    titleController.setRouteTitle(to.meta.title)
  }
})
export default router;