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
    <transition name="zcy">
      <div v-if="isShow">
        <div v-if="info.isWindows&&info.winVersion!='win 7'">
          <!-- win10/win8 -->
          <notWin7 :info="info" @historyVersion="historyVersion"></notWin7>
        </div>
        <div v-else-if="info.isWindows==false&&info.isMac">
          <!-- mac -->
          <isMac :info="info"></isMac>
        </div>
        <div v-else-if="info.isWindows&&info.winVersion=='win 7'">
          <!-- win7 -->
          <isWin7 :info="info"></isWin7>
        </div>
        <div v-else-if="(!info.flag)&&info.mobileSystem=='iPhone'">
          <!-- ios -->
          <isIphone :info="info"></isIphone>
        </div>
        <div v-else>
          <!-- android -->
          <isAndroid :info="info"></isAndroid>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import gsap from "gsap";
import isMac from "~/components/isMac";
import btn from "~/components/base/btn";
import { setBtn } from "~/config/setBtn";
import isWin7 from "~/components/isWin7";
import notWin7 from "~/components/notWin7";
import { moreVersion } from "~/config/gsap";
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
      isReverseIcon: true,
      isShow: false
    };
  },

  methods: {
    checkVersion() {
      this.isReverseIcon = !this.isReverseIcon;
      moreVersion(document.querySelector("#reverseIcon"), this.isReverseIcon);
      this.isShow=!this.isShow
    },
    historyVersion(){
      this.$emit('historyVersion')
    }
  }
};
</script>