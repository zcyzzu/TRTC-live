<template>
  <div>
    <v-dialog v-model="settingDailog" max-width="700">
      <v-card width="700" height="600">
        <setting @changeTab="changeTab"></setting>
        <component id="rightContent" :is="componentId"></component>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import setting from "@/components/setting";
import general from "@/components/setting/general";
import sound from "@/components/setting/sound";
import others from "@/components/setting/others";
export default {
  components: {
    setting,
    general,
    sound,
    others,
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
