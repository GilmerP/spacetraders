import { createRouter, createWebHistory, Router } from "vue-router";
import Home from "../views/Home.vue";
import Ships from "../views/Ships.vue";
import Trade from "../views/Trade.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Map from "../views/Map.vue";

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
    path: "/signup",
    name: "Signup",
    component: Signup
  },
  {
    path: "/ships",
    name: "Ships",
    component: Ships
  },
  {
    path: "/trade/:shipId",
    name: "Trade",
    props: true,
    component: Trade
  },
  {
    path: "/map",
    name: "Map",
    component: Map
  }
];

const router: Router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
