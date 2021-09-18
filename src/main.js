import Vue from 'vue';
import App from './App.vue';
import './styles/global.less';
import router from './router';
import "./mock";
import "./eventBus";
import store from './store';
store.dispatch("setting/fetchSetting");

// 弹出消息，将其放至原型上，方便调用
import { showMessage } from './utils';
Vue.prototype.$showMessage = showMessage;


// 注册全局指令
import vLoading from "./directives/loading";
import vLazy from "./directives/lazy";
Vue.directive("loading", vLoading);
Vue.directive("lazy",vLazy);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

