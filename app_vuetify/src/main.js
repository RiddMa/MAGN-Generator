import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store/store";
import vuetify from "./plugins/vuetify";
import VueMeta from "vue-meta";

// Vue.config.productionTip = false;

// Register a global custom directive called `v-blur` that prevents focus
Vue.directive("blur", {
  inserted: function (el) {
    el.onfocus = (ev) => ev.target.blur();
  },
});

Vue.use(VueMeta, {
  // 定义组件中的数据对象
  keyName: "head",
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
