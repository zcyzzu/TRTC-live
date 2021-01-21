<template>
  <div class="home d-flex align-center">
    <v-card class="mx-auto" width="400">
      <v-card-title>
        请输入房间口令
      </v-card-title>
      <v-text-field class="px-6" label="请输入房间口令"></v-text-field>
      <v-btn color="blue dark-2" class="white--text">
        进入房间
      </v-btn>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </v-card-actions>
      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
          <v-row no-gutters>
            <v-col>
              <span class="mx-1">摄像头</span>
              <v-icon v-if="!cameraWarning" color="success">mdi-check</v-icon>
              <v-icon v-else color="red">mdi-close</v-icon>
              <span class="mx-1">麦克风</span>
              <v-icon v-if="!micWarning" color="success">mdi-check</v-icon>
              <v-icon v-else color="red">mdi-close</v-icon>
              <span class="mx-1">扬声器</span>
              <v-icon v-if="!speakerWarning" color="success">mdi-check</v-icon>
              <v-icon v-else color="red">mdi-close</v-icon>
            </v-col>
          </v-row>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>
<script>
import TRTCCloud from "trtc-electron-sdk";
import trtcState from "../common/trtc-state";
export default {
  name: "Home",
  data() {
    return {
      micVolume: 0,
      speakerVolume: 0,
      cameraWarning: false,
      micWarning: false,
      speakerWarning: false,
      show: false,
    };
  },
  methods: {
    setCameraWarning(bool) {
      this.cameraWarning = bool;
    },
    setMicWarning(bool) {
      this.micWarning = bool;
    },
    setSpeakerWarning(bool) {
      this.speakerWarning = bool;
    },
    onDeviceCheck(opt) {
      this.cameraWarning = !opt.camera;
      this.micWarning = !opt.mic;
      this.speakerWarning = !opt.speaker;
      this.micVolume = opt.micVolume;
      this.speakerVolume = opt.speakerVolume;
    },
  },

  computed: {
    camera() {
      let result = trtcState.isCameraReady();
      this.setCameraWarning(!result);
      return result;
    },
    mic() {
      let result = trtcState.isMicReady();
      this.setMicWarning(!result);
      return result;
    },
    speaker() {
      let result = trtcState.isSpeakerReady();
      this.setSpeakerWarning(!result);
      return result;
    },

    checkResult() {
      return this.camera && this.mic && this.speaker;
    },
  },
  beforeDestroy() {
    trtcState.stopCheckTask();
  },
  created() {
    trtcState.startCheckTask(this.onDeviceCheck.bind(this));
  },
};
</script>
<style lang="scss" scoped>
.home {
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3)),
    url("../assets/login-bg.jpg");
  background-size: 100% 100%;
}
</style>
