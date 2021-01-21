<template>
  <div>
    <titleBar></titleBar>
    <v-btn to="/">back</v-btn>
    <h1>room</h1>
    <v-btn @click="go">进房</v-btn>
  </div>
</template>
<script>
import TRTCCloud from "trtc-electron-sdk";
import titleBar from "@/components/titleBar";
import {
  TRTCParams,
  TRTCRoleType,
  TRTCAppScene,
} from "trtc-electron-sdk/liteav/trtc_define";
let trtcCloud = new TRTCCloud();
export default {
  components: {
    titleBar,
  },
  mounted() {},
  methods: {
    go() {
      let param = new TRTCParams();
      param.sdkAppId = 1400475536;
      param.userId = "zcy";
      param.userSig =
        "660bad0d1b2c7884e0393bf8cb7e4e80c5b5e24edc27a328316c3d54f940f856";
      param.roomId = 57262;
      param.role = TRTCRoleType.TRTCRoleAudience; // 设置角色为"观众"
      let trtcCloud = new TRTCCloud();
      trtcCloud.enterRoom(param, TRTCAppScene.TRTCAppSceneLIVE);
    },
  },
};
</script>
