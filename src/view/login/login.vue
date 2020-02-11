<template>
  <!-- 整体容器 -->
  <div class="login-container">
    <!-- 左侧盒子 -->
    <div class="left-box">
      <!-- 标题区域 -->
      <div class="title-box">
        <img class="login-logo" src="../../assets/login_logo.png" alt />
        <span class="title">黑马面面</span>
        <span class="line"></span>
        <span class="sub-title">用户登录</span>
      </div>
      <!-- 登录表单 -->
      <el-form ref="loginForm" :rules="rules" :model="loginForm" label-width="43px" class="login-form">
        <el-form-item prop="phone">
          <el-input placeholder="请输入手机号码" prefix-icon="el-icon-user" v-model="loginForm.phone"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item prop="loginCode">
          <el-row>
            <el-col :span="17">
              <el-input
                placeholder="请输入验证码"
                prefix-icon="el-icon-key"
                v-model="loginForm.loginCode"
              ></el-input>
            </el-col>
            <el-col :span="7">
              <img class="captcha" @click="changeCaptcha" :src="captchaUrl" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="isChecked">
          <el-checkbox v-model="loginForm.isChecked">
            我已同意并阅读
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item class="btn-box">
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
          <el-button type="primary" @click="showDialog">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 右侧图片 -->
    <img src="../../assets/login_banner_ele.png" alt />
    <registerDialog ref="registerDialog"></registerDialog>
  </div>
</template>

<script>
import registerDialog from './components/registerDialog'
import {checkPhone} from '@/utils/vaildator.js'
export default {
  //组件名字
  name: "login",
  components:{
    registerDialog
  },
  data() {
    return {
      loginForm: {
        phone: "",
        password: "",
        loginCode: "",
        isChecked: false
      },
      rules:{
        phone:[
          {required:true,message:"手机号码不能为空",trigger:"blur"},
          {validator:checkPhone,trigger:"change"}
        ],
        password:[
          {required:true,message:"密码不能为空",trigger:"blur"},
          {min:6,max:12,message:"密码长度为6-12位",trigger:"blur"}
        ],
        loginCode:[
          {required:true,message:"验证码不能为空",trigger:"blur"},
          {min:4,max:4,message:"验证码长度为4位",trigger:"blur"}
        ]
      },
      captchaUrl:process.env.VUE_APP_URL+"/captcha?type=login",
    };
  },
  methods:{
    submitForm(formName){
      this.$refs[formName].validate(valid=>{
        if(valid){
          this.$message.success("验证成功");
        }else{
          this.$message.error("验证失败")
        }
      })
    },
    showDialog(){
      this.$refs.registerDialog.dialogFormVisible = true;
    },
    changeCaptcha(){
      this.captchaUrl = process.env.VUE_APP_URL+"/captcha?type=login&t="+Date.now()
    }
  }
};
</script>

<style lang="less">
.login-container {
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  display: flex;
  /* 上下居中 */
  align-items: center;
  /* 左右均分 */
  justify-content: space-around;
  .left-box {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    .title-box {
      display: flex;
      align-items: center;
      margin-top: 44px;
      margin-left: 48px;
      .login-logo {
        margin-right: 16px;
      }
      .title {
        font-size: 24px;
        margin-right: 14px;
      }
      .line {
        width: 1px;
        height: 28px;
        background-color: #c7c7c7;
        margin-right: 13px;
      }
      .sub-title {
        font-size: 22px;
      }
    }
    .login-form {
      margin: 29px 41px 0 0;
      .captcha {
        width: 100%;
      }
      .btn-box {
        .el-button {
          width: 100%;
          margin-left: 0;
          margin-bottom: 28px;
        }
      }
    }
  }
  .el-checkbox {
    display: flex;
    align-items: center;
    .el-checkbox__label {
      display: flex;
    }
  }
}
</style>