<template>
  <div class="home-container">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in lunboList" :key="item.img">
        <img :src="item.img" alt />
      </van-swipe-item>
    </van-swipe>

    <!-- 巴功阁 -->
    <van-grid :column-num="4" :border="false">
      <van-grid-item icon="photo-o" to="/goodslist">
        <img src="../assets/images/menu10.png" alt />
        <span>数码电器</span>
      </van-grid-item>
      <van-grid-item icon="photo-o" to="/newlist">
        <img src="../assets/images/menu19.png" alt />
        <span>乐淘头条</span>
      </van-grid-item>
      <van-grid-item icon="photo-o" to="/photolist">
        <img src="../assets/images/menu18.png" alt />
        <span>美图欣赏</span>
      </van-grid-item>
      <van-grid-item icon="photo-o">
        <img src="../assets/images/menu15.png" alt />
        <span>乐淘服饰</span>
      </van-grid-item>
      <van-grid-item icon="photo-o">
        <img src="../assets/images/menu12.png" alt />
        <span>9.9元拼单</span>
      </van-grid-item>
      <van-grid-item icon="photo-o">
        <img src="../assets/images/menu13.png" alt />
        <span>乐淘超市</span>
      </van-grid-item>
      <van-grid-item icon="photo-o">
        <img src="../assets/images/menu16.png" alt />
        <span>物流查询</span>
      </van-grid-item>
      <van-grid-item icon="photo-o">
        <img src="../assets/images/menu17.png" alt />
        <span>全部</span>
      </van-grid-item>
    </van-grid>
    <!-- 分割线 -->
    <div class="split">
        <van-divider :style="{ color: '#333', borderColor: '#333', padding: '0 16px' }">为你推荐</van-divider>
    </div>

    <!-- 推荐内容 -->
    <div class="goodlist">
      <ul>
        <li v-for="item in goodslist" :key="item.id" @click="getDesc(item.id)" >
          <div class="item-img">
            <img :src="item.img_url" alt="" />
          </div>
          <div class="text">
                <div class="item-desc">
                {{ item.title }}
                </div>
                <div class="item-price">
                <span class="price">&yen;{{ item.sell_price }}</span>
                <span class="buy">{{ item.buy }}人已购买</span>
                </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Grid, GridItem, Divider, Col, Row } from "vant";
import { getLunBoData, getGoodsData} from "@/api/index.js";
export default {
  data() {
    return {
      lunboList: [],
      goodslist:[]
    };
  },
  components: {
    "van-swipe": Swipe,
    "van-swipe-item": SwipeItem,
    "van-grid": Grid,
    "van-grid-item": GridItem,
    "van-divider": Divider,
    "van-row": Row,
    "van-col": Col,
  },
  methods: {
    async getlunbo() {
      var res = await getLunBoData();
    //   console.log(res);
      this.lunboList = res.message;
    },
    async getgoods(){
        var res = await getGoodsData(6);
        this.goodslist = res.message;
    },
    getDesc(goodId){
       this.$router.push(`/goodsdesc/${goodId}`);
    }
  },
  created() {
    this.getlunbo();
    this.getgoods();
    this.$parent.bool = true;
    this.$parent.active = 0;
  },
};
</script>

<style lang="scss" scoped>
.home-container {
  .my-swipe {
    height: 200px;
    background-color: skyblue;
    .van-swipe-item {
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .van-grid-item {
    img {
      width: 50%;
    }
    span {
      color: #524949;
    }
  }

    .split{
        height: 56px;
        background-color: rgb(231, 231, 231);
        .van-divider{
            text-align: center;
            line-height: 56px;
        }
    }

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
        margin:5px;
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
        }
      }
    }
  }
}
</style>