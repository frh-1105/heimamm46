<template>
  <el-container>
    <el-header>
      <div class="left">
        <span class="icon el-icon-s-fold"></span>
        <img src="../../assets/index_logo.png" alt />
        <span class="title">黑马面面</span>
      </div>
      <div class="right">
        <img :src="userIcon" alt />
        <span class="name">{{userName}}，您好</span>
        <el-button type="primary">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import {info} from '@/api/index.js'
export default {
    data() {
        return {
            userName:"",
            userIcon:""
        }
    },
    created() {
        info().then(res=>{
            window.console.log(res)
            if(res.data.code == 200){
                this.userName = res.data.data.username;
                this.userIcon = process.env.VUE_APP_URL+"/"+ res.data.data.avatar
            }
        })
    },
};
</script>

<style lang="less">
.el-container {
  height: 100%;
  .el-header {
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      .icon {
        margin-right: 24px;
        font-size: 30px;
      }
      img {
        width: 33px;
        height: 28px;
        margin-right: 11px;
      }
      .title {
        color: #49a1ff;
        font-size: 22px;
      }
    }
    .right {
      display: flex;
      align-items: center;
      img {
        width: 43px;
        height: 43px;
        border-radius: 50%;
        margin-right: 10px;
      }
     .name{
         margin-right: 38px;
     }
    }
  }
  .el-aside {
    height: 100%;
    background-color: #f00;
  }
  .el-main {
    background-color: #e8e9ec;
  }
}
</style>