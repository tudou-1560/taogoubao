<template>
    <div class="gooddesc-container">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="item in lunboinfo" :key="item.src">
                <img :src="item.src" alt="">
            </van-swipe-item>
        </van-swipe>
        
        <div class="goodinfo">
            <div class="title">{{ gooddetail.title }}</div>
            <van-divider 
                 :style="{ color: '#b9bbc0' }"
            />
            <div class="sell">
                <del class="price market_price">市场价：&yen;{{ gooddetail.market_price }}</del>
                本店价:
                <span class="price sell_price">&yen;{{ gooddetail.sell_price }}</span>
            </div>
            <div class="buy">
                <span>购买数量：</span>
                <van-stepper v-model="value" />
            </div>
        </div>
        <!-- 其他信息 -->
        <div class="goodrest">
            <van-divider :style="{ color: '#b9bbc0' }">其他信息</van-divider>
            <div class="title">商品货号：{{ gooddetail.goods_no }}</div>
            <div>
                <span class="count">库存情况：{{ gooddetail.stock_quantity }}件</span>
            </div>
            <div class="time">
                <span>上架时间：{{ gooddetail.add_time | getDataFormat }}</span>
            </div>
        </div>
        <div class="gooddetail" >
            <van-divider :style="{ color: '#b9bbc0' }">介绍</van-divider>
            <div class="content"  v-html="gooddetail.content"></div>
        </div>
        <van-goods-action>
                <van-goods-action-icon to="/mycar" icon="cart-o" text="购物车" :badge="this.$store.getters.totalCart" />
                <van-goods-action-icon icon="shop-o" text="店铺" badge="" />
                <van-goods-action-button type="warning" @click="addCart" text="加入购物车" />
                <van-goods-action-button type="danger" text="立即购买" />
        </van-goods-action>
    </div>
</template>

<script>
import { Swipe, SwipeItem,Divider ,Stepper,GoodsAction, GoodsActionIcon, GoodsActionButton  } from 'vant';
import {getdetaillunbo,getdetailinfo} from "@/api/index.js";
    export default {
        data(){
            return{
                lunboinfo:[],
                gooddetail:{},
                value:""
            }
        },
        methods:{
            async getlunbo(){
                var id = this.$route.params.goodId;
                var {message} = await getdetaillunbo(id);
                this.lunboinfo = message;
            },

            async getdetail(){
                var id = this.$route.params.goodId;
                var {message} = await getdetailinfo(id);
                this.gooddetail = message;
            },
            addCart(){
                var goods = {
                    id:this.gooddetail.id,
                    number:this.value,
                    price:this.gooddetail.sell_price,
                    selected:true
                }
                this.$store.commit("addCart",goods);
            },
            
            
        },
        created(){
            this.$parent.title ="商品详情";
            this.$parent.bool = false;
            this.$parent.flag = false;
            this.getlunbo();
            this.getdetail();
            
        },
        components:{
            "van-swipe":Swipe,
            "van-swipe-item":SwipeItem,
            "van-divider":Divider,
            "van-stepper":Stepper,
            "van-goods-action":GoodsAction,
            "van-goods-action-icon":GoodsActionIcon,
            "van-goods-action-button":GoodsActionButton
        }
    }
</script>

<style lang="scss" scoped>
    .gooddesc-container{
        background-color: rgb(238, 238, 238);
        .my-swipe{
            height: 240px;
            width: 96%;
            padding: 5px 0px 0px 0px;
            margin: 0px auto;
           
            .van-swipe-item {
                background-color: #fff;
                text-align: center;
                border-radius: 5px;
                overflow: hidden;
                img {
                    width: 245px;
                    height: 100%;
                    
                }
            }
        }
        .goodinfo{
            display: flex;
            flex-direction: column;
            border-radius: 5px;
            background-color: #fff;
            width: 96%;
            margin: 5px auto;
            .title{
                padding-top: 10px;
                padding-left: 10px;
            }
            .sell{
                padding-bottom: 10px;
                padding-left:10px ;
                .sell_price{
                    color: red;
                    font-weight: 700;
                }
                .market_price{
                    padding-right: 20px;
                }

            }
            .buy{
                display: flex;
                padding-bottom: 10px;
                padding-left:10px ;
            }
        }
        .goodrest{
            display: flex;
            flex-direction: column;
            border-radius: 5px;
            background-color: #fff;
            width: 96%;
            margin: 5px auto;
            .title{
                padding-left: 10px;
            }
            .count{
                padding-bottom: 10px;
                padding-left:10px ;
            }
            .time{
                display: flex;
                padding-bottom: 10px;
                padding-left:10px ;
            }
        }
        .gooddetail{
            display: flex;
            flex-direction: column;
            border-radius: 5px;
            background-color: #fff;
            width: 96%;
            margin: 5px auto;
            ::v-deep.content{
                img{
                    width: 100%;
                }
                p{
                    width: 96%;
                    font-size: 16px;
                    color: #333;
                    padding: 10px;
                    img{
                        width: 100%;
                    }
                }
                table{
                    width: 100%;
                    tbody{
                        tr {
                            td{
                                img{
                                    width: 100%;
                                }
                            }
                        }
                        
                    }
                }
                
                
            }
            

        }
    }
</style>