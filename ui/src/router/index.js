import Vue from "vue";
import VueRouter from "vue-router";
import {
  Home,
  Login,
  Register,
  Form,
  Account,
  Plans,
  ForgetPassword,
  PasswordReset,
  LoginGoogle
} from "../views";

import store from "../store";

import NProgress from "nprogress";
import axios from "axios";

Vue.use(VueRouter);
NProgress.configure({ showSpinner: false });

const routes = [
  {
    path: "/",
    name: "Forms",
    component: Home,
    meta: { protected: true }
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/login/google",
    name: "LoginGoogle",
    component: LoginGoogle
  },
  {
    path: "/reset/:token",
    name: "PasswordReset",
    component: PasswordReset
  },
  {
    path: "/forget-password",
    name: "ForgetPassword",
    component: ForgetPassword
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/form/:id",
    name: "Form",
    component: Form,
    meta: { protected: true }
  },
  {
    path: "/account",
    name: "Account",
    component: Account,
    meta: { protected: true }
  },
  {
    path: "/plans",
    name: "Plans",
    component: Plans
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (
    to.matched.some(record => record.meta.protected) &&
    store.state.token == null
  ) {
    next({
      path: "/login",
      query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
  next();
});

router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

axios.interceptors.request.use(
  function(config) {
    if (!config.headers.Authorization) {
      const token = store.state.token;
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    return response.data;
  },
  function(error) {
    if (
      error.response.status == 401 &&
      error.response.data.message.includes("Token")
    ) {
      return router.push("/login");
    }
    return Promise.reject(error);
  }
);
export default router;
