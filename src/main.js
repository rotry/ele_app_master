import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入axios包
import request from './utils/request';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false;
Vue.prototype.$axios = request;
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
