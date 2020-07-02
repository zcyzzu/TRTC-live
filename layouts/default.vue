<template>
  <v-app>
    <v-main>
      <transition name="fade">
      <div v-if="initSuccess">
      <v-img
        :src="require('@/assets/art/blob-top-min.png')"
        style="position: fixed; top: 0; left: 0;"
        :height="$vuetify.breakpoint.smAndDown ? '650' : 'auto'"
        max-width="100%"
        width="1300"
      />
      </div>
      </transition>
      <img
        :src="require('@/assets/art/blob-right-side.png')"
        class="hidden-sm-and-down"
        height="500"
        style="position: fixed; top: 35vh; right: 0;"
      />
      <nuxt  />
    </v-main>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      initSuccess:false
    }
  },
  created() {
    this.initSlot()
  },
  methods: {
    initSlot() {
      setTimeout(() => {
        this.initSuccess = true;
      }, 200);
    },
  },
}
</script>
<style scoped>
    .fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>