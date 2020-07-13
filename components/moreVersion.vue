<template>
  <div>
    <v-btn
      max-height="60"
      min-height="50"
      @click="checkVersion"
      color="blue darken-2"
      block
      class="white--text mt-3"
    >
      更多版本下载
      <v-icon id="reverseIcon" color="white" right>mdi-chevron-down</v-icon>
    </v-btn>
    <div v-if="info.isWindows&&info.winVersion!='win 7'">
      <notWin7 :info="info"></notWin7>
    </div>
    <div v-else-if="info.isWindows&&info.isMac">
      <isMac :info="info"></isMac>
    </div>
    <div v-else-if="info.isWindows&&info.winVersion=='win 7'">
      <isWin7 :info="info"></isWin7>
    </div>
    <div v-else-if="(!info.flag)&&info.mobileSystem=='iPhone'">
      <isIphone :info="info"></isIphone>
    </div>
    <div v-else>
      <isAndroid :info="info"></isAndroid>
    </div>
  </div>
</template>
<script>
import { moreVersion } from "~/config/gsap";
import { setBtn } from "~/config/setBtn";
import btn from "~/components/base/btn";
import notWin7 from "~/components/notWin7";
import isMac from "~/components/isMac";
import isWin7 from "~/components/isWin7";
import isIphone from "~/components/isIphone";
import isAndroid from "~/components/isAndroid";
export default {
  components: {
    btn,
    notWin7,
    isMac,
    isWin7,
    isIphone,
    isAndroid
  },
  props: ["info"],
  data() {
    return {
      isReverseIcon: true
    };
  },

  methods: {
    checkVersion() {
      this.isReverseIcon = !this.isReverseIcon;
      moreVersion(document.querySelector("#reverseIcon"), this.isReverseIcon);
    }
  }
};
</script>