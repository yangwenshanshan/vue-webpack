import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './routers'
import store from './store';
import './style/reset.css'
import "@/components/index";

Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})