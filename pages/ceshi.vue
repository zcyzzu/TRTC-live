<template>
  <div class="zIndex">
    <pageBar></pageBar>
    <v-card
      max-width="400"
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
      <moreVersion :info="userAgentInfo"></moreVersion>
    </v-card>
  </div>
</template>
<script>
import btn from "~/components/base/btn";
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
};
</script>