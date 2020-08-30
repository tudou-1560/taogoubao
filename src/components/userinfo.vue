<template>
    <div>
        个人中心 
    </div>
</template>

<script>
    export default {
        data(){
            return{
                
            }
        },
        created(){
            this.$parent.title="个人中心";
            this.$parent.bool = false;
            this.$parent.active = 2;
        }
    }
</script>

<style lang="scss" scoped>

</style>