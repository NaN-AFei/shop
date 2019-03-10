<template>
  <div class="select-login">
    <div class="bottom">
      <img src="./images/lk_logo_sm.png" alt width="200">
    </div>
    <h4>选择其他登陆方式</h4>
    <router-link tag="button" to="/login">手机登陆</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped lang="less">
.select-login {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  button {
    width: 80%;
    height: 3.8rem;
    background-color: purple;
    border: none;
    border-radius: 0.5rem;
    font-size: 2rem;
    color: #fff;
    margin-top: 3rem;
  }
  .bottom {
    position: fixed;
    top: 13rem;
    left: 50%;
    margin-left: -10rem;
  }
}
</style>