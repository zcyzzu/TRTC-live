export const state = () => ({
    userAgentInfo: {}
});
export const mutations = {
    setUserAgentInfo(state, v) {
        state.userAgentInfo = v;
    }
};