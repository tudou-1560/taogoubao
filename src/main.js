import Vue from 'vue'
import App from './App.vue'

import router from './router/router.js';
import axios from "axios"
import "@/util/filter.js"
import vuex from "vuex";
Vue.use(vuex);

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

import store from "@/store/cartStore.js"
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
