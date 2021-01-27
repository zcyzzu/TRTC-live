<template>
  <div>
    <v-row no-gutters style="position:relative" id="titleBar">
      <v-img
        src="../assets/logo.svg"
        class="ma-2"
        max-height="15"
        max-width="15"
      ></v-img>
      <div class="d-flex align-center text-subtitle-2">
        <span>直播啦</span>
      </div>
      <div
        id="windowOperate_mini"
        v-if="href === '#/' || href === '#/room'"
        @click="miniIndex"
        class="d-flex align-center pa-2 mr-8"
      >
        <v-icon small>mdi-window-minimize</v-icon>
      </div>
      <div
        id="windowOperate_close"
        @click="closeIndex"
        class="d-flex align-center pa-2"
      >
        <v-icon small>mdi-close</v-icon>
      </div>
    </v-row>
  </div>
</template>
<script>
import { ipcRenderer } from "electron";
export default {
  data() {
    return {
      href: "",
    };
  },
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
    miniIndex() {
      ipcRenderer.send("miniIndex");
    },
  },
  mounted() {
    this.href = window.location.hash;
  },
};
</script>
<style lang="scss" scoped>
#titleBar {
  -webkit-app-region: drag;
  -webkit-user-select: none;
}
#windowOperate_mini,
#windowOperate_close {
  -webkit-app-region: no-drag;
  position: absolute;
  right: 0px;
  cursor: pointer;
  transition: all 0.3s;
}
#windowOperate_close:hover {
  background: red;
  .theme--light.v-icon {
    color: white;
  }
}
#windowOperate_mini:hover {
  background: gray;
  .theme--light.v-icon {
    color: white;
  }
}
</style>
