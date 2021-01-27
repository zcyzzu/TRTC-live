<template>
  <div>
    <v-row no-gutters>
      <v-col class="px-6 d-flex  align-center">
        <span class="spanName">分辨率设置：</span>
        <v-select outlined hide-details="" label="视频分辨率"></v-select>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col class="px-6 d-flex  align-center">
        <span>优先级设置：</span>
        <v-switch :label="`${priority ? '音频优先' : '视频优先'}`"></v-switch>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      micList: [],
      speakerList: [],
    };
  },
  mounted() {
    //测试
    console.log(this.trtcCloud.getMicDevicesList());
    console.log(this.trtcCloud.getSpeakerDevicesList());
    // console.log(this.trtcCloud.getCurrentMicDeviceVolume());
    // console.log(this.trtcCloud.getCurrentSpeakerVolume());
  },
  methods: {
    init() {
      this.trtcCloud.getMicDevicesList().forEach((ele) => {
        this.micList.push(ele.deviceName);
      });
      this.trtcCloud.getSpeakerDevicesList().forEach((ele) => {
        this.speakerList.push(ele.deviceName);
      });
    },
  },
  computed: {
    ...mapState(["trtcCloud"]),
  },
};
</script>
