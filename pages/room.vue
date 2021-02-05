<template>
  <div>
    <div id="remote_stream"></div>
    <div
      v-if="haveAnchor"
      class="d-flex justify-center align-center"
      style="height: 95vh; width: 100vw"
    >
      <span class="text-h3"> 当前房间没有讲师/讲师已离开 </span>
    </div>
    <div id="power" class="d-flex flex-column justify-end align-center">
      <div class="my-4">
        <v-btn icon @click="toggleMic">
          <v-icon x-large v-if="micStatus === false" color="green"
            >mdi-microphone</v-icon
          >
          <v-icon x-large v-else color="red">mdi-microphone</v-icon>
        </v-btn>
      </div>
      <div class="mb-4">
        <v-btn icon @click="toggleVol">
          <v-icon x-large v-if="speakerStatus === false" color="green"
            >mdi-volume-high</v-icon
          >
          <v-icon x-large v-else color="red">mdi-volume-high</v-icon>
        </v-btn>
      </div>
      <div class="mb-4">
        <v-btn @click="exitRoom(false)" icon>
          <v-icon x-large color="error">mdi-power</v-icon>
        </v-btn>
      </div>
    </div>
    <overlay @exitRoom="exitRoom" ref="overlays"></overlay>
    <log ref="log"></log>
  </div>
