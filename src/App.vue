<template>
  <div id="app">
    <myHeader></myHeader>

    <router-view />
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
</style>
