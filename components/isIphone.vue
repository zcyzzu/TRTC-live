<template>
  <div>
    <btn :btnInfo="ceshi1"></btn>
    <btn :btnInfo="ceshi2"></btn>
    <btn :btnInfo="ceshi3"></btn>
    <btn :btnInfo="ceshi4"></btn>
    <btn :btnInfo="ceshi5" @historyVersion="historyVersion"></btn>
  </div>
</template>
<script>
export default {
  props: ["info"],
  data() {
    return {
      ceshi1: {},
      ceshi2: {},
      ceshi3: {},
      ceshi4: {},
      ceshi5: {}
    };
  },
  mounted() {
    this.ceshi1 = {
      downloadInfo: "Android",
      block: true,
      icon: "mdi-android",
      href: ""
    };
    this.ceshi2 = {
      downloadInfo: "MacOS",
      block: true,
      icon: "mdi-apple",
      href: "http://openstore.daoshi.cloud/zhibola/zhibola_latest_mac.dmg"
    };
    this.ceshi3 = {
      downloadInfo: "Windows 64位",
      block: true,
      icon: "mdi-microsoft-windows",
      href: "http://openstore.daoshi.cloud/zhibola/zhibola_latest_win_x64%20.exe"
    };
    this.ceshi4 = {
      downloadInfo: "Windows 32位",
      block: true,
      icon: "mdi-microsoft-windows",
      href: "http://openstore.daoshi.cloud/zhibola/zhibola_latest_win_ia32%20.exe"
    };
    this.ceshi5 = {
      downloadInfo: "历史版本下载",
      block: true,
      icon: "",
      href: "",
      rightArray:'mdi-chevron-right'
    };
  },
  methods: {
    historyVersion(){
      this.$emit('historyVersion')
    }
  },
};
</script>