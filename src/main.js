import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import router from "./router";
import "./assets/css/reset.css";
import "./assets/css/global.css";
import Echart from "echarts";

Vue.config.productionTip = false;
Vue.prototype.$echarts = Echart;

Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
