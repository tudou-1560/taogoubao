import { setTimeout } from "core-js";
import { min } from "moment";

//定义一个定时器
export function sleep(time){

    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve();
        },time)
    })
}

//校验用户信息
export function userInfo(){

    let user;
    try {
        user = JSON.parse(localStorage.getItem("userInfo")); 
    } catch (error) {
        return false
    }

    let token = localStorage.getItem("token");
    if(!token){
        return false;
    }

    return user;
}

//生成订单号
export function getOrderId(){

    let randomNumber = ""
    for(let i=0;i<6;i++){
        randomNumber += Math.floor(Math.random()*10)
    }

    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    const formatNumber = n=>{
        n = n.toString();
        return n[1] ? n : "0"+n;
    }

    return [year,month,day,hour,minute,second].map(formatNumber).join("") + randomNumber;
}

