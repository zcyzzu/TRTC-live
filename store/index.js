export const state = () => ({
    userid: "",
    roomid: "",
    sdkappid: "",
    usersig: "",
    overlay: false //控制遮罩层的状态 (主要是进入房间时)
});
export const mutations = {
    /**
     * @description 请求房间口令后执行 保存房间相关的参数 并且进入房间
     */
    setLoginInfo(state, info) {
        state.userid = info.userid;
        state.roomid = info.roomid;
        state.sdkappid = info.sdkappid;
        state.usersig = info.usersig;
        state.overlay = false;
        this.$router.push({
            path: "/live/room"
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
    }
};