<template>
  <div>
    <v-btn
      :color="color"
      class="white--text mt-5"
      height="0"
      style="opacity:0;display:none"
      block
    >
      <a :href="hrefs">{{text}}</a>
    </v-btn>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: "这是按钮内容"
    },
    hrefs: {
      type: String,
      default: null
    },
    color:{
        type: String,
        default: 'blue darken-2',
    }
  }
};
</script>