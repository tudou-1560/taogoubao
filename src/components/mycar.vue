<template>
  <div class="car-ontainer">
    <div v-if="hasData">
      <!-- 购物车商品 -->
      <van-divider :style="{ color: '#333', borderColor: '#333', padding: '0 16px' }">收获地址</van-divider>
      <van-address-list v-model="chosenAddressId" :list="list" @edit="onEdit"  default-tag-text="默认" />
      <van-divider :style="{ color: '#333', borderColor: '#333', padding: '0 16px' }">购买的商品</van-divider>

      <!-- {{$store.getters.getGoodNumber}} -->
      <div class="car-list">
        <div class="car-item" v-for="(item,index) in cartData" :key="item.id">
          <div class="btn">
            <van-switch
              @change="switchSelect(item.id,$store.getters.getGoodSelected[item.id])"
              v-model="$store.getters.getGoodSelected[item.id]"
            />
          </div>
          <div class="item-img">
            <img :src="item.thumb_path" alt />
          </div>
          <div class="other">
            <div class="title">{{item.title}}</div>
            <div class="change">
              <span class="price">&yen;{{item.sell_price}}</span>
              <van-stepper
                @change="changeNumber(item.id,$store.getters.getGoodNumber[item.id])"
                v-model="$store.getters.getGoodNumber[item.id]"
              />
              <van-button @click="delGood(item.id,index)" type="danger">删除</van-button>
            </div>
          </div>
        </div>
      </div>
      <!-- 微信支付 -->
      <van-cell title="微信支付" icon="cash-back-record" @click="showImg" />
      <van-popup v-model="show">
        <img style="width:200px;height:200px" src="../assets/images/wechatpay.png" alt />
      </van-popup>
      <!-- 提交订单 -->
      <van-submit-bar
        :price="$store.getters.getGoodSelectedPrice"
        button-text="提交订单"
        @submit="onSubmit"
      >
        <template #default>共 {{$store.getters.getGoodSelectedNumber}} 件商品</template>
        <template #tip>当前只支持微信支付，请用微信进行支付</template>
      </van-submit-bar>
    </div>
    <!-- 购物车为空时显示 -->
    <div class="car-empty" v-else>
      <h3>
        亲，您的购物车为空，去
        <router-link to="/home">首页</router-link>逛逛吧!
      </h3>
      <div class="car-img">
        <img src="../assets/images/car.png" alt />
      </div>
      <div class="login">
        <router-link to="login">登录</router-link>后可以同步电脑与手机购物车中的商品
      </div>
    </div>
  </div>
</template>

<script>
import {
  Divider,
  AddressList,
  Toast,
  Switch,
  Stepper,
  Button,
  Cell,
  SubmitBar,
  Popup,
} from "vant";
import { getshopcartdata, getAddressManager } from "@/api/index.js";
export default {
  data() {
    return {
      cartData: [],
      // checked:true,
      // value:"1",
      show: false,
      chosenAddressId: "1",
      list: [],
    };
  },
  methods: {
    showImg() {
      this.show = true;
    },
    //生成订单
    onSubmit() {
      Toast.loading({
        message: "订单生成中...",
        forbidClick: true,
      });
    },
    onEdit(item, index) {
      Toast("编辑地址:" + index);
    },
    //获取购物车商品
    async getCarGoods() {
      let id = this.$store.getters.getGoodsId;
      if (id == false) {
        return;
      }
      let { message } = await getshopcartdata(id);
      this.cartData = message;
    },
    //修改购物车商品按钮状态
    switchSelect(goodsId, selected) {
      this.$store.commit("changeGoodSelected", { goodsId, selected });
    },
    //修改购物车商品数量
    changeNumber(goodsId, number) {
      this.$store.commit("changeGoodNumber", { goodsId, number });
    },
    // 删除购物车商品
    delGood(goodsId, index) {
      this.$store.commit("delCartGood", goodsId);
      this.cartData.splice(index, 1);
    },
    //获取用户的默认地址
    async loadaddress(){
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      // console.log(userId.id);
      let userAddress = await getAddressManager(userInfo.id);
      let _this = this;
      let newAddress = userAddress.filter((v) => {
          v.address = v.province + v.city + v.country + v.addressDetail;
          if (v.isDefault == 1) {
            v.isDefault = true;
            _this.chosenAddressId = v.id;
          }
           return v.isDefault;
      });

      // this.list = newAddress; 
      this.list.push(newAddress[0]); 
    },
  },
  computed: {
    hasData() {
      return this.cartData.length > 0;
    },
  },
  created() {
    this.$parent.title = "我的购物车";
    this.$parent.bool = false;
    this.$parent.active = 1;
    this.getCarGoods();
    this.loadaddress();
  },
  components: {
    "van-divider": Divider,
    "van-address-list": AddressList,
    "van-switch": Switch,
    "van-stepper": Stepper,
    "van-button": Button,
    "van-cell": Cell,
    "van-submit-bar": SubmitBar,
    "van-popup": Popup,
  },
};
</script>

<style lang="scss" scoped>
.car-ontainer {
  .van-address-list {
    padding-bottom: 12px;
  }
  .van-address-list__bottom {
    visibility: hidden;
  }
  .van-submit-bar {
    margin-bottom: 50px;
  }

  .car-list {
    width: 94%;
    margin: 0 auto;
    .car-item {
      display: flex;
      align-items: center;
      justify-content: space-around;
      background-color: #fff;
      padding: 10px;
      border-radius: 8px;
      margin-bottom: 15px;
      .item-img {
        width: 50px;
        height: 50px;
        img {
          width: 100%;
        }
      }
      .other {
        display: flex;
        flex-direction: column;
        .title {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        .change {
          display: flex;
          align-items: center;
          .price {
            color: red;
            font-weight: 700;
          }
          .van-stepper {
            padding-left: 5px;
            padding-right: 5px;
          }
        }
      }
    }
  }

  .car-empty {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    h3 {
      text-align: center;
    }
    .car-img {
      text-align: center;
      img {
        width: 80%;
      }
    }
  }
}
</style>