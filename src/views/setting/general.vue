<template>
  <div>
    <v-row no-gutters>
      <v-col class="px-10 d-flex  align-center">
        <span>分辨率设置：</span>
        <v-select
          :items="items"
          outlined
          v-model="resolution"
          hide-details=""
          label="显示分辨率"
        ></v-select>
        {{ resolution }}
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col class="px-10 d-flex  align-center">
        <span>优先级设置：</span>
        <v-switch
          v-model="priority"
          :label="`${priority ? '音频优先' : '视频优先'}`"
        ></v-switch>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col class="px-10 d-flex  align-center">
        <span>横/竖屏模式：</span>
        <v-switch
          v-model="screen"
          :label="`${screen ? '横屏模式' : '竖屏模式'}`"
        ></v-switch>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import {
  TRTCVideoResolution,
  TRTCVideoQosPreference,
  TRTCQosControlMode,
  TRTCAppScene,
  TRTCVideoResolutionMode,
} from "trtc-electron-sdk/liteav/trtc_define";
export default {
  data() {
    return {
      items: [
        //分辨率
        "320 x 180",
        "320 x 240",
        "640 x 360",
        "640 x 480",
        "960 x 540",
        "1280 x 720",
      ],
      resolution: "1280 x 720",
      priority: true, //优先级
      screen: true, //横/竖模式
    };
  },
  mounted() {
    this.activeClass();
  },
  methods: {
    activeClass() {
      let doms = document.querySelectorAll(".item");
      for (let i = 0; i < 3; i++) {
        doms[i].classList.remove("active");
      }
      doms[this.$route.meta.active].classList.add("active");
    },
  },
};
</script>
