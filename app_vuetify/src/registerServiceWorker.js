/* eslint-disable no-console */

import { register } from "register-service-worker";
import store from "@/store/store";

if (process.env.NODE_ENV === "production") {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        "App is being served from cache by a service worker.\n" + "For more details, visit https://goo.gl/AFskqB"
      );
    },
    registered() {
      console.log("Service worker has been registered.");
    },
    cached() {
      alert();
      console.log("Content has been cached for offline use.");
    },
    updatefound() {
      console.log("New content is downloading.");
      store.commit("showToast", {
        dialog: true,
        type: "updatePage",
        message: "应用有更新，正在加载并更新页面",
      });
      // alert("应用有更新，正在加载并更新页面");
    },
    async updated(registration) {
      console.log("New content is available; please refresh.");
      await registration.update();
      caches.keys().then(function (names) {
        for (let name of names) caches.delete(name).then(() => window.location.reload(true));
      });
    },
    offline() {
      console.log("No internet connection found. App is running in offline mode.");
    },
    error(error) {
      console.error("Error during service worker registration:", error);
    },
  });
}
