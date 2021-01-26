import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import { ipcRenderer } from "electron";
import TRTCCloud from "trtc-electron-sdk";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userid: "",
        roomid: "",
        sdkappid: "",
        usersig: "",
        overlay: false,
        trtcCloud: "",
    },
    mutations: {
        initTrtc(state) {
            state.trtcCloud = new TRTCCloud();
        },
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