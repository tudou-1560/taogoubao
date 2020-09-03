import Vue from "vue";
import vuex from "vuex"


Vue.use(vuex);

var cartData = JSON.parse(localStorage.getItem("carData") || "[]"); 
var store = new vuex.Store({
    state:{
        cartData:cartData
    },
    mutations:{
        addCart(state,goods){
            // var index;
            // let hasGood = state.cartData.some((item,k)=>{
            //     index = k;
            //     return item.id = goods.id
            // })
            let hasGood = state.cartData.findIndex((item)=>{
                return item.id == goods.id
            })
            //如果存在这个商品，在原来的数量上+=
            if(hasGood >=0){
                // state.cartData[index].number  += goods.number;
                state.cartData[hasGood].number  += goods.number;
            }else{
                state.cartData.push(goods)
            }
            localStorage.setItem("carData",JSON.stringify(state.cartData))
        }
    },
    getters:{
        totalCart(state){
            let count = 0;
            state.cartData.map((v)=>{
                count += parseInt(v.number);
            })
            return count;
        }
    }
    
})

export default store;