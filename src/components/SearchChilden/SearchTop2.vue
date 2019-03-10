<template>
  <div class="top2">
    <div class="main">
      <input type="search" placeholder="请输入商品名称">
      <a @click="isShowBlock(false)">取消</a>
    </div>
    <div class="cell">
      <span>热门搜索</span>
      <ul>
        <li>面巾纸</li>
        <li>浴巾儿童</li>
        <li>石榴水果</li>
        <li>冰箱保鲜盒</li>
        <li>富豪卷纸</li>
        <li>毛巾浴袍</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchTop2",
  props: {
    isShowBlock: Function
  }
};
</script>

<style scoped lang="less">
.top2 {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  overflow: hidden;
  z-index: 1000;
  .main {
    width: 100%;
    height: 5rem;
    // background-color: red;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    input {
      width: 90%;
      height: 80%;
      border-radius: 1rem;
      border: none;
      padding-left: 2rem;
      font-size: 1.8rem;
      border: 1px solid #f1f1f1;
      background-color: #fff;
    }
    a {
      position: absolute;
      right: 3rem;
      color: #a39a9a;
    }
  }
  .cell {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    padding-left: 2rem;
    span {
      width: 20%;
      display: block;
      height: 3rem;
      //   background-color: red;
      line-height: 3rem;
      margin-top: 2rem;
      color: #a39a9a;
    }
    ul {
      margin-top: 2rem;
      list-style: none;
      padding: 0;
      li {
        float: left;
        margin-right: 3rem;
        margin-bottom: 2rem;
        font-size: 1.5rem;
        color: #a39a9a;
      }
    }
  }
}
</style>