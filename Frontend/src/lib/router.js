import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { transition: "slide-left" },
  },
  {
    path: "/about",
    name: "About",
    meta: { transition: "slide-right" },
    component: () => import("../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login"),
    beforeEnter(to, from) {
      // 在渲染该组件的对应路由被 confirm 前调用
      // 不！能！获取组件实例 `this`
      // 因为当守卫执行前，组件实例还没被创建
      localStorage.setItem("preRoute", from.path);
    },
  },
  {
    path: "/user",
    name: "User",
    component: () => import("../views/User"),
  },
  {
    path: "/render/:id",
    name: "PosterSSR",
    component: () => import("../views/PosterSSR"),
  },
  {
    path: "/test",
    name: "test",
    component: () => import("../views/test"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
