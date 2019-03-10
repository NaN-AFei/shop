<template>
  <div id="chat" v-if="userInfo._id">
    <chat-childen1/>
  </div>
  <select-login v-else/>
</template>

<script>
import ChatChilden1 from "./../../components/ChatChilden/ChatChilden1";
import SelectLogin from "./../Login/SelectLogin";
import { mapState } from "vuex";
export default {
  name: "Chat",
  data() {
    return {};
  },
  computed: {
    ...mapState(["userInfo"])
  },
  components: {
    ChatChilden1,
    SelectLogin
  }
};
</script>

<style scoped lang="less">
#chat {
  width: 100%;
  height: 100%;
}
</style>