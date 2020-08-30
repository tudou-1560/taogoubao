import Vue from 'vue'
import App from './App.vue'

import router from './router/router.js';
import axios from "axios"
import "@/util/filter.js"

Vue.prototype.$axios = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
