import { createRouter, createWebHistory, Router } from "vue-router";
import User from "../components/User.vue";
import Loans from "../components/Loans.vue";
import Ships from "../components/Ships.vue";
import Marketplace from "../components/Marketplace.vue";
import Login from "../components/Login.vue";
import Signup from "../components/Signup.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: User
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup
  },
  {
    path: "/loans",
    name: "Loans",
    component: Loans
  },
  {
    path: "/ships",
    name: "Ships",
    component: Ships
  },
  {
    path: "/market",
    name: "Marketplace",
    component: Marketplace
  }
];

const router: Router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
