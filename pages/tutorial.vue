<template>
  <div id="tutorial_box" class="d-flex justify-center align-center">
    <v-card
      id="tutorial"
      width="400"
      class="rounded-xl pa-6"
      elevation="0"
      color="#3f51a5"
    >
      <h1 class="text-center py-6 white--text text-md-h4 text-h5">
        客户端下载
      </h1>
      <div class="d-flex flex-column align-center">
        <v-btn
          :color="item.color"
          block
          max-height="60"
          min-height="50"
          class="mb-4 white--text"
          v-for="(item, index) in btnList"
          :key="index"
          @click="clickBtn(index)"
          >{{ item.desc }}</v-btn
        >
      </div>
    </v-card>
    <tutorialDialog
      ref="tutorialDialog"
      :roomJwt="roomJwt"
      :tutorialInfo="tutorialInfo"
    ></tutorialDialog>
  </div>
</template>
<script>
import { downloadCard } from "~/config/gsap";
import { readUserAgent } from "~/config/userAgent";
import { tutorial } from "~/data/tutorial";
import tutorialDialog from "~/components/common/tutorial_dialog";
export default {
  layout: "background",
  components: {
    tutorialDialog,
  },
  data() {
    return {
      roomJwt: null,
      isIPhone: false,
      btnList: [
        {
          desc: "Windows 系统",
          color: "blue darken-2",
        },
        {
          desc: "Mac 系统",
          color: "blue darken-2",
        },
        {
          desc: "手机端",
          color: "blue darken-2",
        },
        {
          desc: "Web 浏览器",
          color: "blue darken-2",
        },
      ],
      tutorialInfo: {
        isRecommend: false,
        isQrcode: true,
        isContinueUseBroswer: false,
        href:
          "https://openstore.daoshi.cloud/zhibola/history/zhibola/zhibola_latest_mac.dmg",
      },
    };
  },
  created() {
    this.roomJwt = this.$route.query.roomJwt;
  },
  mounted() {
    downloadCard(document.querySelector("#tutorial"));
    this.initBtn();
  },
  methods: {
    clickBtn(index) {
      this.$refs.tutorialDialog.dialog = true;
      this.tutorialInfo = tutorial[index];
    },
    initBtn() {
      let ua = readUserAgent();
      if (!ua.flag) {
        this.btnList[2].color = "#ff7500";
        if (ua.mobileSystem === "iPhone") {
          this.isIPhone = true;
        }
      } else {
        if (ua.isMac) {
          this.btnList[1].color = "#ff7500";
        } else {
          this.btnList[0].color = "#ff7500";
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
#tutorial_box {
  min-height: 100vh;
}
</style>