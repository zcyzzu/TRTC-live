<template>
  <v-app>
    <v-main>
      <v-img
        :src="require('@/assets/art/blob-top-min.png')"
        style="position: fixed; top: 0; left: 0;"
        :height="$vuetify.breakpoint.smAndDown ? '650' : 'auto'"
        max-width="100%"
        width="1300"
      />
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