<template>
    <div class="user-container">
        <div class="userlist">
            <div class="thetop">
                <div class="logo-top">
                    <van-image
                        round
                        width="5rem"
                        height="5rem"
                        :src="require('../assets/images/person.jpg')"
                        @click="showImg"
                    />
                    <div class="username">
                        <span>用户名：curry</span>
                    </div>
                </div>
                <van-cell title="修改密码" is-link />
                <van-cell title="我的订单" is-link />
                <van-cell title="地址管理" is-link />
            </div>

            <div class="about">
                <van-cell title="提交反馈" is-link />
                <van-cell title="关于乐淘" is-link />
            </div>
        </div>
        
    </div>
</template>

<script>
    import { Cell, CellGroup,Image as VanImage ,ImagePreview } from 'vant';
    export default {
        data(){
            return{
                photo:[require("../assets/images/person.jpg")],
            }
        },
        methods:{
            showImg(){
                ImagePreview({
                    images:this.photo,
                    showIndex:false,
                    maxZoom:3,
                    minZoom:1/3
                });
            }
        },
        components:{
            "van-cell-group":CellGroup,
            "van-cell":Cell,
            "van-image":VanImage 
        },
        created(){
            this.$parent.title="个人中心";
            this.$parent.bool = false;
            this.$parent.active = 2;
        }
    }
</script>

<style lang="scss" scoped>
    .user-container{
        .userlist{
            .thetop{
                .logo-top{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 5px;
                    background-color: #fff;
                    .van-image{
                        margin-left: 16px;
                    }
                    .username{
                        font-size: 18px;
                        color: #5d5555;
                        margin-right: 50px;
                    }
                }
            }
            .about{
                margin-top: 15px;
            }
            
        }
    }
</style>