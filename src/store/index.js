import { ipcRenderer } from "electron";
import TRTCCloud from "trtc-electron-sdk";
import Vue from "vue";
import Vuex from "vuex";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userid: "",
        roomid: "",
        sdkappid: "",
        usersig: "",
        overlay: false, //控制遮罩层的状态 (主要是进入房间时)
        trtcCloud: "", //trtc实例
    },
    mutations: {
        /**
         * @description trtc实例化 在首页created钩子中执行
         */
        initTrtc(state) {
            state.trtcCloud = new TRTCCloud();
        },
        /**
         * @description 请求房间口令后执行 保存房间相关的参数 并且进入房间
         */
        setLoginInfo(state, info) {
            state.userid = info.userid;
            state.roomid = info.roomid;
            state.sdkappid = info.sdkappid;
            state.usersig = info.usersig;
            ipcRenderer.send("createRoom", info);
            state.overlay = false;
            router.push({
                path: "/room",
            });
        },
        /**
         * @description 更改遮罩层状态
         */
        setOverlay(state) {
            state.overlay = true;
        },
        cancelOverlay(state) {
            state.overlay = false;
        },
    },
    actions: {},
    modules: {},
});