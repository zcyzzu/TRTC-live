<template>
  <div>
    <titleBar></titleBar>
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
        <v-btn @click="exitRooms" icon>
          <v-icon x-large color="error">mdi-power</v-icon>
        </v-btn>
      </div>
    </div>
    <div id="video-container"></div>
    <log ref="log"></log>
  </div>
</template>
<script>
import {
  TRTCAppScene,
  TRTCVideoStreamType,
  TRTCVideoFillMode,
  TRTCRoleType,
  TRTCParams,
  TRTCAudioQuality,
  TRTCRenderParams,
} from "trtc-electron-sdk/liteav/trtc_define";
import { mapState } from "vuex";
import log from "@/components/log";
import { ipcRenderer } from "electron";
import titleBar from "@/components/titleBar";
import { networkQualityEnumMapper } from "../common/qualityColorMapper";
export default {
  components: {
    titleBar,
    log,
  },
  data() {
    return {
      videoFillMode: TRTCVideoFillMode.TRTCVideoFillMode_Fit,
      streamType: TRTCVideoStreamType.TRTCVideoStreamTypeSub,
      micStatus: false,
      speakerStatus: false,
      videoContainer: null,
      anchorIdList: [], // 主播ID列表
      remoteVideos: {}, // 存放远程用户视频列表
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
    /**
     * @description 获取当前机器麦克风和扬声器的状态 即打开还是关闭 以此状态来更新底部mic/speaker图标状态
     */
    this.micStatus = this.trtcCloud.getCurrentMicDeviceMute();
    this.speakerStatus = this.trtcCloud.getCurrentSpeakerDeviceMute();
  },
  mounted() {
    this.videoContainer = document.querySelector("#video-container");
    this.trtcCloud.on("onEnterRoom", this.onEnterRoom.bind(this));
    this.trtcCloud.on(
      "onRemoteUserEnterRoom",
      this.onRemoteUserEnterRoom.bind(this)
    );
    this.trtcCloud.on(
      "onUserSubStreamAvailable",
      this.onUserSubStreamAvailable.bind(this)
    );
    this.trtcCloud.on(
      "onRemoteUserLeaveRoom",
      this.onRemoteUserLeaveRoom.bind(this)
    );
    this.trtcCloud.on("onNetworkQuality", this.onNetworkQuality.bind(this));
    this.enterRoom();
  },
  methods: {
    /**
     * @description 切换底部麦克风状态（打开/关闭）
     */
    toggleMic() {
      if (this.trtcCloud.getCurrentMicDeviceMute()) {
        this.trtcCloud.setCurrentMicDeviceMute(false);
        this.micStatus = false;
      } else {
        this.trtcCloud.setCurrentMicDeviceMute(true);
        // this.trtcCloud.muteLocalAudio(true);
        this.micStatus = true;
      }
    },
    /**
     * @description  切换底部扬声器状态（打开/关闭)
     */
    toggleVol() {
      if (this.trtcCloud.getCurrentSpeakerDeviceMute()) {
        this.trtcCloud.setCurrentSpeakerDeviceMute(false);
        this.speakerStatus = false;
      } else {
        this.trtcCloud.setCurrentSpeakerDeviceMute(true);
        this.speakerStatus = true;
      }
    },
    /**
     * 当进入房间时触发的回调
     * @param {number} result - 进房结果， 大于 0 时，为进房间消耗的时间，这表示进进房成功。如果为 -1 ，则表示进房失败。
     **/
    onEnterRoom(result) {
      if (result > 0) {
        this.log(`进房成功，使用了 ${result} 毫秒`, "success");
      } else {
        this.log(`进房失败 ${result}`, "error");
      }
    },
    /**
     * 当主播进入本房间
     */
    onRemoteUserEnterRoom(uid) {
      if (!this.anchorIdList.includes(uid)) {
        this.anchorIdList.push(uid);
        this.log(`讲师已进入房间。`, "success");
        this.trtcCloud.setCurrentMicDeviceMute(this.micStatus);
        this.trtcCloud.setCurrentSpeakerDeviceMute(this.speakerStatus);
      }
    },
    /**
     * 当主播退出本房间
     */
    onRemoteUserLeaveRoom(uid) {
      this.closeAnchorVideo(uid);
      if (this.anchorOut(uid) === 0) {
        this.log(`讲师离开房间`, "warning");
      }
      this.log(`讲师离开房间`, "warning");
    },
    /**
     * 关闭主播的视频
     * @param {number} uid
     */
    closeAnchorVideo(uid) {
      let id = `${uid}-${this.roomId}-${this.streamType}`;
      let view = document.getElementById(id);
      if (view) {
        this.videoContainer.removeChild(view);
      }
      delete this.remoteVideos[id];
      this.remoteVideoIndex--;
    },
    /**
     * @description 上下行网络质量监控回调（每2秒触发一次）
     * @param {any} localQuality 上行网络质量
     * @param {any} remoteQuality 下行网络质量
     */
    onNetworkQuality(localQuality, remoteQuality) {
      this.localNetworkQuality = networkQualityEnumMapper(localQuality.quality);
      this.remoteNetworkQuality = networkQualityEnumMapper(
        remoteQuality[0].quality
      );
    },
    onUserSubStreamAvailable(uid, available) {
      if (available) {
        let view = this.findVideoView(uid, this.streamType);
        this.trtcCloud.startRemoteSubStreamView(uid, view, this.streamType);
        let params = new TRTCRenderParams();
        params.fillMode = this.videoFillMode;
        this.trtcCloud.setRemoteRenderParams(uid, this.streamType, params);
      } else {
        this.trtcCloud.stopRemoteView(uid, destroyVideoView);
        this.closeRemoteScreenSharing(uid);
      }
    },
    enterRoom() {
      let param = new TRTCParams();
      param.sdkAppId = parseInt(this.sdkappid);
      param.roomId = parseInt(this.roomid);
      param.userId = this.userid;
      param.userSig = this.usersig;
      param.privateMapKey = "";
      param.businessInfo = "";
      this.trtcCloud.enterRoom(param, TRTCAppScene.TRTCAppSceneVideoCall);
      this.trtcCloud.startLocalAudio();
      this.trtcCloud.muteLocalAudio(false);
    },
    findVideoView(uid, streamtype) {
      let id = `${uid}-${this.roomId}-${this.streamType}`;
      let view = document.getElementById(id);
      if (!view) {
        view = document.createElement("div");
        view.id = id;
        // view.style.width = `100vw`;
        // view.style.height = `100vh`;
        this.videoContainer.appendChild(view);
      }
      this.remoteVideos[id] = view;
      return view;
    },
    /**
     * 关闭远程用户的屏幕分享
     *
     * @param {*} uid
     */
    closeRemoteScreenSharing(uid) {
      //todo
      let id = `${uid}-${this.roomId}-${this.streamType}`;
      let view = document.getElementById(id);
      if (view) {
        this.videoContainer.removeChild(view);
      }
      delete this.remoteVideos[id];
    },
    // // 在视频用户退出视频时，将些 Dom 结点移除掉
    // destroyVideoView(uid, streamtype) {
    //   let key = uid + "_" + streamtype;
    //   var userVideoEl = document.getElementById(key);
    //   if (userVideoEl) {
    //     document.querySelector("#video_wrap").removeChild(userVideoEl);
    //   }
    // },
    /**
     * 离开房间
     */
    exitRooms() {
      ipcRenderer.send("exitRoom");
      this.trtcCloud.stopLocalAudio();
      this.trtcCloud.exitRoom();
      setTimeout(() => {
        this.$router.push("/");
      }, 0);
    },
    /**
     * 触发消息通知条的方法
     */
    log(text, type) {
      this.$refs.log.logInfo = {
        logText: text,
        logStatus: true,
        logType: type,
      };
    },
  },
  computed: {
    ...mapState(["userid", "roomid", "sdkappid", "usersig", "trtcCloud"]),
    subStreamWidth() {
      return Math.floor(this.videoContainer.clientWidth);
    },

    subStreamHeight() {
      return Math.floor(this.videoContainer.clientHeight);
    },
  },
};
</script>
<style lang="scss" scoped>
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