<template>
  <div class="tab">
    <div class="tab-item" @click="routerTo('/home')">
      <img :src="$route.path.includes('/home') ? tabBarImgArr[0].Selection :tabBarImgArr[0].normal" alt>
      <span :class="{on:$route.path.includes('/home')}">首页</span>
    </div>
    <div class="tab-item" @click="routerTo('/intro')">
      <img :src="$route.path.includes('/intro') ? tabBarImgArr[1].Selection :tabBarImgArr[1].normal" alt>
      <span :class="{on:$route.path.includes('/intro')}">推荐</span>
    </div>
    <div class="tab-item" @click="routerTo('/search')">
      <img :src="$route.path.includes('/search') ? tabBarImgArr[2].Selection :tabBarImgArr[2].normal" alt>
      <span :class="{on:$route.path.includes('/search')}">搜索</span>
    </div>
    <div class="tab-item" @click="routerTo('/chat')">
      <img :src="$route.path.includes('/chat') ? tabBarImgArr[3].Selection :tabBarImgArr[3].normal" alt>
      <span :class="{on:$route.path.includes('/chat')}">购物车</span>
    </div>
    <div class="tab-item" @click="routerTo('/mine')">
      <img :src="$route.path.includes('/mine') ? tabBarImgArr[4].Selection :tabBarImgArr[4].normal" alt>
      <span :class="{on:$route.path.includes('/mine')}">个人中心</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBar",
  data() {
    return {
      tabBarImgArr: [
        {
          normal: require("./../../common/img/icon_home.png"),
          Selection: require("./../../common/img/icon_home_selected.png")
        },
        {
          normal: require("./../../common/img/icon_intro.png"),
          Selection: require("./../../common/img/icon_intro_selected.png")
        },
        {
          normal: require("./../../common/img/icon_search.png"),
          Selection: require("./../../common/img/icon_search_selected.png")
        },
        {
          normal: require("./../../common/img/icon_chat.png"),
          Selection: require("./../../common/img/icon_chat_selected.png")
        },
        {
          normal: require("./../../common/img/icon_mine.png"),
          Selection: require("./../../common/img/icon_mine_selected.png")
        }
      ]
    };
  },
  methods: {
    //tabbar路由切换
    routerTo(path) {
      // console.log(this.$route);
      this.$router.replace(path);
    },
    routerimg(){
      this.$route.path.includes('/mine') ? tabBarImgArr[4].Selection :tabBarImgArr[4].normal
    }
  }
};
</script>

<style scoped lang="less">
.tab {
  width: 100%;
  background: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  flex: 1;
  box-shadow: 0 -0.1rem 0.2rem rgb(126, 119, 119);
  z-index: 999;
  .tab-item {
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 0.1rem;
    font-size: 1.3rem;
    img {
      margin-bottom: 0.1rem;
      margin-top: 0.2rem;
      width: 35%;
    }
    .on {
      color: red;
    }
  }
}
</style>