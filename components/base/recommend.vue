<template>
  <div>
    <h1 class="text-center white--text text-md-h4 text-h5">下载直播软件</h1>
    <p class="white--text my-5">
      根据当前设备，推荐你选择
      <v-icon small color="white" style="position:relative;top:-1px">{{version.icon}}</v-icon>
      {{version.downloadInfo}}
      <span
        v-if="version.downloadInfo=='MacOs'||version.downloadInfo=='ios'||version.downloadInfo=='Android'"
      >版</span>
      <span v-else>位版</span>
    </p>
    <div v-if="info.winVersion=='win 7'">
      <isWin7></isWin7>
      <div class="d-flex justify-space-between">
        <btn :btnInfo="moduleOne"></btn>
        <btn :btnInfo="moduleTwo"></btn>
      </div>
    </div>
    <btn :btnInfo="download"></btn>
  </div>
</template>
<script>
import { setBtn } from "~/config/setBtn";
import btn from "~/components/base/btn";
import isWin7 from "~/components/base/isWindows7";

export default {
  props: ["info"],
  components: {
    isWin7,
    btn
  },
  mounted() {
    this.version = setBtn(this.info).infos;
    this.download = setBtn(this.info).infos;
  },
  data() {
    return {
      version: "",
      moduleOne: {
        downloadInfo: "依赖①",
        block: false,
        icon: "",
        href:
          "https://openstore.daoshi.cloud/zhibola/Windows6.1-KB4019990-x86.msu"
      },
      moduleTwo: {
        downloadInfo: "依赖②",
        block: false,
        icon: "",
        href:
          "https://openstore.daoshi.cloud/zhibola/NDP471-KB4033342-x86-x64-AllOS-ENU.exe"
      },
      download: {
        downloadInfo: "",
        block: true,
        icon: "",
        href: ""
      }
    };
  }
};
</script>