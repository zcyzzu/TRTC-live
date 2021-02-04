<template>
  <div>
    <div id="remote_stream"></div>
    <div id="power" class="d-flex justify-space-around align-center">
      <div>
        上行网络质量：
        <v-btn :color="localNetworkQuality.color" small elevation="0">{{
          localNetworkQuality.text
        }}</v-btn>
        <br />
        <br />
        下行网络质量：
        <v-btn :color="remoteNetworkQuality.color" small elevation="0">{{
          remoteNetworkQuality.text
        }}</v-btn>
      </div>
      <div>
        <v-btn icon @click="toggleMic">
          <v-icon x-large v-if="micStatus === false" color="green"
            >mdi-microphone</v-icon
          >
          <v-icon x-large v-else color="red">mdi-microphone</v-icon>
        </v-btn>
      </div>
      <div>
        <v-btn icon @click="toggleVol">
          <v-icon x-large v-if="speakerStatus === false" color="green"
            >mdi-volume-high</v-icon
          >
          <v-icon x-large v-else color="red">mdi-volume-high</v-icon>
        </v-btn>
      </div>
      <div>
        <v-btn @click="exitRoom(false)" icon>
          <v-icon x-large color="error">mdi-power</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>
<script>
// import TRTC from "trtc-js-sdk";
export default {
  data() {
    return {
      TRTC: null,
      roomid: "",
      sdkappid: "",
      userid: "",
      usersig: "",
      client: null,
      //客户端对象，提供实时音视频通话的核心能力，包括进房join()及退房leave()，发布本地流publish()及停止发布本地流unpublish()，订阅远端流subscribe()及取消订阅远端流unsubscribe()。
      localStream: null,
      micStatus: false,
      speakerStatus: false,
      localNetworkQuality: {
        text: "很好",
        color: "green",
      },
      remoteNetworkQuality: {
        text: "很好",
        color: "green",
      },
    };
  },
  created() {
    // this.TRTC = TRTC;
    if (process.client) {
      this.TRTC = require("trtc-js-sdk");
    }
    this.roomid = this.$route.query.roomid;
    this.sdkappid = this.$route.query.sdkappid;
    this.userid = this.$route.query.userid;
    this.usersig = this.$route.query.usersig;
  },
  mounted() {
    this.isSupportBrowser();
    this.client = this.TRTC.createClient({
      mode: "rtc",
      sdkAppId: this.sdkappid,
      userId: this.userid,
      userSig: this.usersig,
    });
    this.client.on("stream-added", (event) => {
      const remoteStream = event.stream;
      console.log("远端流增加: " + remoteStream.getId());
      //订阅远端流
      this.client.subscribe(remoteStream);
    });
    this.client.on("stream-subscribed", (event) => {
      const remoteStream = event.stream;
      console.log("远端流订阅成功：" + remoteStream.getId());
      // 播放远端流
      remoteStream.play("remote_stream", {
        objectFit: "cover",
      });
    });
    this.client
      .join({ roomId: parseInt(this.roomid) })
      .catch((error) => {
        console.error("进房失败 " + error);
      })
      .then(() => {
        console.log("进房成功");
      });
  },
  methods: {
    /**
     * @description 判断当前浏览器是否支持trtc
     */
    isSupportBrowser() {
      this.TRTC.checkSystemRequirements().then((checkResult) => {
        if (!checkResult.result) {
          console.log("不支持的浏览器");
        } else {
          console.log("支持的浏览器");
        }
      });
    },
    /**
     * @description 退出当前房间
     */
    toggleMic() {
      console.log("切换麦克风");
    },
    toggleVol() {
      console.log("切换扬声器");
    },
    exitRoom(status) {
      this.client
        .leave()
        .then(() => {
          document.querySelector("#remote_stream").innerHTML = "";
          if (!status) {
            this.$router.push({
              path: "/live",
            });
          }
        })
        .catch((error) => {
          console.error("退房失败 " + error);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
#room {
  background: #000;
}
#power {
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  height: 150px;
  background: rgba(0, 0, 0, 0.3);
  color: white;
}
</style>
