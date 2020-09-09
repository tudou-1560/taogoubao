<template>
  <div class="user-container">
    <div class="userlist">
      <div class="thetop">
        <div class="logo-top">
          <van-image
            round
            width="5rem"
            height="5rem"
            :src="require('../assets/images/person.jpg')"
            @click="showImg"
          />
          <div class="username">
            <span>用户名：{{username}}</span>
          </div>
        </div>
        <van-cell title="修改密码" is-link />
        <van-cell title="我的订单" is-link to="/ordersmanage" />
        <van-cell title="地址管理" is-link to="/addressmanager" />
      </div>

      <div class="about">
        <van-cell title="提交反馈" is-link />
        <van-cell title="关于乐淘" is-link />
      </div>
      <div class="btn">
        <van-button @click="logOut" class="van-button--default" type block>退出登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Cell,
  CellGroup,
  Image as VanImage,
  ImagePreview,
  Dialog,
  Button,
} from "vant";
import {isLogin} from "@/api/index.js";
export default {
  data() {
    return {
      username:"",
      photo: [require("../assets/images/person.jpg")],
    };
  },
  methods: {
    showImg() {
      ImagePreview({
        images: this.photo,
        showIndex: false,
        maxZoom: 3,
        minZoom: 1 / 3,
      });
    },
    logOut() {
      Dialog.confirm({
        title: "确认退出登录?",
        confirmButtonColor:"#1989FA"
      })
        .then(() => {
          // on confirm
          
          this.$router.push("/login")
        })
        .catch(() => {
          // on cancel
        });
    },
  },
  components: {
    "van-cell-group": CellGroup,
    "van-cell": Cell,
    "van-image": VanImage,
    "van-button": Button,
  },
  created() {
    isLogin();
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.username = userInfo.username;
    this.$parent.title = "个人中心";
    this.$parent.bool = false;
    this.$parent.flag = false;
    this.$parent.active = 2;
  },
};
</script>

<style lang="scss" scoped>
.user-container {
  .userlist {
    .thetop {
      .logo-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px;
        background-color: #fff;
        .van-image {
          margin-left: 16px;
        }
        .username {
          font-size: 18px;
          color: #5d5555;
          margin-right: 50px;
        }
      }
    }
    .about {
      margin-top: 15px;
    }
    .btn {
      position: fixed;
      width: 100%;
      bottom: 0px;
      left: 0px;

      .van-button--default {
        color: #323233;
        background-color: #fff;
        border: 1px solid #ebedf0;
        border-bottom: 0px;
      }
    }
  }
}
</style>