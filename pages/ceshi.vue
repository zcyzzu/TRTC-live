<template>
  <div class="zIndex">
    <pageBar></pageBar>
    <div style="height:90vh" class="d-flex flex-column justify-center">
      <v-card
        v-if="historyVersions"
        min-width="390"
        min-height="340"
        id="downloadCard"
        class="mx-auto rounded-xl pa-md-5 pa-5 d-flex flex-column justify-center"
        color="#3f51a5"
        elevation="12"
        style="opacity:0"
      >
        <h1 class="text-center white--text hidden-md-and-down text-h4">下载直播软件</h1>
        <h1 class="text-center white--text hidden-lg-and-up text-h5">下载直播软件</h1>
        <recommend :info="userAgentInfo"></recommend>
        <div v-if="userAgentInfo.winVersion=='win 7'">
          <isWin7></isWin7>
          <div class="d-flex justify-space-between">
            <btn :btnInfo="moduleOne"></btn>
            <btn :btnInfo="moduleTwo"></btn>
          </div>
        </div>
        <btn :btnInfo="download"></btn>
        <moreVersion @historyVersion="historyVersion" :info="userAgentInfo" ref="moreVersion"></moreVersion>
      </v-card>
      <v-card
        v-else
        min-width="390"
        min-height="340"
        id="downloadCards"
        class="mx-auto rounded-xl pa-md-5 pa-5 d-flex flex-column justify-center"
        color="#3f51a5"
        elevation="12"
        style="opacity:1"
      >
        <v-btn @click="historyVersion">返回</v-btn>
      </v-card>
    </div>
  </div>
</template>
<script>
import btn from "~/components/base/btn";
import gsap from "gsap";
import { downloadCard } from "~/config/gsap";
import isWin7 from "~/components/base/isWin7";
import { readUserAgent } from "~/config/userAgent";
import { setBtn } from "~/config/setBtn";
import pageBar from "~/components/download/pageBar";
import moreVersion from "~/components/moreVersion";
import recommend from "~/components/base/recommend";
export default {
  layout: "background",
  components: {
    pageBar,
    isWin7,
    btn,
    moreVersion
  },
  data() {
    return {
      historyVersions: true,
      userAgentInfo: Object,
      info: Object,
      moduleOne: {
        downloadInfo: "依赖①"
      },
      moduleTwo: {
        downloadInfo: "依赖②"
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
  },
  mounted() {
    downloadCard(document.querySelector("#downloadCard"));
  },
  methods: {
    historyVersion() {
      console.log(this.historyVersions)
      if (this.historyVersions) {
        gsap.to("#downloadCard", {
          duration: 1,
          scale: 0,
          onComplete: () => {
            gsap.to("#downloadCards", {
              scale: 1,
              duration: 1
            });
          }
        });
      } else {
        gsap.to("#downloadCards", {
          duration: 1,
          scale: 0,
          onComplete: () => {
            gsap.to("#downloadCard", {
              scale: 1,
              duration: 1
            });
          }
        });
      }
      this.historyVersions = !this.historyVersions;
    }
  }
};
</script>