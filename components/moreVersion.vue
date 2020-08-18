<template>
  <div>
    <transition name="zcy">
      <div v-if="isShow">
        <btn
          v-for="(content, index) in restart.desktop"
          :key="index"
          :btnInfo="content"
        ></btn>
        <div v-if="info.flag" class="d-flex justify-space-between">
          <btn
            v-for="(content, index) in restart.mobile"
            :key="index"
            :btnInfo="content"
          ></btn>
        </div>
        <btn
          :btnInfo="restart.history_version"
          @historyVersion="historyVersion"
        ></btn>
      </div>
    </transition>
  </div>
</template>
<script>
import gsap from "gsap";
import { btnList } from "~/config/btnList";
import btn from "~/components/base/btn";
import { setBtn } from "~/config/setBtn";
import { moreVersions } from "~/config/gsap";
export default {
  components: {
    btn,
  },
  props: ["info"],
  data() {
    return {
      isShow: false,
      restart: {}
    };
  },
  beforeMount() {
    this.restart = btnList(this.info);
  },
  methods: {
    historyVersion() {
      this.$emit("historyVersion");
    }
  }
};
</script>
