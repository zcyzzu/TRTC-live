<template>
  <v-btn
    max-height="60"
    min-height="50"
    color="blue darken-2"
    class="white--text mt-3"
    :block="btnInfo.block"
    :href="btnInfo.href"
    min-width="175"
  >
    <v-icon small>{{btnInfo.icon}}</v-icon>
    <span>{{btnInfo.downloadInfo}}</span>
  </v-btn>
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
        type: Boolean,
        default: false
      }
    }
  }
};
</script>
