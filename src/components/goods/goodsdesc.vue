<template>
    <div class="gooddesc-container">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="item in lunboinfo" :key="item.src">
                <img :src="item.src" alt="">
            </van-swipe-item>
        </van-swipe>
        
        <div class="goodinfo">
            <div>华为</div>
            <div>-----</div>
            <div>市场价</div>
            <div>购买</div>
        </div>

    </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vant';
import {getdetaillunbo} from "@/api/index.js";
    export default {
        data(){
            return{
                lunboinfo:[],
                gooddetail:[]
            }
        },
        methods:{
            async getlunbo(){
                var id = this.$route.params.goodId;
                console.log(id);
                var {message} = await getdetaillunbo(id);
                console.log(message);
                this.lunboinfo = message;
            }
        },
        created(){
            this.$parent.title ="商品详情";
            this.$parent.bool = false;
            this.getlunbo();
            
        },
        components:{
            "van-swipe":Swipe,
            "van-swipe-item":SwipeItem
        }
    }
</script>

<style lang="scss" scoped>
    .gooddesc-container{
        background-color: rgb(238, 238, 238);
        .my-swipe{
            height: 240px;
            width: 96%;
            padding: 5px 0px 5px 0px;
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
            border-radius: 5px;
            background-color: skyblue;
            margin: 10px 0;
        }
    }
</style>