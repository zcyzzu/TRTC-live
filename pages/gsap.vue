<template>
  <div>
    <v-card
      id="card"
      class="mx-auto rounded-xl pa-md-5 pa-5 d-flex flex-column justify-center"
      color="#3f51a5"
      elevation="12"
      max-width="400"
      min-height="340"
    >
      <btn :btnInfo="ceshibtn"></btn>
      <div>
        <v-btn
          height="40"
          @click="checkVersion"
          color="blue darken-2"
          block
          class="white--text mt-3"
        >
          更多版本下载
          <v-icon id="reverseIcon" color="white" right>mdi-chevron-down</v-icon>
        </v-btn>
        <btn style="display:none;height:0;opacity:0" class="zcy" :btnInfo="ceshibtn"></btn>
        <btn style="display:none;height:0;opacity:0" class="zcy" :btnInfo="ceshibtn"></btn>
      </div>
    </v-card>
  </div>
</template>
<script>
import btn from "~/components/base/btn";
import gsap from "gsap";
export default {
  components: {
    btn
  },
  data() {
    return {
      isheight: true,
      ceshibtn: {
        downloadInfo: "cehsi",
        block: true,
        icon: "mdi-apple",
        href: ""
      }
    };
  },
  mounted() {
    gsap.from("#card", {
      x: -800,
      opacity: 0,
      duration: 1
    });
  },
  methods: {
    checkVersion() {
      if (this.isheight) {
        gsap.to("#card", {
          minHeight: 500,
          onComplete: () => {
            gsap.to(".zcy", {
              display: "block",
              duration: 0.5,
              height: 40,
              opacity: 1
            });
          }
        });
      } else {
        gsap.to(".zcy", {
          display: "none",
          height: 0,
          opacity: 0,
          onComplete: () => {
            gsap.to("#card", {
              minHeight: 340
            });
          }
        });
      }
      this.isheight = !this.isheight;
    }
  }
};
</script>