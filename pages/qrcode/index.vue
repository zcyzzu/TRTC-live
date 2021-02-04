<template>
  <div id="qrcode_box" class="d-flex justify-center align-center">
    <v-card
      id="qrcode"
      width="400"
      class="rounded-xl"
      elevation="0"
      color="#3f51a5"
      style="opacity: 0"
    >
      <h1 class="text-center py-6 white--text text-md-h4 text-h5">
        直播二维码
      </h1>
      <div class="d-flex justify-center pb-6">
        <VueQrcode :value="roomJwt" class="elevation-24 rounded-xl"></VueQrcode>
      </div>
      <div class="white--text px-6">
        <p class="mb-0">说明：</p>
        <p class="mb-0">1.请使用直播啦桌面端/手机端扫码进入直播房间！</p>
        <p>
          2.由于微信浏览器限制，目前暂<span class="red--text">不支持</span
          >微信扫码！
        </p>
      </div>
    </v-card>
  </div>
</template>
<script>
import VueQrcode from "@chenfengyuan/vue-qrcode";
import { downloadCard } from "~/config/gsap";
export default {
  layout: "background",
  components: {
    VueQrcode,
  },
  data() {
    return {
      roomJwt: "",
    };
  },
  created() {
    let reg = /[0-9A-Za-z]{27}/g;
    this.roomJwt = this.$route.query.roomJwt;
    if (!this.roomJwt || !reg.test(this.roomJwt)) {
      this.roomJwt = "请检查链接是否正确/完整";
    }
  },
  mounted() {
    downloadCard(document.querySelector("#qrcode"));
  },
};
</script>
<style lang="scss" scoped>
#qrcode_box {
  min-height: 100vh;
}
</style>