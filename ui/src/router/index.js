import Vue from "vue";
import VueRouter from "vue-router";
import { Home, Login, Register, Form, Account, Plans } from "../views";
import NProgress from "nprogress";
import axios from "axios";
Vue.use(VueRouter);
NProgress.configure({ showSpinner: false });

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  { path: "/form/:id", name: "Form", component: Form },
  {
    path: "/account",
    name: "Account",
    component: Account
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
    /**
     * Attach Headers to axios request
     */
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    /**
     * Check if an unthentication error occured and log out
     */
    if (response.data.message.includes("Token Error")) {
      return router.push("/login");
    }
    return response;
  },
  function(error) {
    if (error.response.status == 401) {
      return router.push("/login");
    }
    return Promise.reject(error);
  }
);
export default router;
