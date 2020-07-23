<template>
  <div>
    <btn v-for="(content,index) in restart.desktop" :key="index" :btnInfo="content"></btn>
    <btn :btnInfo="restart.history_version" @historyVersion="historyVersion"></btn>
  </div>
</template>
<script>
import { btnList } from "~/config/btnList";
export default {
  props: ["info"],
  data() {
    return {
      restart: {}
    };
  },
  beforeMount() {
    //TODO system变量应该根据点击按钮绑定的数据自动传入，不需要手动传入Android，或者iPhone，mac等
    this.restart = btnList(this.info, "Android");
  },
  methods: {
    historyVersion() {
      this.$emit("historyVersion");
    }
  }
};
</script>