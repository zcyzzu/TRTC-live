<template>
  <div>
    <v-dialog v-model="settingDailog" max-width="700" persistent>
      <v-card width="700" height="600">
        <div class="text-right">
          <v-btn icon @click="settingDailog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <setting @changeTab="changeTab"></setting>
        <component
          id="rightContent"
          :ref="componentId"
          :is="componentId"
        ></component>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import setting from "@/components/setting";
import general from "@/components/setting/general";
import sound from "@/components/setting/sound";
export default {
  components: {
    setting,
    general,
    sound,
  },
  data() {
    return {
      settingDailog: false,
      componentId: "general",
    };
  },
  methods: {
    changeTab(val) {
      this.componentId = val;
      if (val === "sound") {
        setTimeout(() => {
          this.$refs.sound.init();
        }, 0);
      }
    },
  },
  watch: {
    settingDailog: function (newVal, oldVal) {
      if (newVal && this.componentId === "sound") {
        setTimeout(() => {
          this.$refs.sound.init();
        }, 0);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
#rightContent {
  position: absolute;
  right: 0;
  left: 140px;
  top: 35px;
  bottom: 0;
}
</style>
