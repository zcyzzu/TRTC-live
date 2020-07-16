<template>
  <div>
    <btn v-for="(content,index) in restart.desktop" :key="index" :btnInfo="content"></btn>
    <div class="d-flex justify-space-between">
      <btn v-for="(content,index) in restart.mobile" :key="index" :btnInfo="content"></btn>
    </div>
    <btn :btnInfo="restart.history_version" @historyVersion="historyVersion"></btn>
  </div>
</template>
<script>
import { btnList } from "~/config/btnList";
import btn from "~/components/base/btn";
export default {
  components: {
    btn
  },
  props: ["info"],
  data() {
    return {
     restart:{}
    };
  },
  beforeMount() {
    this.restart = btnList(this.info, "mac");
  },
   methods: {
    historyVersion(){
      this.$emit('historyVersion')
    }
  },
};
</script>