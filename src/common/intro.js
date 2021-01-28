import introJs from "intro.js";
// import "intro.js/themes/introjs-modern.css";

const intro = introJs();
intro.setOptions({
    nextLabel: "下一步",
    prevLabel: "上一步",
    // skipLabel: "跳过",
    doneLabel: "确定",
    exitOnEsc: false,
    hidePrev: false, // 在第一步中是否隐藏上一个按钮
    hideNext: false, // 在最后一步中是否隐藏下一个按钮
    exitOnOverlayClick: false, // 点击叠加层时是否退出介绍
    showStepNumbers: false, // 是否显示红色圆圈的步骤编号
    disableInteraction: true, // 是否禁用与突出显示的框内的元素的交互，就是禁止点击
    showBullets: false, // 是否显示面板指示点
    overlayOpacity: 0.1,
    steps: [{
        element: "#step1", // 目标元素
        intro: "在开始之前，请先进行设备测试，点击确定打开对话框", // 提示文本
        position: "right", // 提示位置
    }, ],
});

export default intro;