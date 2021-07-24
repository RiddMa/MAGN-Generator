import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store/store";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

// Register a global custom directive called `v-blur` that prevents focus
Vue.directive("blur", {
  inserted: function (el) {
    el.onfocus = (ev) => ev.target.blur();
  },
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
