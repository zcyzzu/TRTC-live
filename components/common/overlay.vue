<template>
  <div class="text-center">
    <v-overlay :value="info.isOverlay" z-index="999" opacity="1">
      <v-progress-circular
        :size="30"
        :width="5"
        indeterminate
        color="success"
      ></v-progress-circular>
      {{ info.text }}
      <v-btn v-if="reload" color="error" @click="cancel">取消重试</v-btn>
    </v-overlay>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: {
        text: "正在进入，请稍后！",
        isOverlay: false,
      },
      reload: false,
    };
  },
  watch: {
    "info.isOverlay"(newVal, oldVal) {
      this.reload = false;
      let times,
        size = 0;
      if (newVal) {
        times = setInterval(() => {
          size += 1;
          if (size >= 3) {
            this.reload = true;
            clearInterval(times);
          }
        }, 1000);
      }
    },
  },
  methods: {
    cancel() {
      this.$emit("exitRoom", false);
      this.reload = false;
    },
  },
};
</script>
