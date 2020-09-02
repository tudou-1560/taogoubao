<template>

        <div class="newslist">
            <div class="newsitem" v-for="item in photochildren" :key="item.id"  @click="getDesc(item.id)">
                <div class="img-left">
                    <img @click.stop="clickimg(item.id)" :src="item.img_url" alt="">
                </div>
                <div class="content-right">
                    <div class="van-multi-ellipsis--l2">
                        <div class="title"> {{item.title}} </div>
                    </div>
                    <div class="text-warp">
                        <div class="van-multi-ellipsis--l2">
                            <div class="time allcolor">{{ item.zhaiyao }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    
</template>

<script>
    import {PullRefresh,Toast,Button } from "vant";
    import {getNewsData } from "@/api/index.js";
    export default {
        props:["photochildren"],
        methods:{
            //点击跳转到新闻详情页面
            getDesc(newId){
                this.$router.push(`/getnewdetail/${newId}`);
            },
            clickimg(id){
                this.$emit("img-click",id)
            }
        },
         
    }
</script>

<style lang="scss" scoped>
    .newslist{
        background-color: rgb(238, 238, 238);
        
        .newsitem{
            display: flex;
            border-bottom: 1px solid #ccc;
            margin-top: 2px;
            .img-left{
                display: flex;
                margin: 3px;
                img{
                    width: 100px;
                    height: 100px;
                }
            }
            .content-right{
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                margin-left: 5px;
                .title{
                    font-size: 13px;
                    font-weight: bold;
                    margin-bottom: 14px;
                }
                .text-warp{
                    display: flex;
                    justify-content: space-between;
                    .allcolor{
                        font-size: 12px;
                        color: #888;
                    }
                }
            }
        }
    }
</style>