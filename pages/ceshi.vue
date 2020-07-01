<template>
  <div>
    <h1>是否为移动端：{{isMobile}}</h1>
    <h1>移动端操作系统：{{mobileSystem}}</h1>
    <h1>是否为mac：{{isMac}}</h1>
    <h1>win操作系统版本：{{winVersion}}</h1>
    <h1>win操作系统位数：{{pcNum}}</h1>
    <transition name="fade">
      <div v-if="initSuccess">
        <v-btn v-if="isMobile">手机客户端将会在近期发布</v-btn>
        <v-btn v-else-if="!isMac">立即下载 {{winVersion}} {{pcNum}}版</v-btn>
        <v-btn v-else>立即下载 mac 版</v-btn>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isMobile: false,
      mobileSystem:null,
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
    //先判断平台类型
    //如果是手机端 break出去
    //如果是桌面端 接下来判断系统win/mac
    //如果系统是win 在判断系统位数32/64 和系统版本 7 8 10
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
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>