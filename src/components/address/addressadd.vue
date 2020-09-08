<template>
  <div class="addressadd-container">
    <van-address-edit
      :area-list="areaList"
      show-postal
      save-button-text="添加"
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-area="onChangeArea"
    />
  </div>
</template>

<script>
import { AddressEdit,Toast } from "vant";
import {AddAddress} from "@/api/index.js";
import areaList from "@/util/areaList.js"
export default {
  data() {
    return {
      areaList,
      searchResult: [],
      areaCode:""
    };
  },
  methods: {
      //添加地址
    async onSave(addressInfo) {
        console.log(addressInfo);
        addressInfo.country = addressInfo.county;
        if(addressInfo.isDefault == true){
            addressInfo.isDefault = 1;
        }else{
            addressInfo.isDefault = 0;
        }
        addressInfo.areaCode = this.areaCode;
        //获取用户id
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        let userId = userInfo.id;
        let {status,message} = await AddAddress(userId,addressInfo);
        if(status == 0){
            Toast(message);
            this.$router.push("/addressmanager");
        }

    },
    onDelete() {
      Toast("delete");
    },
    onChangeArea(values) {
        console.log(values);
        let areaArry = [];
        values.map(v=>{
            areaArry.push(v.code);
        })
        this.areaCode = areaArry.join("-");
        console.log(this.areaCode);

    },
  },
  created() {
    this.$parent.title = "添加地址";
    this.$parent.bool = false;
  },
  components: {
    "van-address-edit": AddressEdit,
  },
};
</script>

<style lang="scss" scoped>
</style>