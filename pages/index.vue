<template>
  <div style="position:relative;z-index:1">
    <pageBar></pageBar>
    <!-- <topContent class="hidden-sm-and-down"></topContent> -->
    <v-container>
      <div class="d-flex align-center" style="height:85vh">
        <v-card
          id="downloadCard"
          color="#3f51a5"
          class="mx-auto rounded-xl pa-md-5 pa-5"
          max-width="800"
          min-width="350"
          min-height="370"
          elevation="12"
          style="opacity:0"
        >
          <h1 class="text-center white--text hidden-md-and-down text-h4">下载软件</h1>
          <h1 class="text-center white--text hidden-lg-and-up text-h5">下载软件</h1>
          <transition name="first">
            <div v-if="initSuccess">
              <p class="white--text my-5">根据当前设备，推荐你选择{{winVersion}}/{{pcNum}}位版</p>
            </div>
          </transition>
          <transition name="first" v-if="winVersion=='win 7'">
            <div v-if="initSuccess">
              <v-alert type="info">win7系统需先下载xxx</v-alert>
            </div>
          </transition>
          <transition name="fade">
            <div v-if="initSuccess">
              <v-btn
                v-if="isMobile"
                min-height="60"
                color="blue darken-2"
                class="white--text"
                block
              >手机客户端将会在近期发布</v-btn>
              <v-btn
                v-else-if="!isMac&&winVersion!='win 7'"
                min-height="60"
                color="blue darken-2"
                class="white--text"
                block
              >
                下载 {{winVersion}}/{{pcNum}}位版
                <v-icon right color="white">mdi-cloud-download</v-icon>
              </v-btn>
              <div v-else-if="!isMac&&winVersion=='win 7'" class="d-flex justify-space-around">
                <v-btn min-height="60" color="blue darken-2" class="white--text">
                  下载xxx
                  <v-icon right color="white">mdi-cloud-download</v-icon>
                </v-btn>
                <v-btn min-height="60" color="blue darken-2" class="white--text">
                  {{winVersion}}/{{pcNum}}位版
                  <v-icon right color="white">mdi-cloud-download</v-icon>
                </v-btn>
              </div>
              <v-btn v-else color="blue darken-2" class="white--text" block>
                下载 mac 版
                <v-icon right>mdi-cloud-download</v-icon>
              </v-btn>
            </div>
          </transition>
          <transition name="fades">
            <div v-if="initSuccess">
              <v-btn
                color="blue darken-2"
                @click="checkVersion"
                class="white--text mt-5"
                block
                min-height="60"
              >
                其他版本选择
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
            style="opacity:0"
            v-if="!isMac"
          >
            下载 mac 版
            <v-icon right color="white">mdi-cloud-download</v-icon>
          </v-btn>
          <div v-if="!isMac&&winVersion=='win 7'" class="d-flex justify-space-around">
            <v-btn
              id="exDownLoadWinBefore"
              color="blue darken-2"
              class="white--text mt-5"
              height="0"
              style="opacity:0"
            >
              下载 xxx
              <v-icon right color="white">mdi-cloud-download</v-icon>
            </v-btn>
            <v-btn
              id="exDownloadWin"
              color="blue darken-2"
              class="white--text mt-5"
              height="0"
              style="opacity:0"
              v-if="pcNum"
            >
              {{winVersion}}/32位版
              <v-icon right color="white">mdi-cloud-download</v-icon>
            </v-btn>
            <v-btn
              id="exDownloadWin"
              color="blue darken-2"
              class="white--text mt-5"
              height="0"
              style="opacity:0"
              v-else
            >
              {{winVersion}}/64位版
              <v-icon right color="white">mdi-cloud-download</v-icon>
            </v-btn>
          </div>
          <div v-else>
            <v-btn
              id="exDownloadWin"
              color="blue darken-2"
              class="white--text mt-5"
              height="0"
              style="opacity:0"
              block
              v-if="pcNum"
            >
              {{winVersion}}/32位版
              <v-icon right color="white">mdi-cloud-download</v-icon>
            </v-btn>
            <v-btn
              id="exDownloadWin"
              color="blue darken-2"
              class="white--text mt-5"
              height="0"
              block
              style="opacity:0"
              v-else
            >
              {{winVersion}}/64位版
              <v-icon right color="white">mdi-cloud-download</v-icon>
            </v-btn>
            <div class="d-flex justify-space-around">
              <v-btn
                height="0"
                style="opacity:0"
                class="white--text mt-5"
                color="blue darken-2"
                id="Andriod"
              >下载手机版/安卓</v-btn>
              <v-btn
                height="0"
                style="opacity:0"
                class="white--text mt-5"
                color="blue darken-2"
                id="ios"
              >下载手机版/ios</v-btn>
            </div>
          </div>
         
        </v-card>
      </div>
    </v-container>
  </div>
</template>
<script>
import gsap from "gsap";
import pageBar from "~/components/download/pageBar";
import topContent from "~/components/download/topContent";
export default {
  components: {
    pageBar,
    topContent
  },
  data() {
    return {
      isMobile: false,
      mobileSystem: null,
      isMac: false,
      pcNum: 64,
      winVersion: "win 10",
      initSuccess: false,
      isDownloadCard: false
    };
  },
  created() {
    this.initSlot();
  },
  mounted() {
    this.IsPC() ? this.isWinOrMac() : (this.isMobile = true);
    gsap.fromTo(
      document.querySelector("#downloadCard"),
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
        gsap.to(document.querySelector("#reverseIcon"), {
          rotationX: 360
        });
        gsap.to(document.querySelector("#exDownLoadWinBefore"), {
          height: 0,
          opacity: 0
        });
        gsap.to(document.querySelector("#Andriod"), {
          height: 0,
          opacity: 0
        });
        gsap.to(document.querySelector("#ios"), {
          height: 0,
          opacity: 0
        });
        gsap.to(document.querySelector("#exDownloadWin"), {
          height: 0,
          opacity: 0
        });
        gsap.to(document.querySelector("#exDownloadMac"), {
          delay: 0.2,
          height: 0,
          opacity: 0,
          onComplete: () => {
            gsap.to(downloadCard, {
              height: 0
            });
          }
        });
      } else {
        gsap.to(document.querySelector("#reverseIcon"), {
          rotationX: 180
        });
        gsap.to(downloadCard, {
          height: 540,
          duration: 0.3,
          onComplete: () => {
            gsap.to(document.querySelector("#exDownLoadWinBefore"), {
              height: 60,
              opacity: 1
            });
            gsap.to(document.querySelector("#Andriod"), {
              height: 60,
              opacity: 1
            });
            gsap.to(document.querySelector("#ios"), {
              height: 60,
              opacity: 1
            });
            gsap.to(document.querySelector("#exDownloadWin"), {
              height: 60,
              opacity: 1
            });
            gsap.to(document.querySelector("#exDownloadMac"), {
              height: 60,
              delay: 0.1,
              opacity: 1
            });
          }
        });
      }
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
        this.isMac = true;
        return true;
      } else {
        //如果是win 接下来判断版本和位数
        // this.winVersion = "win 7";
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
</style>