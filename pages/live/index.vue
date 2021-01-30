<template>
  <div class="index_box">
    <div id="login">
      <v-img
        height="50"
        width="50"
        class="mx-auto mb-2 text-center"
        src="/logo.svg"
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
      <v-row no-gutters class="d-flex justify-center">
        <v-btn text @click="setting" class="white--text">设置</v-btn>
      </v-row>
    </div>
    <log ref="log"></log>
    <settingDialog ref="dialogEle"></settingDialog>
  </div>
</template>
<script>
import log from "~/components/common/log";
import settingDialog from "@/components/live/settingDialog";
export default {
  components: {
    settingDialog,
    log
  },
  data() {
    return {
      roomJwt: "Hq1OUV5DQ2WiiOO2__fau"
    };
  },
  created() {},
  mounted() {},
  methods: {
    /**
     * @description 打开dialog设置窗口
     */
    setting() {
      this.$refs.dialogEle.settingDailog = true;
    },
    enterRoom() {
      let reg = /[0123456789ABCDEFGHJKLMNOPQRSTUVWXYZ_abcdefghijkmnopqrstuvwxyz-]{21}/g;
      if (reg.test(this.roomJwt)) {
        this.$axios
          .get(`https://live.daoshi.cloud/api/v2/roominfo/${this.roomJwt}`)
          .then(
            val => {
              this.$store.commit("setLoginInfo", val.data);
            },
            err => {
              this.$refs.log.logInfo = {
                logText: "请检查网络链接/口令是否正确",
                logStatus: true,
                logType: "error"
              };
            }
          );
      } else {
        this.$refs.log.logInfo = {
          logText: "口令格式填写错误",
          logStatus: true,
          logType: "error"
        };
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.index_box {
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)),
    url(/login-bg.jpg);
  background-size: cover;
  position: relative;
}
#login {
  height: 250px;
  position: absolute;
  min-width: 400px;
  top: 50%;
  margin-top: -125px;
  left: 50%;
  margin-left: -200px;
}
</style>
