<template>
  <div class="address-container">
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
</template>

<script>
import { AddressList, Toast } from "vant";
import { getAddressManager } from "@/api/index.js";
export default {
  data() {
    return {
      chosenAddressId: "1",
      list: [],
    };
  },
  methods: {
    async loadMoreAddress(){

        let userInfo = JSON.parse( localStorage.getItem("userInfo"));
        let userAddress = await getAddressManager(userInfo.id);
        let _this = this;
        // console.log(userAddress);
        userAddress.map(v=>{
        v.address = v.province+v.city+v.country + v.addressDetail;
            if(v.isDefault == 1){
                v.isDefault = true; 
                _this.chosenAddressId = v.id;
            }
        })
        this.list = userAddress;
    },
    onAdd() {
      this.$router.push("/addressadd");
    },
    onEdit(item, index) {
      // console.log(item);

      let addressStr = JSON.stringify(item);
      this.$router.push(`/addressedit/${addressStr}`)
    },
  },
  created() {
    this.$parent.title = "地址管理";
    this.$parent.bool = false;
    this.$parent.flag = false;
    this.loadMoreAddress()
  },
  components:{
      "van-address-list":AddressList
  }
};
</script>

<style lang="scss" scoped>
</style>