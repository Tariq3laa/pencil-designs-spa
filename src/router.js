import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login";
import AddNews from "./views/AddNews";
import UpdateNews from "./views/UpdateNews";
import Dashboard from "./views/Dashboard";

import store from "./store";
Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        guest: true
      }
    },
    {
      path: "/add",
      name: "AddNews",
      component: AddNews,
      meta: {
        auth: true
      }
    },
    {
      path: "/update/:id/:title/:body",
      name: "UbdateNews",
      component: UpdateNews,
      meta: {
        auth: true
      }
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
      meta: {
        auth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if (!store.state.loggedIn) {
      next({
        path: "/login"
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (!store.state.loggedIn) {
      next();
    } else {
      next({
        path: "/dashboard"
      });
    }
  } else {
    next();
  }
});

export default router;
