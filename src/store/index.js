import Vue from "vue";
import Vuex from "vuex";
import TRTCCloud from "trtc-electron-sdk";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userid: "",
        roomid: "",
        sdkappid: "",
        usersig: "",
    },
    mutations: {
        setLoginInfo(state, info) {
            state.userid = info.userid;
            state.roomid = info.roomid;
            state.sdkappid = info.sdkappid;
            state.usersig = info.usersig;
        },
    },
    actions: {},
    modules: {},
});