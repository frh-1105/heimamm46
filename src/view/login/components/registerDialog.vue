<template>
  <el-dialog width="603px" center title="用户注册" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="昵称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图形码" :label-width="formLabelWidth">
          <el-row>
              <el-col :span="17">
                  <el-input v-model="form.captcha" autocomplete="off"></el-input>
              </el-col>
              <el-col class="captcha" :span="7">
                  <img src="@/assets/login_captcha.png" alt="">
              </el-col>
          </el-row>
      </el-form-item>
      <el-form-item label="验证码" :label-width="formLabelWidth">
          <el-row>
              <el-col :span="17">
                  <el-input v-model="form.code" autocomplete="off"></el-input>
              </el-col>
              <el-col :span="7">
                  <el-button>点击获取验证码</el-button>
              </el-col>
          </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: "",
        email:"",
        phone:"",
        password:"",
        captcha:"",
        code:""
      },
      formLabelWidth: "62px"
    };
  }
};
</script>

<style lang="less">
.el-dialog__header {
  background: linear-gradient(
    to right,
    rgba(1, 198, 250, 1),
    rgba(20, 147, 250, 1)
  );
  .el-dialog__title {
      color: #fff;
  }
}
.captcha {
    height: 40px;
    img{
        width: 100%;
        height: 100%;
    }
}
</style>