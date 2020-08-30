<template>
    <div class="car-ontainer">
        <h3>
            亲，您的购物车为空，去 <a href="">首页</a> 逛逛吧!
        </h3>
        <div class="car-img">
            <img src="../assets/images/car.png" alt="">
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                
            }
        },
        created(){
            this.$parent.title = "我的购物车";
            this.$parent.bool=false;
            this.$parent.active = 1;
        }
    }
</script>

<style lang="scss" scoped>
    .car-ontainer{  
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        h3{
            text-align: center;
        }
        .car-img{
            text-align: center;
            img{
                width: 80%;
                
            }
        }
    }
</style>