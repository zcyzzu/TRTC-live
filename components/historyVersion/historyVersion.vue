<template>
  <div>
    <v-card
      color="#3f51a5"
      elevation="12"
      min-height="268"
      max-height="620"
      class="rounded-xl pa-md-5 pa-5"
      style="display:none;position:relative;right:1000px"
      width="400"
      id="ceshiCard"
    >
      <h1 class="text-md-h4 text-h5 white--text text-center">历史版本下载</h1>
      <p class="white--text my-2" v-if="isMacLength">
        <v-icon color="white" style="position:relative;top:-2px">mdi-apple</v-icon>&nbsp;Mac版
      </p>
      <div class="d-flex flex-wrap justify-space-between main" v-if="isMacLength">
        <v-btn
          color="#1976d2"
          class="white--text ma-1"
          max-height="60"
          min-height="50"
          v-for="(item,index) in mac"
          :key="index"
          :href="item.href"
        >
          <v-icon>mdi-download</v-icon>
          {{item.version}}
        </v-btn>
      </div>
      <p class="white--text my-2" v-if="isWindowsLength">
        <v-icon color="white" style="position:relative;top:-2px">mdi-microsoft-windows</v-icon>&nbsp;Windows版
      </p>
      <div class="d-flex flex-wrap justify-space-between main" v-if="isWindowsLength">
        <v-btn
          color="#1976d2"
          class="white--text ma-1"
          max-height="60"
          min-height="50"
          v-for="(content,index) in windows"
          :key="index"
          :href="content.href"
        >
          <v-icon>mdi-download</v-icon>
          {{content.version}}
        </v-btn>
      </div>
      <p class="white--text my-2 text-md-6 text-center" v-if="noHistory">暂无历史版本</p>
      <v-btn
        @click="back"
        block
        color="#1976d2"
        max-height="60"
        min-height="50"
        class="white--text my-2"
      >
        <v-icon style="position:relative;top:1px" small>mdi-chevron-left</v-icon>返回
      </v-btn>
    </v-card>
  </div>
</template>
<script>
import { backToLatest } from "~/config/gsap";
import { mac, windows } from "~/config/history_version";
export default {
  props: ["info"],
  data() {
    return {
      mac: mac,
      windows: windows,
      isMacLength: false,
      isWindowsLength: false,
      noHistory: false
    };
  },
  mounted() {
    this.mac.length ? (this.isMacLength = true) : null;
    this.windows.length ? (this.isWindowsLength = true) : null;
    !this.isMacLength && !this.isWindowsLength ? (this.noHistory = true) : null;
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
<style scoped>
.main {
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 175px;
}
.main p {
  height: 300px;
}
/*-------滚动条整体样式----*/
.main::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
/*滚动条里面小方块样式*/
.main::-webkit-scrollbar-thumb {
  border-radius: 100px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: skyblue;
}
/*滚动条里面轨道样式*/
.main::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
</style>

