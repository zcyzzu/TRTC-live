<template>
  <v-app>
    <div
      style="height: 100%"
      class="d-flex flex-column justify-center align-center"
    >
      <v-icon color="red" class="mb-4" x-large>mdi-alert-circle-outline</v-icon>
      <p class="text-md-h4 text-subtitle-1">错误码： {{ error.statusCode }}</p>
      <p class="text-md-h5 text-subtitle-2">
        {{ error.message }}
      </p>
      <p class="text-md-h5 text-subtitle-2">{{ error.desc }}</p>
    </div>
  </v-app>
</template>

<script>
export default {
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
