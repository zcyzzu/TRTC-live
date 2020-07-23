<template>
  <div>
    <v-btn
      max-height="60"
      min-height="50"
      max-width="350"
      color="blue darken-2"
      class="white--text mb-3"
      :block="btnInfo.block"
      :href="btnInfo.href"
      min-width="170"
      @click="dialogs"
    >
      <v-icon small>{{btnInfo.icon}}</v-icon>
      <span>{{btnInfo.downloadInfo}}</span>
      <v-icon small>{{btnInfo.rightArray}}</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" max-width="408" >
      <v-card class="downloadCard">
        <v-card-title class="white--text">{{dialogTitle}}</v-card-title>
        <v-card-actions class="px-6 py-1 white--text">{{dialogText_code}}</v-card-actions>
        <div v-if="isAndroid">
          <v-img class="mx-auto" height="200" width="200" src="./AndroidCode.png"></v-img>
          <v-card-actions class="px-6 py-1 white--text">{{dialogText_a}}</v-card-actions>
          <v-card-text class="text-center">
            <v-btn color="blue darken-2" class="white--text mb-3" href="https://openstore.daoshi.cloud/zhibola/zhibola_latest.apk" elevation="0">
              <v-icon>mdi-download</v-icon>
              点此下载到本机</v-btn>
          </v-card-text>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: {
    btnInfo: {
      href: {
        type: String,
        default: "",
      },
      downloadInfo: {
        type: String,
        default: "Mac版下载",
      },
      icon: {
        type: String,
        default: "mdi-apple",
      },
      block: {
        type: Boolean || String,
        default: false,
      },
      rightArray: {
        type: String,
        default: "",
      },
    },
  },
  data() {
    return {
      dialog: false,
      dialogTitle: "提示信息",
      dialogText_code: "手机版会在近期推出，敬请期待",
      dialogText_a: "",
      isAndroid: false,
    };
  },
  methods: {
    dialogs() {
      if (this.btnInfo.downloadInfo == "IOS") {
        this.dialog = true;
      } else if (this.btnInfo.downloadInfo == "Android") {
        this.dialog = true;
        this.isAndroid = true;
        this.dialogTitle = "Android版下载";
        this.dialogText_code = "1.扫码下载";
        this.dialogText_a = "2.直接下载";
      } else if (this.btnInfo.downloadInfo == "历史版本下载") {
        this.$emit("historyVersion");
      }
    },
  },
};
</script>
<style scoped>
  .downloadCard{
     background: linear-gradient(#1976d2, #3f51a5)!important;
  }
</style>
