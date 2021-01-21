<template>
  <div>
    <v-row no-gutters style="position:relative" id="titleBar">
      <v-img
        src="../assets/logo.svg"
        class="ma-2"
        max-height="25"
        max-width="25"
      ></v-img>
      <div class="d-flex align-center">
        <span>直播啦</span>
      </div>
      <div
        id="windowOperate"
        @click="closeIndex"
        class="d-flex align-center pa-2"
      >
        <v-icon>mdi-close</v-icon>
      </div>
    </v-row>
  </div>
</template>
<script>
import { ipcRenderer } from "electron";
export default {
  methods: {
    closeIndex() {
      let hashArr = window.location.hash.split("/");
      if (hashArr[1] == "setting" && hashArr.length === 3) {
        ipcRenderer.send("closeIndex", hashArr[2]);
      } else if (hashArr[1] == "setting" && hashArr.length === 2) {
        ipcRenderer.send("closeIndex", "general");
      } else if (hashArr[1] == "") {
        ipcRenderer.send("closeIndex", "/");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
#titleBar {
  -webkit-app-region: drag;
  -webkit-user-select: none;
}
#windowOperate {
  -webkit-app-region: no-drag;
  position: absolute;
  right: 0px;
  cursor: pointer;
  transition: all 0.3s;
}
#windowOperate:hover {
  background: red;
  .theme--light.v-icon {
    color: white;
  }
}
</style>
