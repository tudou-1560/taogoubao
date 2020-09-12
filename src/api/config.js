
//封装axios接口处理请求
import axios from "axios";
import  {Toast} from "vant";
import router from "@/router/router.js";
import store from "@/store/cartStore.js";
import {sleep} from "@/util/tools.js";
console.log(process.env.VUE_APP_TITLE);
const instance = axios.create({
    // baseURL: 'http://api.w0824.com/api'
    // baseURL: 'http://47.107.76.61:6868/api'
    baseURL:process.env.VUE_APP_apiurl,
});

// 添加请求拦截器
instance.interceptors.request.use(async function (config) {
    // 在发送请求之前做些什么

    let token = localStorage.getItem("token") || "";
    token && (config.headers.token = token);
    //清除浏览器端的缓存
    // config.headers['If-Modified-Since'] = 0;
    !store.state.isPending && store.commit("changePending",true);

    // console.log("请求前",store.state.isPending);
    //在请求前延长800毫秒在关闭loading提示
    await sleep(100);
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么

    store.commit("changePending",false)
    // console.log("响应前",store.state.isPending);
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    store.commit("changePending",false)
    let status = error.response.status;
    console.log(status);
    switch(status){
        case 401:
        Toast("用户信息过期,请重新登录")
        router.push("/login");
        break;
        default:
            Toast("网络错误，请稍后再试");
    }
    // return Promise.reject(error);
});


export default instance;
