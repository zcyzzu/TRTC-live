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
    <v-dialog v-model="dialog" max-width="408">
      <v-card>
        <v-card-title>提示信息</v-card-title>
        <v-card-text>手机版会在近期推出，敬请期待!</v-card-text>
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
        default: ""
      },
      downloadInfo: {
        type: String,
        default: "Mac版下载"
      },
      icon: {
        type: String,
        default: "mdi-apple"
      },
      block: {
        type: Boolean || String,
        default: false
      },
      rightArray: {
        type: String,
        default: ""
      }
    }
  },
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    dialogs() {
      if (this.btnInfo.downloadInfo == "IOS") {
        this.dialog = true;
      } else if (this.btnInfo.downloadInfo == "Android") {
        this.dialog = true;
      } else if (this.btnInfo.downloadInfo == "历史版本下载") {
        this.$emit("historyVersion");
      }
    }
  }
};
</script>
