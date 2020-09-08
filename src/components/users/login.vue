<template>
  <div class="login-container">
    <!-- <van-nav-bar :title="title" /> -->
    <div class="login-top">
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="username"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">登录</van-button>
        </div>

        <div class="register">
          <router-link to="/register">新用户注册</router-link>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { NavBar, Form, Field, Button, Toast } from "vant";
import {getLogin} from "@/api/index.js";
export default {
  data() {
    return {
      // title: "登录",
      username: "",
      password: "",
    };
  },
  methods: {
    async onSubmit(values) {
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
        // console.log(values);
      let {status,message,userInfo,token} = await getLogin(values);
      // console.log(status);
      // console.log(message);
      // console.log(userInfo);
      // console.log(token);
      Toast.clear();
      Toast(message);
      if(status == 0){
          localStorage.setItem("userInfo",JSON.stringify(userInfo));
          localStorage.setItem("token",token);
          this.$router.push("/home")
      }
    },
  },

  components: {
    "van-nav-bar": NavBar,
    "van-form": Form,
    "van-field": Field,
    "van-button": Button,
  },
  created() {
    this.$parent.title = "登录"
    this.$parent.bool = false
    this.$parent.flag = false
  },
};
</script>

<style lang="scss" scoped>
// .close-btn {
//   display: none;
// }
.login-container {
  .login-top {
    margin-top: 20px;
  }
  .register {
    text-align: center;
  }
}
</style>