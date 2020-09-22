import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import "./assets/nprogress.css";
Vue.config.productionTip = false;

axios.defaults.baseURL = "http://localhost:9000";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
