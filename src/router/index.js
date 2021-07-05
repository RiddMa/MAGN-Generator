import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/desktop",
        name: "MAGN-Generator",
        component: () => import("../components/Review"),
      },
      {
        path: "/mobile",
        name: "MAGN-Generator",
        component: () => import("../components/ReviewPhone"),
      },
      {
        path: "/settings",
        name: "MAGN-Generator",
        component: () => import("../components/Settings"),
      },
    ],
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
