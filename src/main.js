//入口文件
import Vue from 'vue'
//导入APP根组件
import App from './App.vue'
//按需导入mint-ui
import { Header } from 'mint-ui'
Vue.component(Header.name, Header);

//导入mui
import './lib/css/mui.min.css'
import './lib/css/icons-extra.css'

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
});
