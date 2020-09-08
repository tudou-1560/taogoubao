<template>
  <div class="login-container">
    <!-- <van-nav-bar :title="title"  /> -->
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
        <van-field
          v-model="againPwd"
          type="password"
          name="againPwd"
          label="确认密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">立即注册</van-button>
        </div>

        <div class="register">
          <router-link to="/login">登录</router-link>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { NavBar, Form, Field, Button,Toast } from "vant";
import {getRegister} from "@/api/index.js";
export default {
  data() {
    return {
      username: "",
      password: "",
      againPwd:""
    };
  },
  methods: {
    async onSubmit(values) {
      
      //验证两次密码输入是否一致
      let username = values.username.trim();
      let password = values.password.trim();
      let againPwd = values.againPwd.trim();
      if(password != againPwd){
        Toast("两次密码输入不一致，请重新输入")
        return;
      }
      Toast.loading({
        message: "注册中...",
        forbidClick: true,
      });
      let {message,status} = await getRegister({username,password});
      if(status == 0){
        Toast(message);
        this.$router.push("/login")
      }else{
        Toast(message);
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
    this.$parent.title = "注册"
    this.$parent.bool = false
    this.$parent.flag = false
  },
};
</script>

<style lang="scss" >
.close-btn {
  display: none;
}
.login-container {
  .login-top {
    margin-top: 20px;
  }
  .register {
    text-align: center;
  }
}
</style>