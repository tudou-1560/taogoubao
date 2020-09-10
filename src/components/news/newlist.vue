<template>
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <div class="newslist">
      <div class="newsitem" v-for="item in newslist" :key="item.id" @click="getDesc(item.id)">
        <div class="img-left">
          <img :src="item.img_url" alt />
        </div>
        <div class="content-right">
          <!-- 最多显示两行 -->
          <div class="van-multi-ellipsis--l2">
            <div class="title">{{ item.title }}</div>
          </div>
          <div class="text-warp">
            <div class="time allcolor">发布时间：{{ item.add_time | getDataFormat}}</div>
            <div class="read allcolor">点击：{{item.click}}次</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 加载更多 -->
    <van-button type="primary" block :loading="isMore" loading-text="加载中..." @click="loadMore">加载更多</van-button>
  </van-pull-refresh>
</template>

<script>
import { PullRefresh, Toast, Button } from "vant";
import { getNewsData } from "@/api/index.js";
// import moment from "moment";
export default {
  name: "newlist-components",
  data() {
    return {
      newslist: [],
      page: 1,
      pageSize: 10,
      isLoading: false,
      isMore: false,
      hasDate: true,
      isLoading: false,
    };
  },
  methods: {
    async getnews() {
      if (this.hasDate == false) {
        Toast("亲，没有更多数据了");
        this.isMore = false;
        return;
      }
      var { message } = await getNewsData(this.page, this.pageSize);
      this.isMore = false;
      if (message.length == 0) {
        Toast("没有更多数据了");
        this.hasDate = false;
        // this.isMore = false;
        return;
      }
      this.newslist = this.newslist.concat(message);
      // this.isMore = false;
    },
    onRefresh() {
      // this.page ++
      this.page = 1;
      (this.newslist = []), (this.hasDate = true);
      setTimeout(() => {
        Toast("刷新成功");
        this.isLoading = false;
        this.getnews();
      }, 1000);
    },
    //点击加载更多
    loadMore() {
      this.page++;
      this.isMore = true;
      this.getnews();
    },
    //点击跳转到新闻详情页面
    getDesc(newId) {
      this.$router.push(`/getnewdetail/${newId}`);
    },
  },
  components: {
    "van-pull-refresh": PullRefresh,
    "van-button": Button,
  },
  created() {
    this.getnews();
    this.$parent.title = "新闻列表";
    this.$parent.bool = false;
  },
  activated: function () {
    // this.getgoodlist();
    this.$parent.title = "新闻列表";
    this.$parent.bool = false;
    console.log("activated");
  },
  deactivated: function () {
    this.$parent.bool = true;
    console.log("deactivated");
  },
};
</script>

<style lang="scss" scoped>
.newslist {
  background-color: rgb(238, 238, 238);

  .newsitem {
    display: flex;
    border-bottom: 1px solid #ccc;
    margin-top: 2px;
    .img-left {
      display: flex;
      margin: 3px;
      img {
        width: 100px;
        height: 100px;
      }
    }
    .content-right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 5px;
      .title {
        font-size: 13px;
        font-weight: bold;
        margin-bottom: 14px;
      }
      .text-warp {
        display: flex;
        justify-content: space-between;
        .allcolor {
          font-size: 12px;
          color: #888;
        }
        .item {
        }
        .read {
        }
      }
    }
  }
}
</style>