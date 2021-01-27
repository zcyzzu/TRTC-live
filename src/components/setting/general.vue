<template>
  <div>
    <v-row no-gutters class="mb-8">
      <v-col class="px-6 d-flex  align-center">
        <span class="spanName">分辨率设置：</span>
        <v-select
          :items="items"
          outlined
          v-model="resolution"
          @change="encParams"
          hide-details=""
          label="视频分辨率"
        ></v-select>
      </v-col>
    </v-row>
    <v-row no-gutters class="mb-8">
      <v-col class="px-6 d-flex  align-center">
        <span class="spanName">帧率设置：</span>
        <v-select
          :items="FPS"
          outlined
          v-model="videoFps"
          @change="encParams"
          hide-details=""
          label="视频帧率"
        ></v-select>
      </v-col>
    </v-row>
    <v-row no-gutters class="mb-8">
      <v-col class="px-6 d-flex  align-center">
        <span class="spanName">码率设置：</span>
        <v-select
          :items="bitrate"
          outlined
          v-model="bitrateValue"
          @change="encParams"
          hide-details=""
          label="视频码率"
        ></v-select>
      </v-col>
    </v-row>
    <v-row no-gutters class="mb-8">
      <v-col class="px-6 d-flex  align-center">
        <span>优先级设置：</span>
        <v-switch
          v-model="priority"
          @change="priorityChange"
          :label="`${priority ? '优先流畅' : '优先清晰'}`"
        ></v-switch>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import {
  TRTCVideoEncParam,
  TRTCNetworkQosParam,
} from "trtc-electron-sdk/liteav/trtc_define";
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
      priority: true, //优先级
    };
  },
  mounted() {
    let general = JSON.parse(window.localStorage.getItem("general"));
    window.localStorage.getItem("priprity") === "true"
      ? (this.priority = true)
      : (this.priority = false);
    if (general) {
      this.resolution = general.videoResolution;
      this.videoFps = general.videoFps;
      this.bitrateValue = general.videoBitrate;
    }
  },
  methods: {
    encParams() {
      const params = new TRTCVideoEncParam();
      params.videoResolution = Number(this.resolution);
      params.videoFps = this.videoFps;
      params.videoBitrate = this.bitrateValue;
      this.trtcCloud.setVideoEncoderParam(params);
      window.localStorage.setItem(
        "general",
        JSON.stringify({
          videoResolution: this.resolution,
          videoFps: this.videoFps,
          videoBitrate: this.bitrateValue,
        })
      );
    },
    priorityChange() {
      const params = new TRTCNetworkQosParam();
      window.localStorage.setItem("priprity", this.priority);
      if (this.priority) {
        params.preference = 1;
      } else {
        params.preference = 2;
      }
    },
  },
  computed: {
    ...mapState(["trtcCloud"]),
  },
};
</script>
<style lang="scss">
.spanName {
  width: 100px !important;
  text-align: left;
}
.spanName_long {
  width: 150px;
  text-align: left;
}
</style>
