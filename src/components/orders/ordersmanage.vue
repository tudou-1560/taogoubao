<template>
  <div class="orders-container">
    <van-tabs v-model="active" animated>
      <van-tab title="全部">
        <van-card 
          v-for="item in getOrderGoods('all')" :key="item.id"
          :price="item.total_price"
          :title="item.goods[0].title"
          :thumb="item.goods[0].thumb_path"
        >
          <template #tags>
              <div>共 {{ item.number}} 件商品</div>
            <van-tag plain type="danger">支付方式：{{item.pay_way}}</van-tag>
          </template>
          <template #footer>
            <van-button :type="getBtnStyle(item.status)" size="mini">{{getTextStatus(item.status)}}</van-button>
            <van-button type="danger" size="mini">联系客服</van-button>
          </template>
        </van-card>
      </van-tab>

      <van-tab title="未付款">
        <van-card 
          v-for="item in getOrderGoods('0')" :key="item.id"
          :price="item.total_price"
          :title="item.goods[0].title"
          :thumb="item.goods[0].thumb_path"
        >
          <template #tags>
              <div>共 {{ item.number}} 件商品</div>
            <van-tag plain type="danger">支付方式：{{item.pay_way}}</van-tag>
          </template>
          <template #footer>
            <van-button :type="getBtnStyle(item.status)" size="mini">{{getTextStatus(item.status)}}</van-button>
            <van-button type="danger" size="mini">联系客服</van-button>
          </template>
        </van-card>
      </van-tab>

      <van-tab title="已付款">
        <van-card 
          v-for="item in getOrderGoods('1')" :key="item.id"
          :price="item.total_price"
          :title="item.goods[0].title"
          :thumb="item.goods[0].thumb_path"
        >
          <template #tags>
              <div>共 {{ item.number}} 件商品</div>
            <van-tag plain type="danger">支付方式：{{item.pay_way}}</van-tag>
          </template>
          <template #footer>
            <van-button :type="getBtnStyle(item.status)" size="mini">{{getTextStatus(item.status)}}</van-button>
            <van-button type="danger" size="mini">联系客服</van-button>
          </template>
        </van-card>
      </van-tab>

      <van-tab title="已完成">
        <van-card 
          v-for="item in getOrderGoods('2')" :key="item.id"
          :price="item.total_price"
          :title="item.goods[0].title"
          :thumb="item.goods[0].thumb_path"
        >
          <template #tags>
              <div>共 {{ item.number}} 件商品</div>
            <van-tag plain type="danger">支付方式：{{item.pay_way}}</van-tag>
          </template>
          <template #footer>
            <van-button :type="getBtnStyle(item.status)" size="mini">{{getTextStatus(item.status)}}</van-button>
            <van-button type="danger" size="mini">联系客服</van-button>
          </template>
        </van-card>
      </van-tab>

    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs, Card, Button, Tag, Toast } from "vant";
import { getOrderInfo,isLogin,getshopcartdata} from "@/api/index.js";
import { userInfo } from "@/util/tools.js";
export default {
  data() {
    return {
      active: 0,
      allOrder:[]
    };
  },
  methods:{
      async getAllOrder(){
          let { id } = userInfo();
          let orderData = await getOrderInfo(id)
          //判断返回的是否为一个数组
          if(Array.isArray(orderData)){
              let props = [];
              orderData.map(item =>{
                  console.log(item.id);
                props.push(getshopcartdata(item.goods_ids))
              })
              //获取所有的订单商品
              let orderGoods = await Promise.all(props)

              orderData.map((item,index)=>{
                  item.goods = orderGoods[index].message
              })
              this.allOrder = orderData
              console.log(this.allOrder);
          }else{
              Toast(orderData.message);
          }
      },
      //根据订单不同的状态返回不同的订单数据
      getOrderGoods(status){
          //如果状态为all时，直接返回allOrder数组
          if(status == "all"){
              return this.allOrder
          }
          var goods = [];
          this.allOrder.map(item=>{
              //匹配到对应的订单状态在将数据加入到goods中，并将该数组返回
              item.status == status && goods.push(item);
          })
          return goods;
      },
      //根据订单装填返回对应的文本
      getTextStatus(status){
          let statusText = new Map();
          statusText.set("0","未付款");
          statusText.set("1","已付款");
          statusText.set("2","已完成");
          return statusText.get(status.toString())

      },
      //根据订单状态返回对应按钮颜色
      getBtnStyle(status){
          let btnStyle = new Map()
          btnStyle.set("0","danger"),
          btnStyle.set("1","primary"),
          btnStyle.set("2","default")
          return btnStyle.get(status.toString());
      }
  },
   async created() {
       await isLogin();
    this.$parent.title = "我的订单";
    this.$parent.bool = false;
    this.$parent.flag = false;
    this.getAllOrder()
  },
  components: {
    "van-tabs": Tabs,
    "van-tab": Tab,
    "van-card":Card,
    "van-tag":Tag,
    "van-button":Button
  },
};
</script>

<style lang="scss" scoped>
    .orders-container{
        .van-tabs__wrap{
            margin-bottom: 8px;
        }
    }
</style>