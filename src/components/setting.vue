<template>
  <div>
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
      ["mdi-email", "常规设置", "general"],
      ["mdi-microphone", "声音设置", "sound"],
      ["mdi-code-braces", "其他设置", "others"],
    ],
    init_index: 0,
  }),
  mounted() {
    document
      .querySelectorAll(".item")
      [this.init_index].classList.add("selected");
  },
  methods: {
    settingItems(index) {
      this.$emit("changeTab", this.settingList[index][2]);
      document
        .querySelectorAll(".item")
        [this.init_index].classList.remove("selected");
      document.querySelectorAll(".item")[index].classList.add("selected");
      this.init_index = index;
    },
  },
};
</script>
<style lang="scss" scoped>
#leftBar {
  position: absolute;
  top: 15px;
  left: 0;
  bottom: 0;
  width: 140px;
  border-right: 2px solid #eee;
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
.selected {
  background: #eee;
}
</style>
