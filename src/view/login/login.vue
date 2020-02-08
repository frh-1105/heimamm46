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
      <el-form ref="form" :model="loginForm" label-width="43px" class="login-form">
        <el-form-item>
          <el-input placeholder="请输入手机号码" prefix-icon="el-icon-user" v-model="loginForm.phone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col :span="17">
              <el-input
                placeholder="请输入验证码"
                prefix-icon="el-icon-key"
                v-model="loginForm.loginCode"
              ></el-input>
            </el-col>
            <el-col :span="7">
              <img class="captcha" src="../../assets/login_captcha.png" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="loginForm.isChecked">
            我已同意并阅读
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item class="btn-box">
          <el-button type="primary">登录</el-button>
          <el-button type="primary">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 右侧图片 -->
    <img src="../../assets/login_banner_ele.png" alt />
  </div>
</template>

<script>
export default {
  //组件名字
  name: "login",
  data() {
    return {
      loginForm: {
        phone: "",
        password: "",
        loginCode: "",
        isChecked: false
      }
    };
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