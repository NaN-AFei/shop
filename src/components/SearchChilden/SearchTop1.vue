<template>
  <div class="top1">
    <button @click="isShowBlock(true)">彭雲飝</button>
  </div>
</template>

<script>
export default {
  name: "SearchTop1",
  props: {
    isShowBlock: Function
  }
};
</script>

<style scoped lang="less">
.top1 {
  width: 100%;
  height: 5rem;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  button {
    width: 90%;
    height: 80%;
    border-radius: 1rem;
    border: none;
    font-size: 1.8rem;
    color: #c4b0b0;
    background-color: #f5f5f5;
  }
}
</style>