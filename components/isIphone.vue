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
    this.restart = btnList(this.info, "iPhone");
  },
  methods: {
    historyVersion() {
      this.$emit("historyVersion");
    }
  }
};
</script>