import { createRouter, createWebHistory, Router } from "vue-router";
import Home from "../views/Home.vue";
import Ships from "../views/Ships.vue";
import Trade from "../views/Trade.vue";
import Map from "../views/Map.vue";
import Login from "../views/Login.vue";
import { store } from "@/store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
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
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  }
];

const router: Router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  console.log({ to, from });
  const user = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  if (to.name?.toString().toLowerCase() !== "login") {
    if (!(user && token)) {
      next("/login");
      return;
    }
  } else {
    store.clearPlayer();
  }
  next();
});

export default router;
