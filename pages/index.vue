<template>
  <div style="position:relative;z-index:1">
    <v-container class="hidden-md-and-down">
      <v-icon style="font-size:4rem" color="white">mdi-cellphone</v-icon>
      <v-btn
        text
        color="white"
        class="text-h2 font-weight-bold  "
        x-large
        min-height="100"
        min-width="250"
      >直 播 啦</v-btn>
    </v-container>
    <v-container class="hidden-lg-and-up">
      <v-icon style="font-size:2.5rem" color="white">mdi-cellphone</v-icon>
      <v-btn
        text
        color="white"
        class="text-h4 font-weight-bold  px-2"
        x-large
        min-height="80"
        min-width="150"
      >直 播 啦</v-btn>
    </v-container>
    <v-container>
      <div style="height:55vh" class="d-flex align-end">
        <v-card
          color="#3f51a5"
          class="mx-auto rounded-xl pa-md-5 pa-5"
          max-height="500"
          max-width="800"
          min-width="350"
          min-height="300"
          elevation="12"
        >
          <h1 class="text-center white--text">下载软件</h1>
          <p class="white--text my-5">根据当前设备，推荐你选择{{winVersion}}/{{pcNum}}位版</p>
          <transition name="fade">
            <div v-if="initSuccess">
              <v-btn v-if="isMobile" color="blue darken-2" class="white--text" block>手机客户端将会在近期发布</v-btn>
              <v-btn
                v-else-if="!isMac"
                min-height="60"
                color="blue darken-2"
                class="white--text"
                block
              >
                立即下载 {{winVersion}}/{{pcNum}}位版
                <v-icon right color="white">mdi-cloud-download</v-icon>
              </v-btn>
              <v-btn v-else color="blue darken-2" class="white--text" block>
                立即下载 mac 版
                <v-icon right>mdi-cloud-download</v-icon>
              </v-btn>
            </div>
          </transition>
          <transition name="fades">
            <div v-if="initSuccess">
              <v-btn color="blue darken-2" class="white--text mt-5" block min-height="60">其他版本选择</v-btn>
            </div>
          </transition>
        </v-card>
      </div>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isMobile: false,
      mobileSystem: null,
      isMac: false,
      pcNum: null,
      winVersion: "",
      initSuccess: false
    };
  },
  created() {
    this.initSlot();
  },
  mounted() {
    this.IsPC() ? this.isWinOrMac() : (this.isMobile = true);
  },
  methods: {
    initSlot() {
      setTimeout(() => {
        this.initSuccess = true;
      }, 200);
    },
    isWinOrMac() {
      //判断系统win/mac
      let isMac = (function() {
        return /macintosh|mac os x/i.test(navigator.userAgent);
      })();
      let isWindows = (function() {
        return /windows|win32/i.test(navigator.userAgent);
      })();
      if (isMac) {
        //如果是mac  判断到此为止
        return true;
      } else {
        //如果是win 接下来判断版本和位数
        this.winVersion = this.getVersion();
        this.pcNum = this.getPCNum();
      }
    },
    getVersion() {
      //检测windows系统的版本
      let version = navigator.userAgent;
      if (version.indexOf("Windows NT 5") != -1) {
        return "XP系统";
      } else if (version.indexOf("Windows NT 7") != -1) {
        return "win 7";
      } else if (version.indexOf("Windows NT 8") != -1) {
        return "win 8";
      } else if (version.indexOf("Windows NT 10") != -1) {
        return "win 10";
      }
    },
    getPCNum() {
      //判断windows系统位数 32/64
      let agent = navigator.userAgent.toLowerCase();
      if (agent.indexOf("win32") >= 0 || agent.indexOf("wow32") >= 0) {
        return 32;
      }
      if (agent.indexOf("win64") >= 0 || agent.indexOf("wow64") >= 0) {
        return 64;
      }
    },
    IsPC() {
      //判断设备类型 移动端/桌面端
      let userAgentInfo = navigator.userAgent;
      let Agents = [
        "Android",
        "iPhone",
        "SymbianOS",
        "Windows Phone",
        "iPad",
        "iPod"
      ];
      let flag = true;
      for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          this.mobileSystem = Agents[v];
          flag = false;
          break;
        }
      }
      return flag;
    }
  }
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fades-enter-active,
.fades-leave-active {
  transition: opacity 1.5s;
}
.fades-enter,
.fades-leave-to {
  opacity: 0;
}
</style>