<template>
  <div>
    <titleBar></titleBar>
    <div id="leftBar">
      <div class="leftBarlist">
        <div
          v-for="(ele, index) in settingList"
          :key="index"
          @click="settingItems(index)"
          class="item d-flex  align-center px-4 py-2"
        >
          <v-icon class="mr-4" small>{{ ele[0] }}</v-icon>
          <span class="text-subtitle-2">{{ ele[1] }}</span>
        </div>
      </div>
    </div>
    <div id="rightContent">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import titleBar from "@/components/titleBar";
export default {
  components: {
    titleBar,
  },
  data: () => ({
    settingList: [
      ["mdi-email", "常规设置", "/setting"],
      ["mdi-microphone", "声音设置", "/setting/sound"],
      ["mdi-code-braces", "其他设置", "/setting/others"],
    ],
  }),
  methods: {
    settingItems(index) {
      this.$router.push({
        path: this.settingList[index][2],
      });
    },
  },
};
</script>
<style lang="scss" scoped>
#leftBar {
  position: absolute;
  top: 41px;
  left: 0;
  bottom: 0;
  width: 140px;
  border-right: 2px solid #eee;
}
#rightContent {
  position: absolute;
  top: 41px;
  bottom: 0;
  right: 0;
  left: 140px;
}
.leftBarItem {
  width: 100%;
}
.item {
  cursor: pointer;
  width: 100%;
  transition: all 0.3s;
}
.item:hover {
  background: #eee;
}
</style>
