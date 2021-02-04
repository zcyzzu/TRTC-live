import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from 'axios'
import "@babel/polyfill";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import "./common/assets.css";
import "driver.js/dist/driver.min.css";
axios.defaults.baseURL = "https://live.daoshi.cloud/api/v2/";
import { api } from "./config/api";
Vue.prototype.$api = api
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount("#app");