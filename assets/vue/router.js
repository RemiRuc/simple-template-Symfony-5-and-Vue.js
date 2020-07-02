import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store";
import Home from "./views/Home";
import Login from "./views/Login";

Vue.use(VueRouter);

let router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", component: Home, meta: { requiresAuth: true } },
    { path: "/login", component: Login },
    { path: "*", redirect: "/" }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (store.getters["security/isAuthenticated"]) {
      next();
    } else {
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    }
  } else {
    next();
  }
});

export default router;