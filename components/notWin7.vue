<template>
  <div>
    <btn :btnInfo="ceshi1"></btn>
    <btn :btnInfo="ceshi2"></btn>
    <btn :btnInfo="ceshi5" @historyVersion="historyVersion" ref="historyVersion"></btn>
    <div class="d-flex justify-space-between">
      <btn :btnInfo="ceshi3"></btn>
      <btn :btnInfo="ceshi4"></btn>
    </div>
  </div>
</template>
<script>
import { setBtn } from "~/config/setBtn";
import btn from "~/components/base/btn";
export default {
  components: {
    btn
  },
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
    this.ceshi1 = setBtn(this.info).moreinfos;
    this.ceshi2 = setBtn(this.info).otherSystem;
    this.ceshi3 = {
      downloadInfo: "Android",
      block: false,
      icon: "mdi-android",
      href: "",

    };
    this.ceshi4 = {
      downloadInfo: "IOS",
      block: false,
      icon: "mdi-apple",
      href: "",
      ml:4
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