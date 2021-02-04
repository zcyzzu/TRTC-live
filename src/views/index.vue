<template>
  <div class="index_box">
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
          class="white--text mr-4"
          >进入房间</v-btn
        >
      </v-row>
      <v-btn text @click="qrcode" class="white--text">扫码</v-btn>
      <v-btn text id="step1" @click="setting" class="white--text">设置</v-btn>
    </div>
    <log ref="log"></log>
    <overlay ref="overlay"></overlay>
    <dialogs ref="dialogEle"></dialogs>
    <settingQrcode
      @setRoomJwt="setRoomJwt"
      @enterRoom="enterRoom"
      ref="settingQrcode"
    ></settingQrcode>
  </div>
</template>
<script>
import Driver from "driver.js";
import log from "@/components/log";
import dialogs from "@/components/dialog";
import overlay from "@/components/overlay";
import settingQrcode from "@/components/settingQrcode.vue";
export default {
  components: {
    log,
    overlay,
    dialogs,
    settingQrcode,
  },
  data() {
    return {
      roomJwt: "",
    };
  },
  created() {
    /**
     * @description 进入首页后 在vuex index.js中创建一个trtcCloud实例，在进行设置及后续使用
     */
    this.$store.commit("initTrtc");
  },
  mounted() {
    /**
     * @description 判断是不是第一次打开此软件 根据结果判断是否执行引导页
     */
    setTimeout(() => {
      if (!window.localStorage.getItem("isDriverStatus")) {
        this.indexDriver();
      }
    }, 200);
  },
  methods: {
    /**
     * @description 首页执行引导组件  提示进行声音设置 此时强制点击下一步（确定）打开设置dialog
     */
    indexDriver() {
      const driver = new Driver({
        allowClose: false,
        keyboardControl: false,
        opacity: 0,
      });
      driver.defineSteps([
        {
          element: "#step1",
          closeBtnText: "确定",
          popover: {
            title: "初次引导",
            description: "首次进入房间前，请进行设置，点击确定进行下一步！",
          },
          onDeselected: () => {
            this.$refs.dialogEle.settingDailog = true;
          },
        },
      ]);
      driver.start();
      let highlighted = document.getElementById(
        "driver-highlighted-element-stage"
      );
      highlighted.style.cssText = "opacity:0;z-index:1000!important;";
    },
    /**
     * @description 设置从桌面二维码中读取到的房间口令
     */
    setRoomJwt(val) {
      this.roomJwt = val;
    },
    /**
     * @description 打开扫描桌面二维码dialog
     */
    qrcode() {
      this.$refs.settingQrcode.settingQrcode = true;
    },
    /**
     * @description 打开dialog设置窗口
     */
    setting() {
      this.$refs.dialogEle.settingDailog = true;
    },
    /**
     * @description 进入房间room事件,同时开启overlay遮罩层
     */
    enterRoom() {
      this.$store.commit("setOverlay");
      let reg = /[0-9A-Za-z]{27}/g;
      if (reg.test(this.roomJwt)) {
        this.$api
          .enterRoom(this.roomJwt)
          .then((val) => {
            this.$store.commit("setLoginInfo", val.data);
          })
          .catch((err) => {
            this.$api.uploadLog({
              log: `enterRoom ${JSON.stringify(err)}`,
              platform: "electron",
            });
            this.$refs.log.logInfo = {
              logText: "口令错误,请检查是否输入正确",
              logStatus: true,
              logType: "error",
            };
            this.$store.commit("cancelOverlay");
          });
      } else {
        this.$store.commit("cancelOverlay");
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
