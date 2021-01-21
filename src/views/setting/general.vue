<template>
  <div>
    <h1>this is 常规设置</h1>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: 123,
    };
  },
  mounted() {
    let doms = document.querySelectorAll(".item");
    for (let i = 0; i < 3; i++) {
      doms[i].classList.remove("active");
    }
    doms[this.$route.meta.active].classList.add("active");
  },
  methods: {},
};
</script>
