<template>
  <div>
    <v-card class="mx-auto" color="#ff7500">
      <v-btn block color="#000" class="white--text my-2">测试0</v-btn>
    </v-card>
    <v-btn block @click="nrq">测试</v-btn>
    <v-card class="mx-auto" color="#ff7500" id="cards">
      <v-btn block color="#000" class="white--text my-2">测试1</v-btn>
      <v-btn block color="#111" class="white--text my-2">测试2</v-btn>
      <v-btn block color="#222" class="white--text my-2">测试3</v-btn>
      <v-btn block color="#333" class="white--text my-2">测试4</v-btn>
      <v-btn block color="#444" class="white--text my-2">测试5</v-btn>
    </v-card>
  </div>
</template>
<script>
import gsap from "gsap";
export default {
  data() {
    return {
      isHeight: false,
      ceshi: null
    };
  },
  mounted() {
    this.ceshi = gsap.to("#cards", {
      height: 0,
      duration: 0.4
    });
  },
  methods: {
    nrq() {
      if (this.isHeight) {
        this.ceshi.play();
      } else {
        this.ceshi.reverse();
      }
      this.isHeight = !this.isHeight;
    }
  }
};
</script>
<style scoped>
#cards {
  overflow: hidden;
}
</style>