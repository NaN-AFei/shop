<template>
  <div id="app">
    <router-view/>
    <TabBar v-show="$route.meta.showTabBar"/>
  </div>
</template>

<script>
import TabBar from "./components/TabBar/TabBar";
export default {
  name: "App",
  components: {
    TabBar
  },
  mounted() {
    //请求session数据 验证客户是否登陆
    this.$store.dispatch("reqUserInfo");
  }
};
</script>

<style lang="less"scoped>
#app {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  position: relative;
}
</style>

