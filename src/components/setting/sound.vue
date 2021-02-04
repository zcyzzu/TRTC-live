<template>
  <div>
    <v-row no-gutters class="mb-8">
      <v-col class="px-6 d-flex align-center" id="step3">
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
      <v-col class="px-6 d-flex align-center" id="step4">
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
      <v-col class="px-6 d-flex align-center" id="step5">
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
      <v-col class="px-6 d-flex align-center" id="step6">
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
      <v-col class="px-6 d-flex align-center" id="step7">
        <span class="spanName">麦克风测试：</span>
        <v-btn class="mr-6" @click="startTestMic">启动测试</v-btn>
        <v-btn @click="stopTestMic">停止测试</v-btn>
      </v-col>
    </v-row>
    <v-row no-gutters class="px-6 mb-8">
      <v-progress-linear :value="micProgress"></v-progress-linear>
    </v-row>
    <v-row no-gutters>
      <v-col class="px-6 d-flex align-center" id="step8">
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
import Driver from "driver.js";
import { AudioMusicParam } from "trtc-electron-sdk";
import { steps } from "@/common/soundDriver";
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
    //分割线
    const driver = new Driver({
      allowClose: false,
      closeBtnText: "关闭引导",
      doneBtnText: "完成",
      nextBtnText: "下一条",
      prevBtnText: "上一条",
      opacity: 0,
      keyboardControl: false,
    });
    driver.defineSteps(steps);
    setTimeout(() => {
      if (!window.localStorage.getItem("isDriverStatus")) {
        driver.start();
      }
      let highlighted = document.querySelectorAll(
        "#driver-highlighted-element-stage"
      );
      highlighted.forEach((ele) => {
        ele.style.cssText = "opacity:0";
      });
    }, 100);
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
          this.trtcCloud.setCurrentSpeakerDevice(this.speakerList[1][index]);
        }
      });
    },
    micVolChange(e) {
      this.trtcCloud.setCurrentMicDeviceVolume(Math.ceil(e));
    },
    speakerVolChange(e) {
      this.trtcCloud.setCurrentSpeakerVolume(Math.ceil(e));
    },
    init() {
      this.micList = [[], []];
      this.speakerList = [[], []];
      if (this.trtcCloud.getMicDevicesList().length > 0) {
        this.trtcCloud.getMicDevicesList().forEach((ele) => {
          this.micList[0].push(ele.deviceName);
          this.micList[1].push(ele.deviceId);
        });
        this.mic = this.micList[0][0];
        this.micVol = this.trtcCloud.getCurrentMicDeviceVolume();
      } else {
        this.micList[0].push("未找到可用的麦克风");
        this.micList[1].push("未找到可用的麦克风");
      }
      if (this.trtcCloud.getSpeakerDevicesList().length > 0) {
        this.trtcCloud.getSpeakerDevicesList().forEach((ele) => {
          this.speakerList[0].push(ele.deviceName);
          this.speakerList[1].push(ele.deviceId);
        });
        this.speaker = this.speakerList[0][0];
        this.speakerVol = this.trtcCloud.getCurrentSpeakerVolume();
      } else {
        this.speakerList[0].push("未找到可用的扬声器");
        this.speakerList[1].push("未找到可用的扬声器");
      }
    },
    startTestSpeaker() {
      if (this.speakerList[0] === "未找到可用的扬声器") {
        this.$refs.log.logInfo = {
          logText: "未找到可用的扬声器",
          logStatus: true,
          logType: "error",
        };
      } else {
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
      }
    },
    stopTestSpeaker() {
      if (this.speakerList[0] === "未找到可用的扬声器") {
        this.$refs.log.logInfo = {
          logText: "未找到可用的扬声器",
          logStatus: true,
          logType: "error",
        };
      } else {
        this.speakerProgress = 0;
        this.$refs.log.logInfo = {
          logText: "扬声器测试结束",
          logStatus: true,
          logType: "warning",
        };
        this.trtcCloud.stopPlayMusic(1);
      }
    },
    startTestMic() {
      if (this.micList[0] === "未找到可用的麦克风") {
        this.$refs.log.logInfo = {
          logText: "未找到可用的麦克风",
          logStatus: true,
          logType: "error",
        };
      } else {
        this.$refs.log.logInfo = {
          logText: "开始麦克风测试",
          logStatus: true,
          logType: "success",
        };
        this.trtcCloud.startMicDeviceTest(1000);
      }
    },
    stopTestMic() {
      if (this.micList[0] === "未找到可用的麦克风") {
        this.$refs.log.logInfo = {
          logText: "未找到可用的麦克风",
          logStatus: true,
          logType: "error",
        };
      } else {
        this.$refs.log.logInfo = {
          logText: "麦克风测试结束",
          logStatus: true,
          logType: "warning",
        };
        this.trtcCloud.stopMicDeviceTest();
        this.micProgress = 0;
      }
    },
  },
  computed: {
    ...mapState(["trtcCloud"]),
  },
};
</script>
