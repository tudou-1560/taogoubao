import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import home from "@/components/home.vue";
import mycar from "@/components/mycar.vue";
import userinfo from "@/components/userinfo.vue";
import newlist from "@/components/news/newlist.vue";

const router = new VueRouter({
  routes :[
    {path: '/', redirect: 'home'},
    {path: '/home',component:home , name: 'home'},
    {path: '/mycar',component:mycar},
    {path: '/userinfo',component:userinfo},
    {path: '/newlist',component:newlist},
  ]
})

export default router
