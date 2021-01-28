<template>
  <div>
    <titleBar></titleBar>
    <div id="power" class="d-flex  justify-space-around align-center">
      <div>
        上行网络质量：
        <v-btn :color="localNetworkQuality.color" small elevation="0">{{
          localNetworkQuality.text
        }}</v-btn>
        <br />
        <br />
        上行网络质量：
        <v-btn :color="remoteNetworkQuality.color" small elevation="0">{{
          remoteNetworkQuality.text
        }}</v-btn>
      </div>
      <div>
        <v-btn icon @click="toggleMic">
          <v-icon x-large v-if="micStatus === true" color="green"
            >mdi-microphone</v-icon
          >
          <v-icon x-large v-else color="gray">mdi-microphone</v-icon>
        </v-btn>
      </div>
      <div>
        <v-btn icon @click="toggleVol">
          <v-icon x-large v-if="speakerStatus === false" color="green"
            >mdi-volume-high</v-icon
          >
          <v-icon x-large v-else color="gray">mdi-volume-high</v-icon>
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
      micStatus: false,
      speakerStatus: false,
      videoContainer: null,
      anchorIdList: [], // 主播ID列表
      // 存放远程用户视频列表
      remoteVideos: {},
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
  mounted() {
    this.micStatus = this.trtcCloud.getCurrentMicDeviceMute();
    this.speakerStatus = this.trtcCloud.getCurrentSpeakerDeviceMute();
    this.videoContainer = document.querySelector("#video-container");
    this.trtcCloud.on("onEnterRoom", this.onEnterRoom.bind(this));
    this.trtcCloud.on(
      "onRemoteUserEnterRoom",
      this.onRemoteUserEnterRoom.bind(this)
    );
    this.trtcCloud.on(
      "onRemoteUserLeaveRoom",
      this.onRemoteUserLeaveRoom.bind(this)
    );
    this.trtcCloud.on("onNetworkQuality", this.onNetworkQuality.bind(this));
    this.trtcCloud.on(
      "onUserSubStreamAvailable",
      this.onUserSubStreamAvailable.bind(this)
    );
    // 5. 进入房间
    // TRTCParams 详细说明，请查看文档：https://trtc-1252463788.file.myqcloud.com/electron_sdk/docs/TRTCParams.html
    let param = new TRTCParams();
    param.sdkAppId = parseInt(this.sdkappid);
    param.userSig = String(this.usersig);
    param.roomId = parseInt(this.roomid);
    param.userId = String(this.userid);
    param.privateMapKey = ""; // 房间签名（非必填）7.1.157 版本以上（含），可以忽略此参数，7.1.157 之前的版本建议赋值为空字符串
    param.businessInfo = ""; // 业务数据（非必填）7.1.157 版本以上（含），可以忽略此参数，7.1.157 之前的版本建议赋值为空字符串
    param.role = TRTCRoleType.TRTCRoleAudience; // 直播场景下的角色，仅适用于直播场景（TRTCAppSceneLIVE 和 TRTCAppSceneVoiceChatRoom），视频通话场景下指定无效。默认值：主播（TRTCRoleAnchor）
    this.trtcCloud.enterRoom(param, TRTCAppScene.TRTCAppSceneVideoCall);
  },
  methods: {
    toggleMic() {
      if (this.trtcCloud.getCurrentMicDeviceMute()) {
        this.trtcCloud.setCurrentMicDeviceMute(false);
        this.micStatus = false;
      } else {
        this.trtcCloud.setCurrentMicDeviceMute(true);
        this.micStatus = true;
      }
    },
    toggleVol() {
      if (this.trtcCloud.getCurrentSpeakerDeviceMute()) {
        this.trtcCloud.setCurrentSpeakerDeviceMute(false);
        this.speakerStatus = false;
      } else {
        this.trtcCloud.setCurrentSpeakerDeviceMute(true);
        this.speakerStatus = true;
      }
    },
    onNetworkQuality(localQuality, remoteQuality) {
      this.localNetworkQuality = networkQualityEnumMapper(localQuality.quality);
      this.remoteNetworkQuality = networkQualityEnumMapper(
        remoteQuality[0].quality
      );
    },
    /**
     * 当进入房间时触发的回调
     * @param {number} result - 进房结果， 大于 0 时，为进房间消耗的时间，这表示进进房成功。如果为 -1 ，则表示进房失败。
     **/
    onEnterRoom(result) {
      //todo
      if (result > 0) {
        this.log(`进房成功，使用了 ${result} 毫秒`, "success");
        // this.startNoAnchorCountDown();
      } else {
        this.log(`进房失败 ${result}`, "error");
      }
    },
    /**
     * 当主播进房时，把主播ID push 到列表里，并返回列表的长度
     */
    anchorIn(uid) {
      if (!this.anchorIdList.includes(uid)) {
        this.anchorIdList.push(uid);
      }
      return this.anchorIdList.length;
    },
    /**
     * 视频元素自动换行排版
     */
    videoTypeSettingAutoWrap() {
      //todo
      let maxPerline = 2; // 每行最多放三个
      let remoteVideos = this.remoteVideos;
      let winWidth = 100; // 窗口宽度，百分比值
      let winHeight = 100; // 窗口高度，百分比值
      let len = Object.keys(remoteVideos).length;
      let nw = 1;
      let nh = 1;
      for (let id in remoteVideos) {
        nw = len <= maxPerline ? len : maxPerline;
        nh = Math.ceil(len / maxPerline);
        remoteVideos[id].className = `user-video-container-auto-wrap`;
        remoteVideos[id].style.width = `${winWidth / nw}vw`;
        remoteVideos[id].style.height = `${winHeight / nh}vh`;
      }
    },
    /**
     * 显示主播的视频，直播模式下，显示主播的画面
     */
    showAnchorVideo(uid) {
      let id = `${uid}-${this.roomId}-${TRTCVideoStreamType.TRTCVideoStreamTypeBig}`;
      let view = document.getElementById(id);
      if (!view) {
        view = document.createElement("div");
        view.id = id;
        this.videoContainer.appendChild(view);
      }
      if (view.className.indexOf("anchor-view") < 0) {
        view.classList.add("anchor-view");
      }
      this.remoteVideos[id] = view;
      this.trtcCloud.startRemoteView(uid, view);
      this.trtcCloud.setRemoteViewFillMode(
        uid,
        TRTCVideoFillMode.TRTCVideoFillMode_Fill
      );
      this.videoTypeSettingAutoWrap();
    },
    /**
     * 关闭主播的视频
     * @param {number} uid
     */
    closeAnchorVideo(uid) {
      //todo
      let id = `${uid}-${this.roomId}-${TRTCVideoStreamType.TRTCVideoStreamTypeBig}`;
      let view = document.getElementById(id);
      if (view) {
        this.videoContainer.removeChild(view);
      }
      delete this.remoteVideos[id];
      this.remoteVideoIndex--;
      this.videoTypeSettingAutoWrap();
    },
    /**
     * 当主播退房时，把主播ID 从列表中去除，并返回列表的长度
     */
    anchorOut(uid) {
      //todo
      let idx = this.anchorIdList.indexOf(uid);
      this.anchorIdList.splice(idx, 1);
      return this.anchorIdList.length;
    },
    /**
     * 当主播进入本房间
     */
    onRemoteUserEnterRoom(uid) {
      //todo
      if (!this.anchorIdList.includes(uid)) {
        this.anchorIdList.push(uid);
        this.log(`主播 ${uid}，进入房间。`, "success");
      }
    },
    /**
     * 当主播退出本房间
     */
    onRemoteUserLeaveRoom(uid) {
      //todo
      this.closeAnchorVideo(uid);
      if (this.anchorOut(uid) === 0) {
        this.log(`主播 ${uid},离开房间`, "warning");
      }
      this.log(`主播 ${uid},离开房间`, "warning");
    },
    /**
     * 当远程用户屏幕分享的状态发生变化
     **/
    onUserSubStreamAvailable(uid, available) {
      //todo
      if (available) {
        this.showRemoteScreenSharing(uid);
      } else {
        this.closeRemoteScreenSharing(uid);
      }
    },
    /**
     * 显示远程用户的屏幕分享
     */
    showRemoteScreenSharing(uid) {
      //todo
      let id = `${uid}-${this.roomId}-${TRTCVideoStreamType.TRTCVideoStreamTypeSub}`;
      let W = this.subStreamWidth;
      let H = this.subStreamHeight;
      let view = document.getElementById(id);
      if (!view) {
        view = document.createElement("div");
        view.id = id;
        view.style.width = `${W}px`;
        view.style.height = `${H}px`;
        this.videoContainer.appendChild(view);
      }
      this.remoteVideos[id] = view;
      this.trtcCloud.startRemoteView(
        uid,
        view,
        TRTCVideoStreamType.TRTCVideoStreamTypeSub
      );
      this.trtcCloud.setRemoteSubStreamViewFillMode(
        uid,
        TRTCVideoFillMode.TRTCVideoFillMode_Fit
      );
      this.videoTypeSettingAutoWrap();
    },
    /**
     * 关闭远程用户的屏幕分享
     *
     * @param {*} uid
     */
    closeRemoteScreenSharing(uid) {
      //todo
      let id = `${uid}-${this.roomId}-${TRTCVideoStreamType.TRTCVideoStreamTypeSub}`;
      let view = document.getElementById(id);
      if (view) {
        this.videoContainer.removeChild(view);
      }
      delete this.remoteVideos[id];
    },
    /**
     * 离开房间
     */
    exitRooms() {
      ipcRenderer.send("exitRoom");
      this.trtcCloud.exitRoom();
      setTimeout(() => {
        this.$router.push("/");
      }, 0);
    },
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
