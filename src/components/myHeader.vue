<template>
  <div class="myHeader">
    <div class="logo"></div>
    <el-menu
      :default-active="$route.path"
      class="el-menu-demo"
      mode="horizontal"
      text-color="#000"
      active-text-color="#f75016"
      router
    >
      <el-menu-item index="/myMap">
        <i class="el-icon-map-location"></i>
        <span slot="title">地图显示</span>
      </el-menu-item>
      <el-menu-item index="/management">
        <i class="el-icon-setting"></i>
        <span slot="title">设备管理</span>
      </el-menu-item>
      <el-menu-item index="/statistics">
        <i class="el-icon-s-order"></i>
        <span slot="title">数据统计</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style scoped lang="less">
.myHeader {
  display: flex;
  .el-menu-demo {
    flex: 1;
    /deep/ .el-menu-item {
      i {
        font-size: 22px;
      }
      font-size: 16px;
    }
  }
  .logo {
    width: 250px;
    height: 60px;
    background-image: url("../assets/img/logo1.png");
    background-size: auto 100%;
    background-position: center;
    background-color: #fff;
  }
}
</style>
