<template>
  <div>
    <v-dialog width="430" class="ma-0" v-model="dialog">
      <v-card color="#3f51a5" class="pa-6">
        <div class="d-flex flex-column align-center">
          <p v-if="tutorialInfo.isRecommend" class="text-h6 white--text">
            推荐使用桌面端
          </p>
          <v-btn
            v-if="tutorialInfo.isWeb"
            block
            max-height="60"
            min-height="50"
            class="mb-4 white--text"
            color="blue darken-2"
            :href="tutorialInfo.href"
            >下载客户端</v-btn
          >
          <v-btn
            v-else
            block
            max-height="60"
            min-height="50"
            class="mb-4 white--text"
            color="blue darken-2"
            to="/download"
            >下载客户端</v-btn
          >
          <input
            type="text"
            id="puppet"
            style="position: absolute; z-index: -10"
          />
          <p
            v-if="tutorialInfo.isRoomJwt"
            style="border-bottom: 2px solid #fff"
            class="white--text"
          >
            房间口令：
            <span id="roomJwt">
              {{ roomJwt }}
            </span>
            <v-btn icon class="ml-0" @click="copyInfo">
              <v-icon color="white">mdi-content-copy</v-icon>
            </v-btn>
          </p>
          <div v-if="tutorialInfo.isQrcode" class="d-flex justify-center pb-6">
            <VueQrcode
              :value="roomJwt"
              class="elevation-24 rounded-xl"
            ></VueQrcode>
          </div>
          <v-btn
            v-if="tutorialInfo.isContinueUseBroswer"
            block
            to="/"
            max-height="60"
            min-height="50"
            class="mb-4 white--text"
            color="red darken-2"
            >继续使用浏览器</v-btn
          >
        </div>
      </v-card>
    </v-dialog>
    <log ref="log"></log>
  </div>
</template>
<script>
import VueQrcode from "@chenfengyuan/vue-qrcode";
import log from "~/components/common/log";

export default {
  props: ["tutorialInfo", "roomJwt"],
  components: {
    VueQrcode,
    log,
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    copyInfo() {
      let textField = document.querySelector("#roomJwt").innerText;
      let input = document.getElementById("puppet");
      input.value = textField;
      input.select();
      document.execCommand("copy");
      this.$refs.log.logInfo = {
        logText: "复制成功！",
        logStatus: true,
        logType: "success",
      };
    },
  },
};
</script>