<template>
  <div style="position:relative;z-index:1">
    <pageBar></pageBar>
    <v-container>
      <div class="d-flex align-center" style="height:85vh">
        <v-card
          id="downloadCard"
          color="#3f51a5"
          class="mx-auto rounded-xl pa-md-5 pa-5"
          min-width="350"
          :min-height="minHeight"
          elevation="12"
          style="opacity:0"
        >
          <h1 class="text-center white--text hidden-md-and-down text-h4">下载直播软件</h1>
          <h1 class="text-center white--text hidden-lg-and-up text-h5">下载直播软件</h1>
          <transition name="first">
            <div v-if="initSuccess">
              <p class="white--text my-md-5 my-0 mt-5" v-if="isMobile">手机客户端将会在近期发布，敬请期待！</p>
              <p class="white--text my-5" v-else-if="!isMac">
                根据当前设备，推荐你选择
                <v-icon small color="white" style="position:relative;top:-1px">mdi-microsoft-windows</v-icon>
                Windows {{ pcNum }}位版
              </p>
              <p class="white--text my-5" v-else>
                根据当前设备，推荐你选择
                <v-icon color="white" style="position:relative;top:-2px;left:-2px">mdi-apple</v-icon>MacOS版
              </p>
            </div>
          </transition>
          <transition name="first" v-if="winVersion == 'win 7'">
            <div v-if="initSuccess">
              <v-alert type="error">
                <v-icon style="position:relative;top:-2px">mdi-microsoft-windows</v-icon>Windows 7系统需先下载依赖①和依赖②
              </v-alert>
            </div>
          </transition>

          <transition name="fade">
            <div v-if="initSuccess">
              <div class="d-flex justify-space-around" v-if="isMobile">
                <v-btn class="white--text mt-5" color="blue darken-2" min-width="150" height="50">
                  <v-icon small>mdi-android</v-icon>Android下载
                </v-btn>
                <v-btn class="white--text mt-5" color="blue darken-2" min-width="150" height="50">
                  <v-icon small>mdi-apple</v-icon>iOS下载
                </v-btn>
              </div>
              <v-btn
                v-if="!isMac && winVersion != 'win 7'"
                min-height="50"
                color="blue darken-2"
                class="white--text mt-5"
                block
              >
                <a :href="downloadHrefWin" class="d-flex align-center">
                  <v-icon small>mdi-microsoft-windows</v-icon>
                  {{ pcNum }}位版下载
                </a>
              </v-btn>

              <div v-else-if="!isMac && winVersion == 'win 7'">
                <div class="d-flex justify-space-around">
                  <v-btn min-height="50" min-width="150" color="blue darken-2" class="white--text">
                    <a
                      href="http://openstore.daoshi.cloud/zhibola/Windows6.1-KB4019990-x86.msu"
                      class="d-flex align-center"
                    >
                      <v-icon small>mdi-microsoft-windows</v-icon>依赖①下载
                    </a>
                  </v-btn>
                  <v-btn min-height="50" min-width="150" color="blue darken-2" class="white--text">
                    <a
                      href="http://openstore.daoshi.cloud/zhibola/NDP471-KB4033342-x86-x64-AllOS-ENU.exe"
                      class="d-flex align-center"
                    >
                      <v-icon small>mdi-microsoft-windows</v-icon>依赖②下载
                    </a>
                  </v-btn>
                </div>
                <v-btn block min-height="50" color="blue darken-2" class="white--text mt-5">
                  <a :href="downloadHrefWin" class="d-flex align-center">
                    <v-icon small>mdi-microsoft-windows</v-icon>
                    {{ pcNum }}位版下载
                  </a>
                </v-btn>
              </div>
              <v-btn v-else min-height="50" color="blue darken-2" class="white--text" block>
                <a :href="downloadHrefMac" class="d-flex align-center">
                  <v-icon small>mdi-apple</v-icon>MacOS下载
                </a>
              </v-btn>
            </div>
          </transition>
          <!-- 分割线 分割线 分割线 分割线 分割线 分割线 分割线 分割线 分割线 分割线 分割线 分割线 分割线 -->
          <transition name="fades">
            <div v-if="initSuccess">
              <v-btn
                color="blue darken-2"
                @click="checkVersion"
                class="white--text mt-5"
                block
                min-height="50"
              >
                其他版本
                <v-icon id="reverseIcon" color="white" right>mdi-chevron-down</v-icon>
              </v-btn>
            </div>
          </transition>

          <v-btn
            id="exDownloadMac"
            color="blue darken-2"
            class="white--text mt-5"
            block
            height="0"
            style="opacity:0;display:none"
            v-if="!isMac"
          >
            <a :href="downloadHrefMac" class="d-flex align-center">
              <v-icon small>mdi-apple</v-icon>MacOS下载
            </a>
          </v-btn>
          <div v-if="!isMac && winVersion == 'win 7'">
            <!-- 如果是win7 系统 -->
            <div class="d-flex justify-space-around">
              <v-btn
                id="exDownLoadWinBefore_one"
                color="blue darken-2"
                class="white--text mt-5"
                height="0"
                min-width="150"
                style="opacity:0;display:none"
              >
                <a
                  href="http://openstore.daoshi.cloud/zhibola/Windows6.1-KB4019990-x86.msu"
                  class="d-flex align-center"
                >
                  <v-icon small>mdi-microsoft-windows</v-icon>依赖①下载
                </a>
              </v-btn>
              <v-btn
                id="exDownLoadWinBefore_two"
                color="blue darken-2"
                class="white--text mt-5"
                height="0"
                min-width="150"
                style="opacity:0;display:none"
              >
                <a
                  href="http://openstore.daoshi.cloud/zhibola/NDP471-KB4033342-x86-x64-AllOS-ENU.exe"
                  class="d-flex align-center"
                >
                  <v-icon small>mdi-microsoft-windows</v-icon>依赖②下载
                </a>
              </v-btn>
            </div>
            <v-btn
              id="exDownloadWin"
              color="blue darken-2"
              class="white--text mt-5"
              block
              height="0"
              style="opacity:0;display:none"
              v-if="pcNum"
            >
              <a :href="win32" class="d-flex align-center">
                <v-icon small>mdi-microsoft-windows</v-icon>Windows 32位下载
              </a>
            </v-btn>
            <v-btn
              id="exDownloadWin"
              color="blue darken-2"
              class="white--text mt-5"
              height="0"
              style="opacity:0;display:none"
              v-else
            >
              <a :href="win64" class="d-flex align-center">
                <v-icon small>mdi-microsoft-windows</v-icon>Windows 64位下载
              </a>
            </v-btn>
          </div>
          <div v-else-if="isMac">
            <!-- 机器是mac的时候 -->
            <v-btn
              id="whileMac_32"
              color="blue darken-2"
              class="white--text mt-5"
              height="0"
              style="opacity:0;display:none"
              block
            >
              <a :href="win32" class="d-flex align-center">
                <v-icon small>mdi-microsoft-windows</v-icon>Windows 32位下载
              </a>
            </v-btn>
            <v-btn
              id="whileMac_64"
              color="blue darken-2"
              class="white--text mt-5"
              height="0"
              block
              style="opacity:0;display:none"
            >
              <a :href="win64" class="d-flex align-center">
                <v-icon small>mdi-microsoft-windows</v-icon>Windows 64位下载
              </a>
            </v-btn>
          </div>
          <div v-else>
            <!-- 其他版本的windows系统 -->
            <v-btn
              id="exDownloadWin"
              color="blue darken-2"
              class="white--text mt-5"
              height="0"
              style="opacity:0;display:none"
              block
              v-if="pcNum"
            >
              <a :href="win32" class="d-flex align-center">
                <v-icon small>mdi-microsoft-windows</v-icon>32位版下载
              </a>
            </v-btn>
            <v-btn
              id="exDownloadWin"
              color="blue darken-2"
              class="white--text mt-5"
              height="0"
              block
              style="opacity:0;display:none"
              v-else
            >
              <a :href="win64" class="d-flex align-center">
                <v-icon small>mdi-microsoft-windows</v-icon>64位版下载
              </a>
            </v-btn>
          </div>
          <v-btn
            id="historyVersion"
            block
            color="blue darken-2 white--text mt-5"
            height="0"
            style="opacity:0;display:none"
          >
            <a
              href="http://openstore.daoshi.cloud/zhibola/zhibola%20Setup%201.4.0.exe"
              class="d-flex align-center"
            >
              <v-icon small>mdi-microsoft-windows</v-icon>Windows历史版本下载
            </a>
          </v-btn>
          <div class="d-flex justify-space-around" v-if="!isMobile">
            <v-btn
              height="0"
              style="opacity:0;display:none;text-transform:none"
              class="white--text mt-5"
              color="blue darken-2"
              id="Andriod"
              min-width="150"
            >
              <v-icon small>mdi-android</v-icon>Android下载
            </v-btn>
            <v-btn
              height="0"
              style="opacity:0;display:none;text-transform:none"
              class="white--text mt-5"
              color="blue darken-2"
              id="ios"
              min-width="150"
            >
              <v-icon small>mdi-apple</v-icon>iOS下载
            </v-btn>
          </div>
        </v-card>
      </div>
    </v-container>
  </div>
