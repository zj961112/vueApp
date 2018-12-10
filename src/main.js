//入口文件
import Vue from 'vue'

//1.1导入路由的包
import VueRouter from 'vue-router'
//1.2安装路由
Vue.use(VueRouter);

//2.1导入vue-resource
import VueResource from 'vue-resource'
//2.2安装vue-resource
Vue.use(VueResource)

//导入APP根组件
import App from './App.vue'
//1.3导入自己的router.js路由模块
import router from './router'
//按需导入mint-ui
import { Header, Swipe, SwipeItem } from 'mint-ui'
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

//导入mui
import './lib/css/mui.min.css'
import './lib/css/icons-extra.css'

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router   //1.4挂载路由对象到VM实例上
});
