<template>
  <div>
    <v-row no-gutters>
      <v-col class="px-10">
        <span>声音设置：</span>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.activeClass();
  },
  methods: {
    activeClass() {
      let doms = document.querySelectorAll(".item");
      for (let i = 0; i < 3; i++) {
        doms[i].classList.remove("active");
      }
      doms[this.$route.meta.active].classList.add("active");
    },
  },
};
</script>
