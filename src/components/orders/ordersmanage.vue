<template>
    <div class="orders-container">

    </div>
</template>

<script>
    import { Tab, Tabs } from 'vant';
    export default {
        created(){
            this.$parent.title = "我的订单";
            this.$parent.bool = false;
            this.$parent.flag = false;
        }
    }
</script>

<style lang="scss" scoped>

</style>