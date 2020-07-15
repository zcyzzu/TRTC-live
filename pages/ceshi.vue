<template>
  <div class="zIndex">
    <pageBar></pageBar>
    <div style="min-height:90vh" class="d-flex align-center justify-center">
      <div class="d-flex justify-center">
        <v-card
          width="400"
          min-height="340"
          id="downloadCard"
          class="rounded-xl pa-md-5 pa-5"
          color="#3f51a5"
          elevation="12"
          style="opacity:0"
        >
          <div class="d-flex flex-column justify-center" style="height:100%">
            <h1 class="text-center white--text  text-md-h4 text-h5">下载直播软件</h1>
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
          </div>
        </v-card>
        <historyVersion :info="userAgentInfo" ></historyVersion>
      </div>
    </div>
  </div>
</template>
<script>
import gsap from "gsap";
import btn from "~/components/base/btn";
import { downloadCard, historyVersions } from "~/config/gsap";
import isWin7 from "~/components/base/isWindows7";
import { readUserAgent } from "~/config/userAgent";
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
      historyVersions(
        document.querySelector("#downloadCard"),
        document.querySelector("#ceshiCard")
      );
    }
  }
};
</script>