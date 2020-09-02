<template>
    <div class="photo-container">
        <van-tree-select
            @click-nav="cliHandle"
            :items="items"
            :active-id.sync="activeId"
            :main-active-index.sync="activeIndex"
        >
        <template #content>
            <news v-if="isShowNews"  @img-click="thumb" :photochildren="items[activeIndex].children"></news>
        </template>

        </van-tree-select>
    </div>
</template>

<script>
    import { TreeSelect, Loading,Toast,ImagePreview } from 'vant';
    import {getphotocategory,getcategorylisdata,getthumbdata} from "@/api/index.js";
    import news from "@/components/common/news.vue";
    export default {
         data() {
            return {
            items: [],
            activeId: 1,
            activeIndex: 0,
            isShowNews:false
            };
        },
        methods:{
            //获取分类数据
            async getcategory(){
                let { message } = await getphotocategory(); 
                //获取第一个类型的列表数据
                let first_id = message[0].id;
                // console.log(first_id);
                //获取第一个类型的列表数据
                let first_children = await this.getcategorylist(first_id);
                // console.log(first_children);
                message[0].children = first_children;
                message.map(v=>{
                    v.text = v.title;
                })
                this.items = message;

                this.isShowNews = true;
            },
            //获取指定类型的数据列表
            async getcategorylist(id){
                let {message} = await getcategorylisdata(id);
                message.map(v=>{
                    v.text = v.title;
                })
                return message
            },
            async cliHandle(index){
                this.isShowNews = false;
                var id = this.items[index].id;
                var children = await this.getcategorylist(id);
                console.log(children);
                this.items[index].children = children;
                this.isShowNews = true;
            },
            async thumb(id){
                let {message} = await getthumbdata(id);

                if(!message.length){
                    Toast("暂无图片");
                    return;
                }
                let thumbArr = [];
                message.map(v=>{thumbArr.push(v.src)});
                ImagePreview(thumbArr);
            }
        },  
        created(){
            this.$parent.title = "美图欣赏";
            this.$parent.bool = false;
            this.getcategory();
        },
        components:{
            "van-tree-select":TreeSelect,
            news
        }
    }
</script>

<style lang="scss" scoped>
    .photo-container{
        .van-tree-select {
            height: 100vh !important;
        }
    }
</style>