</template>
<script>
import gsap from "gsap";
import pageBar from "~/components/download/pageBar";
import { readUserAgent } from "~/config/userAgent";
export default {
  components: {
    pageBar
  },
  layout: "background",
  data() {
    return {
      isMobile: false,
      mobileSystem: null,
      isMac: false,
      pcNum: 64,
      winVersion: "win 10",
      initSuccess: false,
      isDownloadCard: false,
      maxHeight: 550,
      minHeight: 350,
      win32:
        "http://openstore.daoshi.cloud/zhibola/zhibola_1.5.0_win_ia32%20.exe",
      win64:
        "http://openstore.daoshi.cloud/zhibola/zhibola_1.5.0_win_x64%20.exe",
      downloadHrefWin: "",
      downloadHrefMac:
        "http://openstore.daoshi.cloud/zhibola/zhibola_1.5.0_mac.dmg"
    };
  },
  created() {
    this.initSlot();
  },
  mounted() {
    let userAgentInfo = readUserAgent();
    if (userAgentInfo.flag) {
      //说明是电脑端
      this.isMac = userAgentInfo.isMac;
      this.isWindows = userAgentInfo.isWindows;
      this.winVersion = userAgentInfo.winVersion;
      this.pcNum = userAgentInfo.pcNum;
      this.downloadHrefWin = userAgentInfo.downloadHrefWin;
      if (this.winVersion == "win 7") {
        this.maxHeight = userAgentInfo.maxHeight;
        this.minHeight = userAgentInfo.minHeight;
      } else {
        this.minHeight = 280;
      }
    } else {
      this.isMobile = true;
      this.mobileSystem = userAgentInfo.mobileSystem;
    }
    gsap.fromTo(
      "#downloadCard",
      {
        x: -400,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.7
      }
    );
  },
  methods: {
    initSlot() {
      setTimeout(() => {
        this.initSuccess = true;
      }, 200);
    },
    checkVersion() {
      let downloadCard = document.querySelector("#downloadCard");
      this.isDownloadCard = !this.isDownloadCard;
      if (!this.isDownloadCard) {
        gsap.to("#reverseIcon", {
          rotationX: 360
        });
        gsap.to(
          [
            "#exDownLoadWinBefore_one",
            "#exDownLoadWinBefore_two",
            "#whileMac_32",
            "#whileMac_64",
            "#Andriod",
            "#ios",
            "#exDownloadWin",
            "#historyVersion"
          ],
          {
            height: 0,
            display: "none",
            opacity: 0
          }
        );
        gsap.to("#exDownloadMac", {
          delay: 0.2,
          height: 0,
          display: "none",
          opacity: 0,
          onComplete: () => {
            gsap.to(downloadCard, {
              height: 0
            });
          }
        });
      } else {
        gsap.to("#reverseIcon", {
          rotationX: 180
        });
        gsap.to(downloadCard, {
          height: this.maxHeight,
          duration: 0.3,
          onComplete: () => {
            gsap.to(
              [
                "#exDownLoadWinBefore_one",
                "#exDownLoadWinBefore_two",
                "#whileMac_32",
                "#whileMac_64",
                "#Andriod",
                "#ios",
                "#exDownloadWin",
                "#historyVersion",
                "#exDownloadMac"
              ],
              {
                height: 50,
                display: "block",
                opacity: 1
              }
            );
          }
        });
      }
    }
  }
};
</script>
<style scoped>
a {
  text-decoration: none;
  color: white;
  text-transform: none;
}
</style>
