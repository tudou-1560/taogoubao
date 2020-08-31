import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import home from "@/components/home.vue";
import mycar from "@/components/mycar.vue";
import userinfo from "@/components/userinfo.vue";
import newlist from "@/components/news/newlist.vue";
import goodslist from "@/components/goods/goodslist.vue";
import goodsdesc from "@/components/goods/goodsdesc.vue";
import newsdesc from "@/components/news/newdesc.vue";
const router = new VueRouter({
  routes :[
    {path: '/', redirect: 'home'},
    {path: '/home',component:home , name: 'home'},
    {path: '/mycar',component:mycar},
    {path: '/userinfo',component:userinfo},
    {path: '/newlist',component:newlist},
    {path: '/goodslist',component:goodslist},
    {path : '/goodsdesc/:goodId',component:goodsdesc},
    {path : '/getnewdetail/:newId',component:newsdesc},

  ]
})

export default router
