import { createApp } from "vue";
import { getAuthentication } from "./Auth";
import App from "./App.vue";
import router from "./router/index";

router.beforeEach((to, from, next) => {
  if (to.name !== "Login" && to.name !== "Signup" && !getAuthentication())
    next({ name: "Login" });
  // else if ((to.name == "Login" || to.name == "Signup") && getAuthentication) {
  //   next({ name: "Home" });
  else next();
});

createApp(App)
  .use(router)
  .mount("#app");
