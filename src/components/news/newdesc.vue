<template>
    <div class="newdesc-container">
        <div class="newdetail">
            <h3>{{ newsdata.title }}</h3>
            <div class="info" >
                <span class="item time">发布时间:{{newsdata.add_time | getDataFormat}}</span>
                <span class="item read">阅读 {{ newsdata.click }}次</span>
            </div>
            <!-- 文章详细信息 -->
            <div class="content" v-html="newsdata.content">

            </div>
            <!-- 留言区 -->
            <van-field
                v-model="msg"
                rows="2"
                autosize
                type="textarea "
                maxlength="50"
                placeholder="请输入留言"
                show-word-limit
            />
            <div class="comment">
                <van-button type="info" block @click="postcomment">评论</van-button>
                    <div class="comment-content" v-for="item in commentdata" :key="item.id">
                        <span>{{item.user_name}}：{{ item.content }}</span>
                        <span>评论时间：{{ item.add_time | getDataFormat }}</span>
                    </div>
                    <van-button 
                    plain  
                    hairline
                    type="danger"
                    block
                    :isloading="isloading"
                    class="comment-title"
                    @click="leadMore"
                    >查看更多</van-button>
                </div>
            </div>
    </div>
</template>

<script>
    import { Field,Button,Toast  } from 'vant';
    import {getnewdetail,getcommentdata,postcommentdata} from "@/api/index.js";
    export default {
        data(){
            return{
                msg:"",
                newsdata:{},
                commentdata:[],
                pageindex:1,
                isloading:false
            }
        },
        methods:{
            async getnewdata(){
                let id = this.$route.params.newId;
                let {message} = await getnewdetail(id);
                this.newsdata = message[0];
            },
            //获取评论数据
            async getcomdata(){
                let id = this.$route.params.newId;
                let {message} = await getcommentdata(id,this.pageindex);
                this.isloading = false;
                this.commentdata = this.commentdata.concat(message);
            },
            // 查看更多
            leadMore(){
                this.pageindex ++;
                this.getcomdata();
            },
            async postcomment(){
                let msg = this.msg.trim();
                console.log(msg);
                if(msg == ""){
                    Toast("评论内容不能为空");
                    return;
                }
                let id = this.$route.params.newId;
                let {message,insertId,status} = await postcommentdata(id);
                if(status == 0){
                    Toast(message);
                    this.msg = "";
                    let info = {
                        add_time: Date.now(),
                        content:msg,
                        id:insertId,
                        user_name:"吃瓜群众",
                    }
                    this.commentdata.unshift(info)
                }else{
                    Toast(message);
                }
                
            }

        },
        created(){
            this.$parent.title = "新闻详情";
            this.$parent.bool = false;
            this.getnewdata();
            this.getcomdata();
        },
        components:{
            "van-field":Field,
            "van-button":Button
        }
    }
</script>

<style lang="scss" scoped>
    .newdesc-container{
        background-color: #f6f6f6;
        .newdetail{
            padding: 10px;
            .info{
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid #888;
                padding-bottom: 5px;
                .item{
                    color: #888;
                    font-size: 13px;
                }
            }
            ::v-deep.content{
                p{
                    img{
                        width: 100%;
                    }
                }
            }
            .comment{
                .van-button{
                    margin-top: 10px;
                }
                .comment-content{
                    display: flex;
                    flex-direction: column;
                    background-color: #ccc;
                    margin: 10px auto;
                }
                
            }
            
        }
    }
</style>