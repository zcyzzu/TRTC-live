<template>
  <div>
    <p class="white--text my-5">
      根据当前设备，推荐你选择{{phoneInfo}}
      <v-icon small color="white" style="position:relative;top:-1px">{{icon}}</v-icon>
      {{winVersion}} {{ pcNum }}{{versionInfo}}
    </p>
  </div>
</template>
<script>
export default {
  props: {
    info: {
      downloadHrefWin: {
        type: String,
        default: ""
      },
      flag: {
        type: Boolean||String,
      },
      isMac: {
        type: Boolean,
        default: false
      },
      isWindows: {
        type: Boolean,
        default: true
      },
      mobileSystem: {
        type: String,
        default: ""
      },
      pcNum: {
        type: String || Number,
        default: 64
      },
      winVersion: {
        type: String,
        default: "win 10"
      }
    }
  },
  data() {
    return {
      icon: "mdi-microsoft-windows",
      versionInfo: "位版",
      winVersion: "win 10",
      pcNum: 64,
      phoneInfo: ""
    };
  },
  created() {
    if (!this.info.flag) {
      if (this.info.mobileSystem == "iPhone") {
        this.icon = "mdi-apple";
        this.phoneInfo = "IOS";
      } else {
        this.icon = "mdi-android";
        this.phoneInfo = "Android";
      }
      this.versionInfo = "版";
      this.winVersion = "";
      this.pcNum = "";
    } else {
      if (this.info.isMac) {
        this.icon = "mdi-apple";
        this.versionInfo = "版";
        this.winVersion = "";
        this.pcNum = "";
      } else {
        this.winVersion = this.info.winVersion;
        this.pcNum = this.info.pcNum;
      }
    }
  }
};
</script>