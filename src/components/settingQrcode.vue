<template>
  <div>
    <v-dialog v-model="settingQrcode" width="600" hide-overlay>
      <v-card width="600">
        <v-card-title>扫码提示</v-card-title>
        <v-card-text class="d-flex align-center justify-center">
          <span v-if="!isScreenLength"
            >请将二维码打开置于屏幕上,并确保屏幕上有且仅有一个二维码</span
          >
          <div v-if="isScreenLength">
            <h4 style="margin-top:0">
              检测到你存在扩展屏幕,请选择要读取的屏幕
            </h4>
            <v-radio-group v-model="radio">
              <v-radio
                v-for="n in screen_Num"
                :key="n"
                :label="`扩展屏幕 ${n}`"
                :value="n"
              ></v-radio>
            </v-radio-group>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="white--text"
            v-if="!isScreenLength"
            @click="startTest"
            color="blue"
            >开始检测</v-btn
          >
          <v-btn
            class="white--text"
            @click="startScan(screen_val)"
            v-else
            color="blue"
            >开始扫描</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <log ref="log"></log>
  </div>
</template>
<script>
import jsQR from "jsqr";
import log from "@/components/log";
import { desktopCapturer, ipcRenderer } from "electron";
import { dataURLtoBlob, blobToFile } from "../common/Qrcode";
export default {
  components: {
    log,
  },
  data() {
    return {
      settingQrcode: false,
      isScreenLength: false,
      screen_val: null,
      screen_Num: 0,
      radio: 1,
    };
  },
  methods: {
    startTest() {
      //开始检测即截图
      this.settingQrcode = false;
      desktopCapturer
        .getSources({
          types: ["screen"],
          thumbnailSize: {
            width: 1920,
            height: 1080,
          },
        })
        .then((val) => {
          this.screen_val = val;
          if (val.length > 1) {
            this.screen_Num = val.length;
            this.settingQrcode = true;
            this.isScreenLength = true;
            return;
          }
          this.startScan(val);
        })
        .catch((err) => {
          this.$refs.log.logInfo = {
            logText: "屏幕检测失败,请重试！",
            logStatus: true,
            logType: "error",
          };
        });
    },
    startScan(val) {
      this.$refs.log.logInfo = {
        logText: "正在扫描二维码，请稍后",
        logStatus: true,
        logType: "warning",
      };
      this.settingQrcode = false;
      this.isScreenLength = false;
      let base_64 = val[this.radio - 1].thumbnail.toDataURL();
      let blob = dataURLtoBlob(base_64);
      let file = blobToFile(blob);
      this.imgToCanvas(base_64, file);
    },
    // 把image 转换为 canvas对象,拿到imageData 传给jsQR
    imgToCanvas(images, file) {
      let that = this;
      let imgFile = new FileReader();
      imgFile.onload = function(e) {
        let image = new Image();
        image.src = images; //base64数据
        image.onload = function() {
          let canvas = document.createElement("canvas");
          canvas.width = image.width;
          canvas.height = image.height;
          let ctx = canvas.getContext("2d");
          ctx.drawImage(image, 0, 0);
          let imageData = ctx.getImageData(0, 0, image.width, image.height);
          const code = jsQR(imageData.data, image.width, image.height);
          if (code) {
            that.$emit("setRoomJwt", code.data);
            let width_x = Math.floor(
              code.location.bottomRightCorner.x -
                code.location.bottomLeftCorner.x
            );
            let height_y = Math.floor(
              code.location.bottomLeftCorner.y - code.location.topLeftCorner.y
            );
            let windows_x = Math.floor(code.location.bottomLeftCorner.x);
            let windows_y = Math.floor(code.location.topLeftCorner.y);
            ipcRenderer.send(
              "sendXY",
              `${width_x}`,
              `${height_y}`,
              `${windows_x}`,
              `${windows_y}`,
              `${that.radio - 1}`
            );
            ipcRenderer.on("sendXY_back", (event, arg) => {
              if (that.$route.path != "/room") {
                that.$refs.log.logInfo = {
                  logText: "扫描成功",
                  logStatus: true,
                  logType: "success",
                };
                that.$router.push({
                  path: "/room",
                });
                that.$emit("enterRoom");
              }
            });
          } else {
            if (that.$route.path != "/room") {
              that.$refs.log.logInfo = {
                logText: "读取错误，请确保屏幕上有且仅有一个二维码，且未被遮挡",
                logStatus: true,
                logType: "error",
              };
            }
          }
        };
      };
      imgFile.readAsDataURL(file);
    },
  },
  watch: {
    settingQrcode(newVal) {
      newVal ? null : (this.isScreenLength = false);
    },
  },
};
</script>
