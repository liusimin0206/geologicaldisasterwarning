<template>
  <div id="app">
    <myHeader class="myHeader"></myHeader>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import myHeader from "./components/myHeader";
export default {
  data() {
    return {};
  },
  components: {
    myHeader
  },
  methods: {}
};
</script>

<style scoped lang="less">
#app {
  height: 100%;
  min-width: 800px;
}
.myHeader {
  position: relative;
  z-index: 100;
}
</style>
