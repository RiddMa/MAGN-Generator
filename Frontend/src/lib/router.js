import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    // children: [
    //   {
    //     path: "/desktop",
    //     name: "MAGN-Generator",
    //     component: () => import("../components/Review"),
    //   },
    //   {
    //     path: "/mobile",
    //     name: "MAGN-Generator",
    //     component: () => import("../components/ReviewPhone"),
    //   },
    //   {
    //     path: "/settings",
    //     name: "MAGN-Generator",
    //     component: () => import("../components/Settings"),
    //   },
    // ],
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login"),
  },
  {
    path: "/user",
    name: "User",
    component: () => import("../views/User"),
  },
  {
    path: "/user/:id",
    name: "GeneratePoster",
    component: () => import("../views/PosterSSR"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
