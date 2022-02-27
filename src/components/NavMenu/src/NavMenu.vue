<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/logo.png" alt="logo" />
      <span class="title">毕业照管理系统</span>
    </div>
    <el-menu
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
      unique-opened
      :default-active="defaultActive"
      :router="true"
    >
      <el-menu-item index="/welcome">
        <el-icon></el-icon>
        <span>欢迎使用</span>
      </el-menu-item>
      <el-menu-item index="/college">
        <el-icon></el-icon>
        <span>学院信息</span>
      </el-menu-item>
      <el-menu-item index="/subject">
        <el-icon></el-icon>
        <span>专业信息</span>
      </el-menu-item>
      <el-menu-item index="/infomessage">
        <el-icon></el-icon>
        <span>毕业照信息</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const defaultActive = ref(route.path);
</script>

<style lang="scss" scoped>
.nav-menu {
  height: 100%;
  background-color: #0c2135;
  .logo {
    display: flex;
    height: 78px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 6px;
    }

    .title {
      font-size: 20px;
      font-weight: 700;
      color: white;
    }
  }
  .el-menu {
    border-right: none;
  }
  .el-sub-menu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-sub-menu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}
</style>
