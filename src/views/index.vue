<template>
  <div class="index_box">
    <titleBar></titleBar>
    <div id="login">
      <v-img
        height="50"
        width="50"
        class="mx-auto mb-2"
        src="../assets/logo.svg"
      ></v-img>
      <h4 class="text-center mb-4 white--text">直播啦</h4>
      <v-text-field
        label="输入直播口令"
        v-model="roomJwt"
        solo
        background-color="white"
        hide-details=""
        @keydown.enter="enterRoom"
        class="px-6 mb-4 white--text"
      ></v-text-field>
      <v-row no-gutters class="d-flex justify-center">
        <v-btn
          width="160"
          elevation="0"
          large
          @click="enterRoom"
          color="blue dark-1"
          class=" white--text mr-4"
          >进入房间</v-btn
        >
      </v-row>
      <v-btn text class="white--text">扫码</v-btn>
      <v-btn text class="white--text">设置</v-btn>
    </div>

    <log ref="log"></log>
    <overlay ref="overlay"></overlay>
    <dialogs ref="dialogEle"></dialogs>
  </div>
</template>
<script>
import titleBar from "@/components/titleBar";
import overlay from "@/components/overlay";
import log from "@/components/log";
import dialogs from "@/components/dialog";
import { ipcRenderer } from "electron";
export default {
  components: {
    titleBar,
    log,
    overlay,
    dialogs,
  },
  data() {
    return {
      roomJwt: "fbeWhNBfatHb-_2p0cswp",
    };
  },
  created() {
    /**
     * @description 进入首页后 在vuex index.js中创建一个trtcCloud实例，在进行设置时使用
     */
    this.$store.commit("initTrtc");
  },
  mounted() {
    /**
     * @description 进入房间room成功后的回调，并将userid等参数传至vuex中保存
     */
    ipcRenderer.on("login_back", (event, arg) => {
      this.$store.commit("setLoginInfo", arg);
    });
    /**
     * @description 进入房间失败后的回调，调用log组件进行提示
     */
    ipcRenderer.on("login_back_error", (event, arg) => {
      this.$refs.log.logInfo = {
        logText: "口令错误,请检查是否输入正确",
        logStatus: true,
        logType: "error",
      };
    });
  },
  methods: {
    /**
     * @description 打开dialog设置窗口
     */
    setting() {
      // ipcRenderer.send("setting");
      this.$refs.dialogEle.settingDailog = true;
    },
    /**
     * @description 进入房间room事件,同时开启overlay遮罩层
     */
    enterRoom() {
      let reg = /[0123456789ABCDEFGHJKLMNOPQRSTUVWXYZ_abcdefghijkmnopqrstuvwxyz-]{21}/g;
      if (reg.test(this.roomJwt)) {
        this.$store.commit("setOverlay");
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
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5)),
    url(../assets/login-bg.jpg);
  background-size: 100% 100%;
  position: relative;
}
#login {
  height: 250px;
  width: 500px;
  position: absolute;
  top: 50%;
  margin-top: -125px;
  left: 50%;
  margin-left: -250px;
}
</style>
