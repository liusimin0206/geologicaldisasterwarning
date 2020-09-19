import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/myMap"
  },
  {
    path: "/myMap",
    name: "myMap",
    component: () => import("../views/myMap.vue")
  },
  {
    path: "/statistics",
    name: "statistics",
    component: () => import("../views/statistics.vue")
  },
  {
    path: "/management",
    name: "management",
    component: () => import("../views/management.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
