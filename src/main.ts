import { createApp } from "vue";
import useUser from "./Auth";
import App from "./App.vue";
import router from "./router/index";

router.beforeEach((to, from, next) => {
  const { user } = useUser();
  if (to.name !== "Login" && to.name !== "Signup" && !user.value)
    next({ name: "Login" });
  else next();
});

createApp(App)
  .use(router)
  .mount("#app");
