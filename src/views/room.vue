<template>
  <div>
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
    <div
      v-if="haveAnchor"
      class="d-flex justify-center align-center"
      style="height: 95vh; width: 100vw"
    >
      <span class="text-h3"> 当前房间没有讲师/讲师已离开 </span>
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
  TRTCParams,
  TRTCRenderParams,
} from "trtc-electron-sdk/liteav/trtc_define";
import { mapState } from "vuex";
import log from "@/components/log";
import { ipcRenderer } from "electron";
import { networkQualityEnumMapper } from "../common/qualityColorMapper";
export default {
  components: {
    log,
  },
  data() {
    return {
      videoFillMode: TRTCVideoFillMode.TRTCVideoFillMode_Fit,
      streamType: TRTCVideoStreamType.TRTCVideoStreamTypeSub,
      haveAnchor: false,
      micStatus: false,
      speakerStatus: false,
      videoContainer: null,
      anchorIdList: [], // 主播ID列表
      remoteVideos: {}, // 存放远程用户视频列表
      noAnchorCountDown: 3, // 空房间倒计时检测的最大时长，如果达到了这个时间，仍没有触发 onUserVideoAvailable ，就会提示用户是否要退出此直播间。
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
    this.trtcCloud.on("onError", this.onError.bind(this));
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
     * 启动一个计时器，当进入了空的房间 n 秒后给出提示
     */
    startNoAnchorCountDown() {
      try {
        this.noAnchorTimoutID = setTimeout(() => {
          if (this.anchorIdList.length === 0) {
            this.haveAnchor = true;
            this.log(
              "当前房间没有讲师，请退出检查房间口令是否输入正确！",
              "error"
            );
          }
        }, this.noAnchorCountDown * 1000);
      } catch (error) {
        this.$api.uploadLog({
          log: `room-startNoAnchorCountDown ${JSON.stringify(error)}`,
          platform: "electron",
        });
      }
    },
    /**
     * 当进入房间时触发的回调
     * @param {number} result - 进房结果， 大于 0 时，为进房间消耗的时间，这表示进进房成功。如果为 -1 ，则表示进房失败。
     **/
    onEnterRoom(result) {
      try {
        if (result > 0) {
          this.log(`进房成功，使用了 ${result} 毫秒`, "success");
          this.startNoAnchorCountDown();
        } else {
          this.log(`进房失败 ${result}`, "error");
        }
      } catch (error) {
        this.$api.uploadLog({
          log: `room-onEnterRoom ${JSON.stringify(error)}`,
          platform: "electron",
        });
      }
    },
    /**
     *@description SDK 不可恢复的错误
     */
    onError(errCode, errMsg) {
      this.log(`错误码：${errCode},错误信息：${errMsg}`, "error");
      this.$api.uploadLog({
        log: `room ${JSON.stringify(errMsg)}`,
        platform: "electron",
      });
    },
    /**
     * 当主播进入本房间
     */
    onRemoteUserEnterRoom(uid) {
      try {
        if (!this.anchorIdList.includes(uid)) {
          this.anchorIdList.push(uid);
          this.haveAnchor = false;
          this.log(`讲师已进入房间。`, "success");
        }
      } catch (error) {
        this.$api.uploadLog({
          log: `room-onRemoteUserEnterRoom ${JSON.stringify(error)}`,
          platform: "electron",
        });
      }
    },
    /**
     * 当主播退出本房间
     */
    onRemoteUserLeaveRoom(uid) {
      try {
        this.closeAnchorVideo(uid);
        if (this.anchorOut(uid) === 0) {
          this.haveAnchor = true;
          this.log(`讲师离开房间`, "warning");
        }
        this.log(`讲师离开房间`, "warning");
      } catch (error) {
        this.$api.uploadLog({
          log: `room-onRemoteUserLeaveRoom ${JSON.stringify(error)}`,
          platform: "electron",
        });
      }
    },
    /**
     * 当主播退房时，把主播ID 从列表中 去除，并返回列表的长度
     */
    anchorOut(uid) {
      try {
        let idx = this.anchorIdList.indexOf(uid);
        this.anchorIdList = this.anchorIdList.slice(idx, 0);
        return this.anchorIdList.length;
      } catch (error) {
        this.$api.uploadLog({
          log: `room-anchorOut ${JSON.stringify(error)}`,
          platform: "electron",
        });
      }
    },
    /**
     * 关闭主播的视频
     * @param {number} uid
     */
    closeAnchorVideo(uid) {
      try {
        let id = `${uid}-${this.roomId}-${this.streamType}`;
        let view = document.getElementById(id);
        if (view) {
          this.videoContainer.removeChild(view);
        }
        delete this.remoteVideos[id];
        this.remoteVideoIndex--;
      } catch (error) {
        this.$api.uploadLog({
          log: `room-closeAnchorVideo ${JSON.stringify(error)}`,
          platform: "electron",
        });
      }
    },
    /**
     * @description 用户是否开启了辅路画面
     * @param uid 用户标识  string
     * @param available 辅路画面是否开启 number
     */
    onUserSubStreamAvailable(uid, available) {
      if (available) {
        let view = this.findVideoView(uid, this.streamType);
        try {
          this.trtcCloud.startRemoteView(uid, view, this.streamType);
        } catch (error) {
          this.$api.uploadLog({
            log: `room-startRemoteView ${JSON.stringify(error)}`,
            platform: "electron",
          });
        }
        let params = new TRTCRenderParams();
        params.fillMode = this.videoFillMode;
        try {
          this.trtcCloud.setRemoteRenderParams(uid, this.streamType, params);
        } catch (error) {
          this.$api.uploadLog({
            log: `room-setRemoteRenderParams ${JSON.stringify(error)}`,
            platform: "electron",
          });
        }
      } else {
        try {
          this.trtcCloud.stopRemoteView(uid, this.streamType);
        } catch (error) {
          this.$api.uploadLog({
            log: `room-stopRemoteView ${JSON.stringify(error)}`,
            platform: "electron",
          });
        }
        this.closeRemoteScreenSharing(uid);
      }
    },
    /**
     * @description 进房参数设置与进房
     */
    enterRoom() {
      try {
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
      } catch (error) {
        this.$api.uploadLog({
          log: `room-enterRoom ${JSON.stringify(error)}`,
          platform: "electron",
        });
      }
    },
    /**
     * @description 创建一个视频承载dom
     */
    findVideoView(uid, streamtype) {
      try {
        let id = `${uid}-${this.roomId}-${this.streamType}`;
        let view = document.getElementById(id);
        if (!view) {
          view = document.createElement("div");
          view.id = id;
          view.style.width = `100vw`;
          view.style.height = `100vh`;
          this.videoContainer.appendChild(view);
        }
        this.remoteVideos[id] = view;
        return view;
      } catch (error) {
        this.$api.uploadLog({
          log: `room-findVideoView ${JSON.stringify(error)}`,
          platform: "electron",
        });
      }
    },
    /**
     * 关闭远程用户的屏幕分享
     *
     * @param {*} uid
     */
    closeRemoteScreenSharing(uid) {
      try {
        let id = `${uid}-${this.roomId}-${this.streamType}`;
        let view = document.getElementById(id);
        if (view) {
          this.videoContainer.removeChild(view);
        }
        delete this.remoteVideos[id];
      } catch (error) {
        this.$api.uploadLog({
          log: `room-closeRemoteScreenSharing ${JSON.stringify(error)}`,
          platform: "electron",
        });
      }
    },
    // 在视频用户退出视频时，将些 Dom 结点移除掉
    destroyVideoView(uid, streamtype) {
      try {
        let key = uid + "_" + streamtype;
        var userVideoEl = document.getElementById(key);
        if (userVideoEl) {
          document.querySelector("#video_wrap").removeChild(userVideoEl);
        }
      } catch (error) {
        this.$api.uploadLog({
          log: `room-destroyVideoView ${JSON.stringify(error)}`,
          platform: "electron",
        });
      }
    },
    /**
     * 离开房间
     */
    exitRooms() {
      try {
        this.trtcCloud.stopLocalAudio();
        this.trtcCloud.exitRoom();
        setTimeout(() => {
          this.$router.push("/");
        }, 0);
      } catch (error) {
        this.$api.uploadLog({
          log: `room-exitRooms ${JSON.stringify(error)}`,
          platform: "electron",
        });
      }
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
