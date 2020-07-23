<template>
  <div>
    <transition name="zcy">
      <div v-if="isShow">
        <!-- TODO 这些能否用一个组件完成？ -->
        <div v-if="info.isWindows&&info.winVersion!='win 7'">
          <!-- win10/win8 -->
          <notWin7 :info="info" @historyVersion="historyVersion"></notWin7>
        </div>
        <div v-else-if="info.isWindows==false&&info.isMac&&info.flag">
          <!-- mac -->
          <isMac :info="info" @historyVersion="historyVersion"></isMac>
        </div>
        <div v-else-if="info.isWindows&&info.winVersion=='win 7'">
          <!-- win7 -->
          <isWin7 :info="info" @historyVersion="historyVersion"></isWin7>
        </div>
        <div v-if="info.flag==false&&info.mobileSystem=='iPhone'">
          <!-- iOS -->
          <isIphone :info="info" @historyVersion="historyVersion"></isIphone>
        </div>
        <div v-else-if="info.flag==false&&info.mobileSystem=='Android'">
          <!-- android -->
          <isAndroid :info="info" @historyVersion="historyVersion"></isAndroid>
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
import { moreVersions } from "~/config/gsap";
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
      isShow: false
    };
  },
  methods: {
    historyVersion() {
      this.$emit("historyVersion");
    }
  }
};
</script>