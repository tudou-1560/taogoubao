<template>
  <div id="app" class="app-container">
    <!-- 头部 -->
    <van-sticky>
      <!-- <van-button type="primary"> -->
        <div class="header" v-if="bool">
          <img src="./assets/images/logo.png" alt />
          <van-search v-model="value" placeholder="请输入搜索关键词" />
        </div>

        <div  v-else>
            <van-nav-bar 
                :title="title"
                left-text="返回"
                left-arrow
                @click-left="onClickLeft"
            />
        </div>
    </van-sticky>

    <router-view></router-view>
    <!-- 底部 -->
        <van-tabbar v-model="active"  :route="true" v-if="flag">
          <van-tabbar-item to="/home" icon="wap-home-o">首页</van-tabbar-item>
          <van-tabbar-item to="/mycar" icon="cart-o" :badge="this.$store.getters.totalCart" >购物车</van-tabbar-item>
          <van-tabbar-item to="/userinfo" icon="user-o" >我的乐淘</van-tabbar-item>
        </van-tabbar>

  </div>
</template>

<script>
import { Search, Tabbar, TabbarItem, Sticky ,NavBar  } from "vant";
export default {
  data() {
    return {
      value: "",
      active: 0,
      bool:true,
      title:"",
      flag:true,

    };
  },
  methods:{
    onClickLeft(){
      this.$router.go(-1)
    }
  },
  components: {
    "van-search": Search,
    "van-tabbar": Tabbar,
    "van-tabbar-item": TabbarItem,
    "van-sticky": Sticky,
    "van-nav-bar":NavBar,
    

  },
  // watch:{
  //   "$route":function(oldPath,newPath){

  //     var mypath = oldPath.path;
  //     console.log(mypath);
  //     if(mypath == "/home"){
  //       this.bool = true;
  //       this.active = 0
  //     }else if(mypath == "/mycar"){
  //       this.bool = false;
  //       this.active = 1;
  //     }else if(mypath == "/userinfo"){
  //       this.bool = false;
  //       this.active = 2
  //     }
  //   }
  // }
  watch:{
    "$route":function(oldPath,newPath){

      var mypath = oldPath.path.split("/")[1];
      // console.log(newPath.path);
      // console.log(mypath.split("/")[1]);
      if(mypath == "goodsdesc"){
        this.flag = false;
      }else{
        this.flag = true;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  min-width: 320px;
  max-width: 750px;
  padding-bottom: 50px;
  margin: auto;
  //头部搜索栏
  .van-sticky {
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      min-width: 320px;
      max-width: 750px;
      margin: 0 auto;
      img {
        width: 44px;
        height: 44px;
      }
      .van-search {
        flex: 1;
      }
    }
  }

}
</style>