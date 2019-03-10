<template>
  <div id="home">
    <ly-tab v-model="selectedId" :items="items" class="felx" @change="handleChange"/>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      selectedId: 0,
      items: [
        { label: "热门" },
        { label: "女装" },
        { label: "内衣" },
        { label: "母婴" },
        { label: "百货" },
        { label: "男装" },
        { label: "手机" },
        { label: "电器" },
        { label: "食品" }
      ],
      //二级数组的路径
      subRouterUrl: [
        "/home/hot",
        "/home/women",
        "/home/underwear",
        "/home/baby",
        "/home/baihuo",
        "/home/men",
        "/home/phone",
        "/home/dainqi",
        "/home/foot",
        "/home/home"
      ]
    };
  },
  methods: {
    handleChange(item, index) {
      this.$router.replace(this.subRouterUrl[index]);
    }
  }
};
</script>

<style scoped lang="less">
#home {
  width: 100%;
  height: 100%;
  display: flex;
  .felx {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 999;
  }
}
</style>