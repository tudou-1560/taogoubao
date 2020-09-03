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
        },
        //改变购物车商品的选中状态
        changeGoodSelected(state,obj){
            // console.log(obj);
            //查找匹配出属于当前商品并放回下标
                let index = state.cartData.findIndex(v=>{
                   return v.id == obj.goodsId; 
                })
                // console.log(index);
                //将状态赋值给对应的商品
                state.cartData[index].selected = obj.selected;
                //重新赋值道本地存储
                localStorage.setItem("carData",JSON.stringify(state.cartData))
        },
        //改变购物车商品的数量
        changeGoodNumber(state,obj){

            let index = state.cartData.findIndex(v=>{
                return v.id == obj.goodsId
            })
            state.cartData[index].number = obj.number;
            localStorage.setItem("carData",JSON.stringify(state.cartData))
        },
        //删除购物车中的商品
        delCartGood(state,goodId){
            
            let index = state.cartData.findIndex(v=>{
                return v.id == goodId
            })
            state.cartData.splice(index,1);
            localStorage.setItem("carData",JSON.stringify(state.cartData))
        }
    },
    getters:{
        //计算购物车中的商品总数
        totalCart(state){
            let count = 0;
            state.cartData.map((v)=>{
                count += parseInt(v.number);
            })
            return count;
        },
        //获取购物车中的数据
        getGoodsId(state){
            let ids = [];
            state.cartData.map(v=> ids.push(v.id))
            var str = ids.join(",");
            return str;
        },
        //获取购物车中商品购买数量
        getGoodNumber(state){
            var obj = {};
            state.cartData.map(v=>{
                obj[v.id] = v.number;
            })
            return obj;
        },
        //获取商品的选中状态
        getGoodSelected(state){
            var obj = {};
            state.cartData.map(v=>{
                obj[v.id] = v.selected;
            })
            return obj;
        },
        // 获取购物车选中的商品数量
        getGoodSelectedNumber(state){
            let count = 0;
            state.cartData.map(v=>{
                count += v.number
            })
            return count;
        },
        //获取选中商品的价格
        getGoodSelectedPrice(state){
            let count = 0;
            state.cartData.map(v=>{
                if(v.selected == true){
                    count += v.number * v.price;
                }
            })
            return count*100;
        }
    }
    
})

export default store;