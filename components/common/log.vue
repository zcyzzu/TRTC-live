<template>
  <div id="logBox">
    <v-alert
      transition="slide-y-transition"
      dense
      id="log"
      width="400"
      :type="logInfo.logType"
      :value="logInfo.logStatus"
    >
      {{ logInfo.logText }}
    </v-alert>
  </div>
</template>
<script>
export default {
  data() {
    return {
      logInfo: {
        logText: "这是消息通知条!",
        logStatus: false,
        logType: "success",
      },
    };
  },
  watch: {
    "logInfo.logStatus": function (newVal, oldVal) {
      if (newVal) {
        setTimeout(() => {
          this.logInfo.logStatus = false;
        }, 3000);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
#logBox {
  position: relative;
}
#log {
  position: fixed;
  top: 40px;
  left: 50%;
  margin-left: -200px;
}
</style>
