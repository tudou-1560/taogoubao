<template>
  <div>
    <van-address-edit
      :area-list="areaList"
      :address-info="addressInfo"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-area="onChangeArea"
      @change-default="onChangeDefault"
    />
  </div>
</template>

<script>
import { AddressEdit,AddressList,Toast } from 'vant';
import areaList from "@/util/areaList.js";
import { deleteAddress,updateAddAddress } from "@/api/index.js";
export default {
  data() {
    return {
      areaList,
      searchResult: [],
      addressInfo:JSON.parse(this.$route.params.addressinfo),
      areaCode:"",
      isDefault:""
    };
  },
  methods: {
    //保存修改
    async onSave(addressInfo) {
      addressInfo.areaCode = this.areaCode;
      addressInfo.isDefault = this.isDefault;
      addressInfo.country = addressInfo.county;
      let {status,message} = await updateAddAddress(addressInfo.id,addressInfo)
      if(status == 0){
        Toast(message);
        // this.$router.push("/addressmanager");
        this.$router.go(-1);
      }
    },
    //删除地址
    async onDelete(addressInfo) {
    let userId = addressInfo.id;
    let {status,message} = await deleteAddress(userId);
    if(status == 0){
        Toast(message);
        this.$router.push("/addressmanager");
    }

    },
    //改变地址时触发
    onChangeArea(val) {
        let areaArry = [];
        val.map(v=>{
            areaArry.push(v.code);
        })
        this.areaCode = areaArry.join("-");
    },
    //改变默认地址开关
    onChangeDefault(value){
      this.isDefault = value ?"1":"0";
    }
  },
  created(){
      let firstArea = this.addressInfo.areaCode;
      this.addressInfo.areaCode = this.addressInfo.areaCode.split("-")[2];
      this.areaCode = firstArea;
      this.isDefault = this.addressInfo === true ?"1":"0";
      this.$parent.title = "修改地址";
      this.$parent.bool = false;
  },
  components:{
      "van-address-edit":AddressEdit
  }
};
</script>

<style lang="scss" scoped>
</style>