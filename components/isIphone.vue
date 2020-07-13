<template>
  <div>
    <btn :btnInfo="ceshi1"></btn>
    <btn :btnInfo="ceshi2"></btn>
    <btn :btnInfo="ceshi3"></btn>
    <btn :btnInfo="ceshi4"></btn>
    <btn :btnInfo="ceshi5"></btn>
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
      href: ""
    };
    this.ceshi3 = {
      downloadInfo: "Windows 64位",
      block: true,
      icon: "mdi-microsoft-windows",
      href: ""
    };
    this.ceshi4 = {
      downloadInfo: "Windows 32位",
      block: true,
      icon: "mdi-microsoft-windows",
      href: ""
    };
    this.ceshi5 = {
      downloadInfo: "Windows历史版本",
      block: true,
      icon: "mdi-microsoft-windows",
      href: ""
    };
  }
};
</script>