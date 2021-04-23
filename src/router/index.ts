import { createRouter, createWebHistory, Router } from "vue-router";
import User from "../views/User.vue";
import Loans from "../views/Loans.vue";
import Ships from "../views/Ships.vue";
import Marketplace from "../views/Marketplace.vue";
import Map from "../views/Map.vue";
import Flights from "../views/Flights.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";

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
  },
  {
    path: "/map",
    name: "Map",
    component: Map
  },
  {
    path: "/flights",
    name: "Flights",
    component: Flights
  }
];

const router: Router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
