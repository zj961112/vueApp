//入口文件
import Vue from 'vue'

//1.1导入路由的包
import VueRouter from 'vue-router'
//1.2安装路由
Vue.use(VueRouter);

//导入格式化时间的插件
import moment from 'moment'
//定义全局的过滤器
Vue.filter('dateFormat',function (dataStr,pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
});


//2.1导入vue-resource
import VueResource from 'vue-resource'
//2.2安装vue-resource
Vue.use(VueResource)
//设置全局post时候表单数据格式组织形式   application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;

//导入APP根组件
import App from './App.vue'
//1.3导入自己的router.js路由模块
import router from './router'
//按需导入mint-ui
// import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
// //设置全局变量
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);
//图片懒加载需要全部导入mint-ui所以这里不能按需导入了
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI);

//安装 图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview);
import './lib/css/global.css'

//导入mui
import './lib/css/mui.min.css'
import './lib/css/icons-extra.css'

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router   //1.4挂载路由对象到VM实例上
});
