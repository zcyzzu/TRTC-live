<template>
  <div>
    <v-container class="hidden-md-and-down">
      <div class="d-flex">
        <v-img :src="require(`@/assets/book.svg`)" max-height="60" max-width="60" contain></v-img>
        <span class="fonts text-h2 font-weight-bold white--text px-5" >直 播 啦</span>
      </div>
    </v-container>
    <v-container class="hidden-lg-and-up">
      <div class="d-flex">
        <v-img :src="require(`@/assets/book.svg`)" max-height="40" max-width="40" contain></v-img>
        <span class="fonts text-h4 font-weight-bold px-2 white--text">直 播 啦</span>
      </div>
    </v-container>
  </div>
</template>
<style scoped>
.fonts {
  font-family: SimHei  !important;
}
</style>