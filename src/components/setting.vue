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
          <div id="step2" v-if="index === 1">
            <v-icon class="mr-4" small>{{ ele[0] }}</v-icon>
            <span class="text-subtitle-2">{{ ele[1] }}</span>
          </div>
          <div v-else>
            <v-icon class="mr-4" small>{{ ele[0] }}</v-icon>
            <span class="text-subtitle-2">{{ ele[1] }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Driver from "driver.js";
import titleBar from "@/components/titleBar";
export default {
  components: {
    titleBar,
  },
  data: () => ({
    settingList: [
      ["mdi-email", "常规设置", "general"],
      ["mdi-microphone", "声音设置", "sound"],
      // ["mdi-code-braces", "其他设置", "others"],
    ],
    init_index: 0,
  }),
  mounted() {
    document
      .querySelectorAll(".item")
      [this.init_index].classList.add("selected");

    /**
     * @description 设置界面的引导页 打开之前判断isDriverStatus状态
     */
    setTimeout(() => {
      const driver = new Driver({
        allowClose: false,
        keyboardControl: false,
        opacity: 0,
      });
      driver.defineSteps([
        {
          element: "#step2",
          closeBtnText: "确定",
          popover: {
            title: "声音设置",
            description:
              "主要是对此设备扬声器和麦克风进行设置,点击确定进行下一步！",
          },
          onDeselected: () => {
            this.settingItems(1);
          },
        },
      ]);
      if (!window.localStorage.getItem("isDriverStatus")) {
        driver.start();
      }
      let highlighted = document.getElementById(
        "driver-highlighted-element-stage"
      );
      highlighted.style.cssText = "z-index:1000!important;";
    }, 300);
  },
  methods: {
    /**
     * @description
     */
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
