<template>
  <div class="zIndex">
    <pageBar></pageBar>
    <div style="min-height:90vh" class="d-flex align-center justify-center">
      <div class="d-flex justify-center">
        <div id="downloadCard" style="opacity:0">
          <div class="d-flex justify-center">
            <v-card
              width="400"
              class="rounded-0 rounded-t-xl pa-md-5 pa-5 pb-md-0 pb-0"
              color="#3f51a5"
              elevation="0"
            >
              <div class="d-flex flex-column justify-center" style="height:100%">
                <h1 class="text-center white--text text-md-h4 text-h5">下载直播软件</h1>
                <recommend :info="userAgentInfo"></recommend>
                <div v-if="userAgentInfo.winVersion=='win 7'">
                  <isWin7></isWin7>
                  <div class="d-flex justify-space-between">
                    <btn :btnInfo="moduleOne"></btn>
                    <btn :btnInfo="moduleTwo"></btn>
                  </div>
                </div>
                <btn :btnInfo="download"></btn>
                <v-btn
                  max-height="60"
                  min-height="50"
                  @click="checkVersion"
                  color="blue darken-2"
                  block
                  class="white--text mb-3"
                >
                  更多版本下载
                  <v-icon id="reverseIcon" color="white" right>mdi-chevron-down</v-icon>
                </v-btn>
              </div>
            </v-card>
          </div>
          <v-card
            class="rounded-0 rounded-b-xl pa-md-5 pa-5 pt-md-0 pt-0"
            color="#3f51a5"
            elevation="0"
            id="cards"
            style="position:relative;top:-1px"
          >
            <moreVersion @historyVersion="historyVersion" :info="userAgentInfo" ref="moreVersion"></moreVersion>
          </v-card>
        </div>
        <historyVersion :info="userAgentInfo"></historyVersion>
      </div>
    </div>
  </div>
</template>
<script>
import gsap from "gsap";
import btn from "~/components/base/btn";
import { downloadCard, historyVersions, moreVersions } from "~/config/gsap";
import isWin7 from "~/components/base/isWindows7";
import { readUserAgent } from "~/config/userAgent";
import { computeHeight } from "~/config/computeHeight";
import { setBtn } from "~/config/setBtn";
import pageBar from "~/components/download/pageBar";
import moreVersion from "~/components/moreVersion";
import historyVersion from "~/components/historyVersion/historyVersion";
import recommend from "~/components/base/recommend";
export default {
  layout: "background",
  components: {
    pageBar,
    isWin7,
    btn,
    moreVersion,
    historyVersion
  },
  data() {
    return {
      userAgentInfo: Object,
      isReverseIcon: true,
      isHeight: true,
      cardsHeight: 0,
      moduleOne: {
        downloadInfo: "依赖①",
        block: false,
        icon: "",
        href: "http://openstore.daoshi.cloud/zhibola/Windows6.1-KB4019990-x86.msu"
      },
      moduleTwo: {
        downloadInfo: "依赖②",
        block: false,
        icon: "",
        href: "http://openstore.daoshi.cloud/zhibola/NDP471-KB4033342-x86-x64-AllOS-ENU.exe"
      },
      download: {
        downloadInfo: "",
        block: true,
        icon: "",
        href: ""
      }
    };
  },
  beforeMount() {
    this.userAgentInfo = readUserAgent();
    this.download = setBtn(this.userAgentInfo).infos;
    this.cardsHeight = computeHeight(this.userAgentInfo);
  },
  mounted() {
    downloadCard(document.querySelector("#downloadCard"));
  },
  methods: {
    historyVersion() {
      historyVersions(
        document.querySelector("#downloadCard"),
        document.querySelector("#ceshiCard")
      );
    },
    checkVersion() {
      this.isReverseIcon = !this.isReverseIcon;
      moreVersions(document.querySelector("#reverseIcon"), this.isReverseIcon);
      if (this.isHeight) {
        gsap.to("#cards", {
          height: this.cardsHeight,
          duration: 0.4,
          onComplete: () => {
            this.$refs.moreVersion.isShow = !this.$refs.moreVersion.isShow;
          }
        });
      } else {
        gsap.to("#cards", {
          height: 0,
          duration: 0.4,
          onStart: () => {
            this.$refs.moreVersion.isShow = !this.$refs.moreVersion.isShow;
          }
        });
      }
      this.isHeight = !this.isHeight;
    }
  }
};
</script>
<style scoped>
#cards {
  overflow: hidden;
}
</style>