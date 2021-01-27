<template>
  <div>
    <v-row no-gutters class="mb-8">
      <v-col class="px-6 d-flex  align-center">
        <span class="spanName">麦克风：</span>
        <v-select
          outlined
          hide-details=""
          :items="micList[0]"
          v-model="mic"
          @change="micChange"
          label="麦克风选择"
        ></v-select>
      </v-col>
    </v-row>
    <v-row no-gutters class="mb-8">
      <v-col class="px-6 d-flex  align-center">
        <span class="spanName">扬声器：</span>
        <v-select
          outlined
          hide-details=""
          :items="speakerList[0]"
          @change="speakerChange"
          v-model="speaker"
          label="扬声器选择"
        ></v-select>
      </v-col>
    </v-row>
    <v-row no-gutters class="mb-8">
      <v-col class="px-6 d-flex  align-center">
        <span class="spanName_long">麦克风音量：</span>
        <v-progress-linear
          v-model="micVol"
          @change="micVolChange"
          color="success"
          height="15"
        >
          <strong>{{ Math.ceil(micVol) }}%</strong>
        </v-progress-linear>
      </v-col>
    </v-row>
    <v-row no-gutters class="mb-8">
      <v-col class="px-6 d-flex  align-center">
        <span class="spanName_long">扬声器音量：</span>
        <v-progress-linear
          v-model="speakerVol"
          @change="speakerVolChange"
          color="success"
          height="15"
        >
          <strong>{{ Math.ceil(speakerVol) }}%</strong></v-progress-linear
        >
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col class="px-6 d-flex align-center">
        <span class="spanName">麦克风测试：</span>
        <v-btn class="mr-6" @click="startTestMic">启动测试</v-btn>
        <v-btn @click="stopTestMic">停止测试</v-btn>
      </v-col>
    </v-row>
    <v-row no-gutters class="px-6 mb-8">
      <v-progress-linear :value="micProgress"></v-progress-linear>
    </v-row>
    <v-row no-gutters>
      <v-col class="px-6 d-flex align-center">
        <span class="spanName">扬声器测试：</span>
        <v-btn @click="startTestSpeaker" class="mr-6">启动测试</v-btn>
        <v-btn @click="stopTestSpeaker">停止测试</v-btn>
      </v-col>
    </v-row>
    <v-row no-gutters class="px-6">
      <v-progress-linear :value="speakerProgress"></v-progress-linear>
    </v-row>
    <log ref="log"></log>
  </div>
</template>
<script>
import { mapState } from "vuex";
import log from "@/components/log";
import { AudioMusicParam } from "trtc-electron-sdk";
export default {
  components: {
    log,
  },
  data() {
    return {
      micList: [[], []],
      speakerList: [[], []],
      mic: "",
      speaker: "",
      micVol: "",
      speakerVol: "",
      speakerProgress: 0,
      micProgress: 0,
      testPath: "E:/work/daoshicloud-live-electron/src/resources/testspeak.mp3",
    };
  },
  mounted() {
    this.init();
    this.trtcCloud.on("onTestMicVolume", (volume) => {
      this.micProgress = volume;
    });
  },
  methods: {
    micChange(e) {
      this.micList[0].forEach((ele, index) => {
        if (e === ele) {
          this.trtcCloud.setCurrentMicDevice(this.micList[1][index]);
        }
      });
    },
    speakerChange(e) {
      this.speakerList.forEach((ele, index) => {
        if (e === ele) {
          console.log(this.speakerList[1][index]);
          this.trtcCloud.setCurrentSpeakerDevice(this.speakerList[1][index]);
        }
      });
    },
    micVolChange(e) {
      this.trtcCloud.setCurrentMicDeviceVolume(Math.ceil(e));
    },
    speakerVolChange(e) {
      console.log(Math.ceil(e));
      this.trtcCloud.setCurrentSpeakerVolume(Math.ceil(e));
    },
    init() {
      this.micList = [[], []];
      this.speakerList = [[], []];
      this.trtcCloud.getMicDevicesList().forEach((ele) => {
        this.micList[0].push(ele.deviceName);
        this.micList[1].push(ele.deviceId);
      });
      this.trtcCloud.getSpeakerDevicesList().forEach((ele) => {
        this.speakerList[0].push(ele.deviceName);
        this.speakerList[1].push(ele.deviceId);
      });
      this.mic = this.micList[0][0];
      this.speaker = this.speakerList[0][0];
      this.micVol = this.trtcCloud.getCurrentMicDeviceVolume();
      this.speakerVol = this.trtcCloud.getCurrentSpeakerVolume();
    },
    startTestSpeaker() {
      const params = new AudioMusicParam();
      params.id = 1;
      params.path = this.testPath;
      params.publish = true;
      this.trtcCloud.startPlayMusic(params, {
        onStart: (id, errCode) => {
          this.$refs.log.logInfo = {
            logText: "开始扬声器测试",
            logStatus: true,
            logType: "success",
          };
        },
        onPlayProgress: (id, curPtsMS, durationMS) => {
          this.speakerProgress = Math.ceil((curPtsMS / durationMS) * 100);
        },
        onComplete: (id, errCode) => {
          this.speakerProgress = 0;
          this.$refs.log.logInfo = {
            logText: "扬声器测试结束",
            logStatus: true,
            logType: "success",
          };
        },
      });
    },
    stopTestSpeaker() {
      this.speakerProgress = 0;
      this.$refs.log.logInfo = {
        logText: "扬声器测试结束",
        logStatus: true,
        logType: "warning",
      };
      this.trtcCloud.stopPlayMusic(1);
    },
    startTestMic() {
      this.$refs.log.logInfo = {
        logText: "开始麦克风测试",
        logStatus: true,
        logType: "success",
      };
      this.trtcCloud.startMicDeviceTest(300);
    },
    stopTestMic() {
      this.$refs.log.logInfo = {
        logText: "麦克风测试结束",
        logStatus: true,
        logType: "warning",
      };
      this.trtcCloud.stopMicDeviceTest();
      this.micProgress = 0;
    },
  },
  computed: {
    ...mapState(["trtcCloud"]),
  },
};
</script>
