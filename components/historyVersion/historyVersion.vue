<template>
  <div>
    <v-card
      color="#3f51a5"
      elevation="12"
      min-height="340"
      class="rounded-xl pa-md-5 pa-5"
      style="display:none;position:relative;right:1000px"
      max-width="400"
      id="ceshiCard"
    >
      <h1 class="text-md-h4 text-h5 white--text text-center">历史版本下载</h1>
      <p class="white--text my-2">
        <v-icon color="white" style="position:relative;top:-2px">mdi-apple</v-icon>&nbsp;Mac版
      </p>
      <div class="d-flex flex-wrap justify-space-between" >
          
        <v-btn color="#1976d2" class="white--text ma-1" v-for="(item,index) in mac" :key="index" :href="item.href">
          <v-icon>mdi-download</v-icon>
          {{item.version}}
        </v-btn>
      </div>
      <p class="white--text my-2">
        <v-icon color="white" style="position:relative;top:-2px">mdi-microsoft-windows</v-icon>&nbsp;Windows版
      </p>
      <div class="d-flex flex-wrap justify-space-between">
        <v-btn
          color="#1976d2"
          class="white--text ma-1"
          v-for="(content,index) in windows"
          :key="index"
          :href="content.href"
        >
          <v-icon>mdi-download</v-icon>
          {{content.version}}
        </v-btn>
      </div>
      <v-btn @click="back" block color="#1976d2" class="white--text my-2">
        <v-icon style="position:relative;top:1px" small>mdi-chevron-left</v-icon>返回
      </v-btn>
    </v-card>
  </div>
</template>
<script>
import gsap from "gsap";
import { backToLatest } from "~/config/gsap";
import { mac, windows } from "~/config/history_version";
export default {
  props: ["info"],
  data() {
    return {
      mac: mac,
      windows: windows
    };
  },
  methods: {
    back() {
      backToLatest(
        document.querySelector("#downloadCard"),
        document.querySelector("#ceshiCard")
      );
    }
  }
};
</script>