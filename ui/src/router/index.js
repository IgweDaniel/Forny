import Vue from "vue";
import VueRouter from "vue-router";
import { Home, Login, Register, Form, Account, Plans } from "../views";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  { path: "/form/:id", name: "Form", component: Form },
  {
    path: "/account",
    name: "Account",
    component: Account,
  },
  {
    path: "/plans",
    name: "Plans",
    component: Plans,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
