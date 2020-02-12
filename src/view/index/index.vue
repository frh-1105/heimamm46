<template>
  <el-container>
    <el-header>
      <div class="left">
        <span @click="isCollapse=!isCollapse" class="icon el-icon-s-fold"></span>
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
      <el-aside width="auto">
        <el-menu router :collapse="isCollapse"
      :default-active="$route.path"
      class="el-menu-vertical-demo">
      <el-menu-item index="/index/chart">
        <i class="el-icon-pie-chart"></i>
        <span slot="title">数据概览</span>
      </el-menu-item>
      <el-menu-item index="/index/user">
        <i class="el-icon-user"></i>
        <span slot="title">用户列表</span>
      </el-menu-item>
      <el-menu-item index="/index/question">
        <i class="el-icon-edit-outline"></i>
        <span slot="title">题库列表</span>
      </el-menu-item>
      <el-menu-item index="/index/enterprise">
        <i class="el-icon-office-building"></i>
        <span slot="title">企业列表</span>
      </el-menu-item>
      <el-menu-item index="/index/subject">
        <i class="el-icon-notebook-2"></i>
        <span slot="title">学科列表</span>
      </el-menu-item>
    </el-menu>
      </el-aside>
      <el-main>
        <!-- 嵌套路由组件 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {info} from '@/api/index.js'
export default {
    data() {
        return {
            userName:"",
            userIcon:"",
            isCollapse:false
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
  }
  .el-main {
    background-color: #e8e9ec;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
</style>