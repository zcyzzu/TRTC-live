<template>
  <div>
    <v-row no-gutters>
      <v-col class="px-6 d-flex  align-center">
        <span class="spanName">分辨率设置：</span>
        <v-select
          :items="items"
          outlined
          v-model="resolution"
          hide-details=""
          label="视频分辨率"
        ></v-select>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col class="px-6 d-flex  align-center">
        <span class="spanName">帧率设置：</span>
        <v-select
          :items="FPS"
          outlined
          v-model="videoFps"
          hide-details=""
          label="视频帧率"
        ></v-select>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col class="px-6 d-flex  align-center">
        <span class="spanName">码率设置：</span>
        <v-select
          :items="bitrate"
          outlined
          v-model="bitrateValue"
          hide-details=""
          label="视频码率"
        ></v-select>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col class="px-6 d-flex  align-center">
        <span>优先级设置：</span>
        <v-switch
          v-model="priority"
          :label="`${priority ? '音频优先' : '视频优先'}`"
        ></v-switch>
      </v-col>
      <v-col class="px-6 d-flex  align-center">
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
import { TRTCVideoEncParam } from "trtc-electron-sdk/liteav/trtc_define";
import { mapState } from "vuex";
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
      FPS: [5, 10, 15, 20, 25],
      bitrate: [250, 550, 600, 850, 1600],
      resolution: "1280 x 720", //帧率
      videoFps: 15, //帧率
      bitrateValue: 1600, //码率
      screen: true, //横/竖模式
      priority: true, //优先级
    };
  },
  mounted() {},
  methods: {},
  computed: {
    ...mapState(["trtcCloud"]),
  },
};
</script>
<style lang="scss" scoped>
.spanName {
  width: 100px !important;
  text-align: left;
}
</style>
