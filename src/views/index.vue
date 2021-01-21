<template>
  <div class="index_box">
    <titleBar></titleBar>
    <v-img
      height="50"
      width="50"
      class="mx-auto mb-2"
      src="../assets/logo.svg"
    ></v-img>
    <h4 class="text-center mb-4">直播啦</h4>
    <v-text-field label="输入直播口令" outlined class="px-6"></v-text-field>
    <v-row no-gutters>
      <v-btn
        width="160"
        elevation="0"
        large
        @click="enterRoom"
        color="blue dark-1"
        class="mx-auto white--text"
        >进入房间</v-btn
      >
    </v-row>
    <v-btn text @click="setting">设置 </v-btn>
  </div>
</template>
<script>
import titleBar from "@/components/titleBar";
import { ipcRenderer } from "electron";
export default {
  components: {
    titleBar,
  },
  data() {
    return {};
  },
  methods: {
    setting() {
      ipcRenderer.send("setting");
    },
    enterRoom() {
      this.$router.push({
        path: "/room",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.index_box {
  height: 100vh;
}
</style>
