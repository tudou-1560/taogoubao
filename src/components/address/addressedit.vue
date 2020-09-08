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
    />
  </div>
</template>

<script>
import { AddressEdit,AddressList,Toast } from 'vant';
import areaList from "@/util/areaList.js";
import { deleteAddress } from "@/api/index.js";
export default {
  data() {
    return {
      areaList,
      searchResult: [],
      addressInfo:JSON.parse(this.$route.params.addressinfo),
      areaCode:""
    };
  },
  methods: {
    onSave(addressInfo) {
      Toast("save");
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
    onChangeArea(val) {
        let areaArry = [];
        val.map(v=>{
            areaArry.push(v.code);
        })
        this.areaCode = areaArry.join("-");
    },
  },
  created(){
      this.addressInfo.areaCode = this.addressInfo.areaCode.split("-")[2];
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