</template>
<script>
import log from "~/components/common/log";
import { isSupport } from "~/modules/uaSupport";
import overlay from "~/components/common/overlay";
export default {
  components: {
    overlay,
    log,
  },
  data() {
    return {
      TRTC: null,
      roomid: "",
      sdkappid: "",
      userid: "",
      usersig: "",
      client: null,
      localStream: null,
      remoteStream: null,
      micStatus: false,
      speakerStatus: false,
      remoteList: [],
      haveAnchor: false,
    };
  },
  async created() {
    if (process.client) {
      this.TRTC = require("trtc-js-sdk");
    }
    this.roomid = this.$route.query.roomid;
    this.sdkappid = this.$route.query.sdkappid;
    this.userid = this.$route.query.userid;
    this.usersig = this.$route.query.usersig;
  },
  async mounted() {
    this.$nuxt.error(await isSupport());
    if (this._isMobile()) {
      this.$refs.overlays.info = {
        text: "为获得更好的观看体验，请将手机设置为横屏显示！",
        isOverlay: true,
      };
    }
    this.renderResize();
    window.addEventListener("resize", this.renderResize, false);
    this.isSupportBrowser();
    /**
     * @description 创建 Client 对象
     */
    this.client = this.TRTC.createClient({
      mode: "rtc",
      sdkAppId: this.sdkappid,
      userId: this.userid,
      userSig: this.usersig,
    });
    this.client.on("peer-leave", (event) => {
      const userId = event.userId;
      if (this.remoteList.indexOf(userId) > -1) {
        this.remoteList = [];
        this.remoteStream.stop();
        document
          .querySelector("#remote_stream")
          .parentNode.removeChild(document.querySelector("#remote_stream"));
        this.haveAnchor = true;
        this.$refs.log.logInfo = {
          logText: "当前房间没有讲师/讲师已离开",
          logStatus: true,
          logType: "warning",
        };
      }
    });
    this.client.on("peer-join", (event) => {
      const userId = event.userId;
      console.log(userId, "进房了吗");
    });
    /**
     * @description 创建本地音视频流
     */
    try {
      this.localStream = this.TRTC.createStream({
        userId: this.userid,
        audio: true,
        video: false,
      });
    } catch (error) {
      if (
        /iPad|iPhone|iPod/.test(window.navigator.userAgent) &&
        !window.MSStream
      ) {
        return this.$nuxt.error({
          statusCode: "408",
          message: "如果您正在使用iPhone,iPad,请使用默认Safari浏览器",
          desc: error,
        });
      }
      let mediaObj = navigator.mediaDevices.enumerateDevices();
      if (!mediaObj) {
        return this.$nuxt.error({
          statusCode: "408",
          message: "您当前浏览器可能不支持直播，我们十分抱歉！",
          desc: "如果您拒绝了麦克风权限，请刷新网页后允许！",
        });
      }
      return this.$nuxt.error({
        statusCode: "408",
        message: "需要麦克风权限才能和讲师沟通，刷新网页再试试！",
        desc: error,
      });
    }
    /**
     * @description 初始化本地流
     */
    this.localStream.initialize().catch((error) => {
      this.$refs.log.logInfo = {
        logText: "初始化本地流失败,请刷新本页面重试!",
        logStatus: true,
        logType: "error",
      };
      this.$axios({
        method: "post",
        url: `api/logAppErr`,
        data: {
          log: `room-initLocalStream ${JSON.stringify(error)}`,
          platform: "web",
        },
      });
    });
    /**
     * @description 订阅远端流
     */
    this.client.on("stream-added", (event) => {
      this.remoteStream = event.stream;
      this.client.subscribe(this.remoteStream);
    });
    /**
     * @description 播放远端流
     */
    this.client.on("stream-subscribed", (event) => {
      if (this.remoteList.indexOf(this.remoteStream.getUserId()) === -1) {
        this.remoteList.push(this.remoteStream.getUserId());
      }
      try {
        this.remoteStream.play("remote_stream", {
          objectFit: "contain",
        });
      } catch (error) {
        this.$axios({
          method: "post",
          url: `api/logAppErr`,
          data: {
            log: `room-remote_stream ${JSON.stringify(error)}`,
            platform: "web",
          },
        });
      }
    });
    /**
     * @description 进入音视频通话房间
     */
    this.client
      .join({ roomId: parseInt(this.roomid) })
      .catch((error) => {
        this.$refs.log.logInfo = {
          logText: "进房失败",
          logStatus: true,
          logType: "error",
        };
        this.$axios({
          method: "post",
          url: `api/logAppErr`,
          data: {
            log: `room-join ${JSON.stringify(error)}`,
            platform: "web",
          },
        });
      })
      .then((val) => {
        this.$refs.log.logInfo = {
          logText: "进房成功",
          logStatus: true,
          logType: "success",
        };
        this.startNoAnchorCountDown();
        this.client.publish(this.localStream).catch((error) => {
          this.$refs.log.logInfo = {
            logText: "本地流发布失败",
            logStatus: true,
            logType: "error",
          };
        });
      });
  },
  methods: {
    /**
     * 启动一个计时器，当进入了空的房间 n 秒后给出提示
     */
    startNoAnchorCountDown() {
      try {
        this.noAnchorTimoutID = setTimeout(() => {
          if (this.remoteList.length === 0) {
            this.haveAnchor = true;
            this.$refs.log.logInfo = {
              logText: "讲师还未进入房间",
              logStatus: true,
              logType: "warning",
            };
          }
        }, 3000);
      } catch (error) {
        this.$axios({
          method: "post",
          url: `api/logAppErr`,
          data: {
            log: `room-startNoAnchorCountDown ${JSON.stringify(error)}`,
            platform: "web",
          },
        });
      }
    },
    /**
     * @description 判断当前设备是横屏还是竖屏,根据结果进行不同的显示
     */
    renderResize() {
      let width = document.documentElement.clientWidth;
      let height = document.documentElement.clientHeight;
      if (width > height) {
        this.$refs.overlays.info.isOverlay = false;
      } else {
        this.$refs.overlays.info = {
          text: "为获得更好的观看体验，请将手机设置为横屏显示！",
          isOverlay: true,
        };
      }
    },
    _isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    },
    /**
     * @description 判断当前浏览器是否支持trtc
     */
    isSupportBrowser() {
      this.TRTC.checkSystemRequirements().then((checkResult) => {
        if (!checkResult.result) {
          this.$nuxt.error({
            statusCode: "400",
            message: "我们不支持IE和旧版Edge浏览器",
            desc: "请至https://www.google.com/intl/zh-CN/chrome/下载最新浏览器",
          });
        }
      });
    },

    toggleMic() {
      this.micStatus = !this.micStatus;
      if (this.micStatus) {
        this.localStream.muteAudio();
      } else {
        this.localStream.unmuteAudio();
      }
    },
    toggleVol() {
      this.speakerStatus = !this.speakerStatus;
      if (this.micStatus) {
        this.remoteStream.muteAudio();
      } else {
        this.remoteStream.unmuteAudio();
      }
    },
    /**
     * @description 退出当前房间
     */
    exitRoom(status) {
      if (this.remoteList.length != 0) {
        this.localStream.close();
        this.client
          .leave()
          .then(() => {
            document.querySelector("#remote_stream").innerHTML = "";
            if (!status) {
              this.$router.push({
                path: "/",
              });
            }
          })
          .catch((error) => {
            this.$refs.log.logInfo = {
              logText: "退房失败，稍后将自动退房",
              logStatus: true,
              logType: "error",
            };
            setTimeout(() => {
              this.exitRoom(false);
            }, 2000);
          });
      } else {
        this.$router.push({
          path: "/",
        });
      }
    },
  },
  destroyed() {
    window.removeEventListener("resize", this.renderResize, false);
  },
};
</script>
<style lang="scss" scoped>
#room {
  background: #000;
}
#power {
  position: fixed;
  right: 20px;
  bottom: 0;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 15px;
}
</style>
