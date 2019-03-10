<template>
  <scroll
    class="scroller"
    :upCallback="upCallback"
    ref="mescroll"
    warpId="index_scroll"
    id="index_scroll"
    v-if="userInfo._id"
  >
    <div class="intro-ul">
      <intro-childen
        v-for="(item, index) in introshoplist"
        :item="item"
        :key="index"
        :clickCellBtn="dealWithCellBtnClick"
      />
    </div>
  </scroll>
  <select-login v-else/>
</template>

<script>
import { mapState } from "vuex";
import IntroChilden from "./../../components/IntroChilden/IntroChilden";
import SelectLogin from "./../Login/SelectLogin";
import Scroll from "./../../components/mescroll/Scroll";
export default {
  name: "Intro",
  components: {
    IntroChilden,
    SelectLogin,
    Scroll
  },
  computed: {
    ...mapState(["introshoplist", "userInfo"])
  },
  methods: {
    dealWithCellBtnClick(goods_id) {
      console.log(goods_id);
    },
    upCallback(page) {
      const SIZE = 20;
      this.$store.dispatch("reqIntroShopList", {
        app_name: "rectab_sim_gyl",
        offset: (page.num - 1) * SIZE,
        count: SIZE,
        scb: result => {
          console.log("请求成功");
          this.$refs.mescroll.endSuccess(result.length);
        },
        ecb: err => {
          console.log("请求失败");
          this.$refs.mescroll.endErr();
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.scroller {
  padding-bottom: 5rem;
  background-color: #f5f5f5;
}
.intro-ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #f5f5f5;
  margin: 0;
  padding: 0;
}
</style>