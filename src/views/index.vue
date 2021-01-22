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
    <v-text-field
      label="输入直播口令"
      v-model="roomJwt"
      outlined
      class="px-6"
    ></v-text-field>
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
    <log ref="log"></log>
  </div>
</template>
<script>
import titleBar from "@/components/titleBar";
import log from "@/components/log";
import { ipcRenderer } from "electron";
export default {
  components: {
    titleBar,
    log,
  },
  data() {
    return {
      roomJwt: "y5gx0b9GwbwxmfENsu7Mp",
    };
  },
  mounted() {
    ipcRenderer.on("login_back", (event, arg) => {
      this.$store.commit("setLoginInfo", arg);
      this.$router.push({
        path: "/room",
      });
    });
    ipcRenderer.on("login_back_error", (event, arg) => {
      this.$refs.log.logInfo = {
        logText: "口令错误,请检查是否输入正确",
        logStatus: true,
        logType: "error",
      };
    });
  },
  methods: {
    setting() {
      ipcRenderer.send("setting");
    },
    enterRoom() {
      let reg = /[0123456789ABCDEFGHJKLMNOPQRSTUVWXYZ_abcdefghijkmnopqrstuvwxyz-]{21}/g;
      if (reg.test(this.roomJwt)) {
        ipcRenderer.send(
          "login",
          `https://live.daoshi.cloud/api/v2/roominfo/${this.roomJwt}`
        );
      } else {
        this.$refs.log.logInfo = {
          logText: "口令格式填写错误",
          logStatus: true,
          logType: "error",
        };
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.index_box {
  height: 100vh;
}
</style>
