<template>
  <el-dialog width="603px" center title="用户注册" :visible.sync="dialogFormVisible">
    <el-form :rules="rules" :model="form" ref="registerForm">
      <el-form-item label="头像" prop="avatar">
        <el-upload
          class="avatar-uploader"
          :action="avatarAction"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          name="image"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="昵称" prop="username" :label-width="formLabelWidth">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="phone" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
        <el-input show-password v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图形码" prop="captcha" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.captcha" autocomplete="off"></el-input>
          </el-col>
          <el-col class="captcha" :offset="1" :span="7">
            <img @click="changeCaptcha" :src="captchaUrl" alt />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="验证码" prop="code" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.code" autocomplete="off"></el-input>
          </el-col>
          <el-col :offset="1" :span="7">
            <el-button
              :disabled="delayTime!=0"
              @click="getSMS"
            >{{delayTime==0?'点击获取验证码':`${delayTime}s后再次获取`}}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('registerForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { sendsms,register } from "@/api/register.js";
const checkPhone = (rule, value, callback) => {
  const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("手机号码格式错误，请检查"));
  }
};
const checkEmail = (rule, value, callback) => {
  const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("邮箱格式错误，请检查"));
  }
};
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        username: "",
        email: "",
        phone: "",
        password: "",
        captcha: "",
        code: "",
        avatar: ""
      },
      rules: {
        avatar: [{ required: true, message: "头像不能为空", trigger: "blur" }],
        username: [
          { required: true, message: "昵称不能为空", trigger: "blur" },
          { min: 6, max: 12, message: "昵称长度为6-12位", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "昵称不能为空", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" }
        ],
        email: [
          { required: true, message: "昵称不能为空", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 12, message: "密码长度为6-12位", trigger: "blur" }
        ]
      },
      formLabelWidth: "62px",
      captchaUrl: process.env.VUE_APP_URL + "/captcha?type=sendsms",
      avatarAction: process.env.VUE_APP_URL + "/uploads",
      imageUrl: "",
      delayTime: 0
    };
  },
  methods: {
    changeCaptcha() {
      //随机数
      // this.captchaUrl = process.env.VUE_APP_URL+"/captcha?type=sendsms&t="+Math.random();
      //时间戳
      this.captchaUrl =
        process.env.VUE_APP_URL + "/captcha?type=sendsms&t=" + Date.now();
    },
    getSMS() {
      //验证手机号码的正确性
      const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (!reg.test(this.form.phone)) {
        return this.$message.warning("手机号码输入错误，请检查后输入");
      }
      //图片验证码的校验
      if (this.form.captcha.length != 4) {
        return this.$message.error("图片验证码的长度错误，请检查后输入");
      }
      //如果为0开启倒计时
      if (this.delayTime == 0) {
        this.delayTime = 60;
        let timeId = setInterval(() => {
          this.delayTime--;
          if (this.delayTime == 0) {
            clearInterval(timeId);
          }
        }, 100);
        //调用短信接口
        sendsms({
          code: this.form.captcha,
          phone: this.form.phone
        }).then(res => {
          window.console.log(res);
          if (res.data.code == 200) {
            this.$message.info("短信验证码是：" + res.data.data.captcha);
          } else {
            this.$message.warning(res.data.message);
          }
        });
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //验证正确
          //调用接口
          register({
            username: this.form.username,
            password: this.form.password,
            phone: this.form.phone,
            email: this.form.email,
            avatar: this.form.avatar,
            rcode: this.form.code
          }).then(res => {
            window.console.log(res)
            // 清空表单;
            this.$refs.registerForm.resetFields();
            //清空头像
            this.imageUrl = "";
            this.$message.success("注册成功");
            this.dialogFormVisible = false;
          });
        } else {
          this.$message.warning("请检查输入内容");
          return false;
        }
      });
    },
    handleAvatarSuccess(res, file) {
      window.console.log(res);
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.avatar = res.data.file_path;
      //其他表单元素的检验更新
      this.$refs.registerForm.validateField("avatar");
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png" || "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像只能是图片格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="less">
.el-dialog {
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
    img {
      width: 100%;
      height: 100%;
    }
  }
  //上传头像
  .avatar-uploader {
    display: flex;
    justify-content: center;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>