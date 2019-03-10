<template>
  <a class="box">
    <img :src="item.image_url" alt width="100%">
    <h4 class="title">{{item.short_name}}</h4>
    <div class="bottom">
      <span class="prc">￥{{item.price / 100}}</span>
      <span class="number">{{item.sales_tip}}</span>
      <button @click="ClickCellBtn(item.goods_id)">发现 ></button>
    </div>
  </a>
</template>

<script>
export default {
  name: "IntroChilden",
  props: {
    item: Object,
    ClickCellBtn: {
      type: Function,
      default: () => {}
    }
  }
};
</script>

<style scoped lang="less">
.box:nth-child(2n - 1) {
  margin-right: 1%;
}
.box {
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
  width: 49.5%;

    float: left;
  .title {
    line-height: 2rem;
    font-size: 1.3rem;
    font-weight: lighter;
    height: 2rem;
    overflow: hidden;
    margin: 0.5rem 0;
    padding: 0 0.5rem;
  }
  .bottom {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 0.6rem;
    .prc {
      flex: 2;
      color: red;
      font-weight: bolder;
      font-size: 1.2rem;
    }
    .number {
      flex: 4;
      font-size: 0.4rem;
      color: #666666;
      margin-left: 0.1rem;
    }
    button {
      flex: 3;
      border: 0.1rem solid orangered;
      height: 2.6rem;
      border-radius: 0.5rem;
      font-size: 1rem;
      background-color: transparent;
      color: red;
    }
  }
}
</style>