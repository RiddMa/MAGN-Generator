import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store/store";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter(to, from, next) {
      if (store.state.isEditing) {
        store.commit("showToast", {
          type: "info",
          message: "当前正在编辑中，暂不支持新建影评",
          timer: 3000,
        });
        next(false);
      } else {
        next();
      }
    },
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/User/Login"),
    beforeEnter(to, from, next) {
      localStorage.setItem("preRoute", from.path);
      next();
    },
  },
  {
    path: "/user",
    name: "User",
    component: () => import("../views/User/User"),
  },
  {
    path: "/view/:id",
    name: "View",
    component: () => import("../views/User/View"),
  },
  {
    path: "/edit/:id",
    name: "Edit",
    component: () => import("../views/User/Edit"),
  },
  {
    path: "/render/:id",
    name: "PosterSSR",
    component: () => import("../views/PosterSSR"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
// router.afterEach(async () => {
//   let { status, data } = await store.dispatch("heartbeat");
//   if (status !== 200 || data.status !== "OK") {
//     store.commit("showToast", {
//       type: "error",
//       message: "无法连接至服务器",
//       timer: -1,
//     });
//   }
// });
export default router;
