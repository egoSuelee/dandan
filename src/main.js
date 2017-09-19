import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routes from './router/router'
import './config/rem' //配置rem的值
import api from './config/api'
import store from './store/'  //引用vuex(单一状态管理树/单例)
import FastClick from 'fastclick' //处理移动浏览器点击会有300ms的延迟


if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}


Vue.use(VueRouter)
const router = new VueRouter({
	routes,
	strict: process.env.NODE_ENV !== 'production'
})


Vue.prototype.$api = api // 将API方法绑定到全局
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
