<template>
  <div style="position:relative;z-index:1">
    <v-container>
      <div style="height:85vh" class="d-flex align-end">
        <v-card
          color="#3f51a5"
          class="mx-auto rounded-xl pa-md-5 pa-2"
          max-height="500"
          min-width="350"
          max-width="800"
          min-height="300"
          elevation="12"
        >
          <h1 class="text-center white--text ">直 播 啦</h1>
          <p class="white--text">当前系统版本为:</p>
          <v-btn
            color="blue darken-2"
            class=" white--text"
            block
          >
            立即下载
            <v-icon right>mdi-cloud-download</v-icon>
          </v-btn>
        </v-card>
      </div>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {}
};
</script>