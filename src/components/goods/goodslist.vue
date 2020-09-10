<template>
  <div class="goods-container">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="goodlist">
        <ul>
          <li v-for="item in goodlist" :key="item.id" @click="getDesc(item.id)">
            <div class="item-img">
              <img :src="item.img_url" alt />
            </div>
            <div class="text">
              <div class="van-multi-ellipsis--l2">
                <div class="item-desc">{{ item.title }}</div>
              </div>
              <div class="item-price">
                <span class="price">&yen;{{ item.sell_price }}</span>
                <del class="buy">&yen;{{ item.market_price }}</del>
              </div>
              <div class="item-hot">
                <span class="hot title-color">热卖中</span>
                <del class="num title-color">剩余{{item.stock_quantity}}件</del>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </van-pull-refresh>

    <van-button type="primary" block :loading="isMore" loading-text="加载中..." @click="loadMore">加载更多</van-button>
  </div>
</template>

<script>
// import {} from "vant";
import { getGoodslistData } from "@/api/index.js";
import { PullRefresh, Button, Toast } from "vant";
export default {
  name:"goodlist-components",
  data() {
    return {
      goodlist: [],
      pageNum: 1,
      isMore: false,
      hasData: true,
      isLoading: false,
    };
  },
  methods: {
    async getgoodlist() {
      if (this.hasData == false) {
        Toast("亲,没有更多数据了");
        this.isMore = false;
        return;
      }
      var { message } = await getGoodslistData(this.pageNum);
      this.isMore = false;
      if (message.length == 0) {
        Toast("没有更多数据了");
        this.hasData = false;
        return;
      }
      this.goodlist = this.goodlist.concat(message);
    },
    loadMore() {
      this.pageNum++;
      this.isMore = true;
      this.getgoodlist();
    },
    onRefresh() {
      this.pageNum = 1;
      this.goodlist = [];
      this.hasData = true;
      setTimeout(() => {
        Toast("刷新成功");
        this.isLoading = false;
        this.getgoodlist();
      }, 1000);
    },
    getDesc(goodId) {
      console.log(goodId);
      this.$router.push(`/goodsdesc/${goodId}`);
    },
  },
  components: {
    "van-button": Button,
    "van-pull-refresh": PullRefresh,
  },
  created() {
    this.getgoodlist();
    this.$parent.title = "商品列表";
    this.$parent.bool = false;
  },
  activated: function () {
    // this.getgoodlist();
    this.$parent.title = "商品列表";
    this.$parent.bool = false;
    console.log("activated");
  },
   deactivated:function(){
    this.$parent.bool = true;
    console.log('deactivated')
  },
};
</script>

<style lang="scss" scoped>
.goods-container {
  .goodlist {
    background-color: rgb(231, 231, 231);
    margin: 0 auto;
    ul {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      li {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 46%;
        margin: 5px;
        background-color: #fff;
        overflow: hidden;
        border-radius: 6px;
        .item-img {
          img {
            width: 100%;
          }
        }
        .text {
          padding: 5px 5px;
          .item-desc {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 12px;
            color: #333;
          }
          .item-price {
            padding: 5px 5px;
            .price {
              font-size: 14px;
              color: #f50;
              padding: 8px 0;
            }
            .buy {
              margin-left: 10px;
              font-size: 12px;
              color: #999;
            }
          }
          .item-hot {
            display: flex;
            justify-content: space-between;
            padding: 0px 5px;
            .title-color {
              color: #565252;
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}
</style>