import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/store";
import goTo from "vuetify/lib/services/goto";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/New"),
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
    // beforeEnter(to, from, next) {
    //   localStorage.setItem("preRoute", from.path);
    //   next();
    // },
  },
  {
    path: "/user",
    name: "User",
    component: () => import("../views/User/User"),
    async beforeEnter(to, from, next) {
      if (await store.dispatch("isUserLoggedIn")) {
        next();
      } else {
        localStorage.setItem("preRoute", "/user");
        next("/login");
      }
    },
  },
  {
    path: "/view/:id",
    name: "View",
    component: () => import("../views/User/Preview"),
  },
  {
    path: "/edit/:id",
    name: "Edit",
    component: () => import("../views/User/Edit"),
  },
  {
    path: "/render/:uuid/:reviewId",
    name: "PosterSSR",
    component: () => import("../views/PosterSSR"),
    beforeEnter(to, from, next) {
      store.commit("setIsSSR", true);
      next();
    },
  },
  {
    path: "/poster/:reviewId",
    name: "PosterShow",
    component: () => import("../views/PosterShow"),
    beforeEnter(to, from, next) {
      localStorage.setItem("preRoute", from.path);
      next();
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    let scrollTo = 0;
    if (to.hash) {
      scrollTo = to.hash;
    } else if (savedPosition) {
      scrollTo = savedPosition.y;
    }
    return goTo(scrollTo);
  },
});
// router.beforeEach((to, from, next) => {
//   localStorage.setItem("preRoute", from.path);
//   localStorage.setItem("toRoute", to.path);
//   next();
// });
export default router;
