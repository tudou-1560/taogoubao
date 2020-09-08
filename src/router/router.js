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
import photolist from "@/components/photo/photoshow.vue";
import login from "@/components/users/login.vue";
import register from "@/components/users/register.vue";
import addressmanager from "@/components/address/addressmanage.vue";
import addressadd from "@/components/address/addressadd.vue";
import addressedit from "@/components/address/addressedit.vue";
import ordersmanage from "@/components/orders/ordersmanage.vue";
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
    {path : '/photolist',component:photolist},
    {path : '/login',component:login},
    {path : '/register',component:register},
    {path : '/addressmanager',component:addressmanager},
    {path : '/addressadd',component:addressadd},
    {path : '/addressedit/:addressinfo',component:addressedit},
    {path : '/ordersmanage',component:ordersmanage},
  ]
})

export default router
