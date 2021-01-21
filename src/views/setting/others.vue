<template>
  <div>
    <h1>其他设置</h1>
  </div>
</template>
<script>
export default {
  mounted() {
    let doms = document.querySelectorAll(".item");
    for (let i = 0; i < 3; i++) {
      doms[i].classList.remove("active");
    }
    doms[this.$route.meta.active].classList.add("active");
  },
};
</script>
