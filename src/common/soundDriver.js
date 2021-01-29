export const steps = [{
        element: "#step3",
        opacity: 0,
        popover: {
            title: "选择麦克风",
            description: "选择你想要采用的麦克风",
        },
        onDeselected: () => {
            window.localStorage.setItem("isDriverStatus", true);
        },
    },
    {
        element: "#step4",
        opacity: 0,
        popover: {
            title: "选择扬声器",
            description: "选择你想要采用的扬声器",
        },
        onDeselected: () => {
            window.localStorage.setItem("isDriverStatus", true);
        },
    },
    {
        element: "#step5",
        opacity: 0,
        popover: {
            title: "调节麦克风音量",
            description: "点击不同位置可以设置麦克风的音量",
        },
        onDeselected: () => {
            window.localStorage.setItem("isDriverStatus", true);
        },
    },
    {
        element: "#step6",
        opacity: 0,
        popover: {
            title: "调节扬声器音量",
            description: "点击不同位置可以设置扬声器的音量",
        },
        onDeselected: () => {
            window.localStorage.setItem("isDriverStatus", true);
        },
    },
    {
        element: "#step7",
        opacity: 0,
        popover: {
            title: "测试此机麦克风",
            description: "点击按钮开始测试或停止测试",
        },
        onDeselected: () => {
            window.localStorage.setItem("isDriverStatus", true);
        },
    },
    {
        element: "#step8",
        opacity: 0,
        popover: {
            title: "测试此机扬声器",
            description: "点击按钮开始测试或停止测试",
        },
        onDeselected: () => {
            window.localStorage.setItem("isDriverStatus", true);
        },
    },
];