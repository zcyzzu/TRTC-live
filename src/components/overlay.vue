<template>
  <div class="text-center">
    <v-overlay :value="overlay" opacity="0.8">
      <v-progress-circular
        :size="50"
        :width="5"
        indeterminate
        color="success"
      ></v-progress-circular>
      {{ text }}
      <v-btn v-if="reload">取消重试</v-btn>
    </v-overlay>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      text: "正在进入，请稍后！",
      reload: false,
    };
  },
  watch: {
    overlay(newVal, oldVal) {
      let times,
        size = 0;
      if (newVal) {
        times = setInterval(() => {
          size += 1;
          if (size >= 10) {
            this.reload = true;
            clearInterval(times);
          }
        }, 1000);
      }
    },
  },
  computed: {
    ...mapState(["overlay"]),
  },
};
</script>
