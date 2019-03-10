<template>
  <div id="search" v-if="userInfo._id">
    <!-- 搜索Top1 -->
    <search-top1 :isShowBlock="isShowMain"/>
    <!-- content Count -->
    <search-count/>
    <!-- 搜索面板 Top2 -->
    <search-top2 v-if="isShow" :isShowBlock="isShowMain"/>
  </div>
  <select-login v-else/>
</template>

<script>
import SearchTop1 from "./../../components/SearchChilden/SearchTop1";
import SearchTop2 from "./../../components/SearchChilden/SearchTop2";
import SearchCount from "./../../components/SearchChilden/SearchCount";
import SelectLogin from "./../Login/SelectLogin";
import { mapState } from "vuex";
export default {
  name: "Search",
  data() {
    return {
      isShow: false
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  mounted() {
    //请求搜索首页数据
    this.$store.dispatch("reqSearchhopList");
  },
  components: {
    SearchTop1,
    SearchTop2,
    SearchCount,
    SelectLogin
  },
  methods: {
    isShowMain(flag) {
      this.isShow = flag;
    }
  }
};
</script>

<style scoped lang="less">
#search {
  width: 100%;
  height: 100%;
  background: #ffffff;
  // overflow: hidden;
}
</style>