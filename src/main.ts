import { createApp } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUserAstronaut,
  faCoins,
  faFighterJet,
  faRocket,
  faSpaceShuttle,
  faSearch,
  faWrench,
  faBong,
  faBurn,
  faIndustry,
  faBoxOpen,
  faShieldAlt,
  faCogs,
  faBolt,
  faTshirt,
  faHamburger,
  faTags
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import useUser from "./Auth";
import App from "./App.vue";
import router from "./router/index";

library.add(
  faUserAstronaut,
  faCoins,
  faFighterJet,
  faRocket,
  faSpaceShuttle,
  faSearch,
  faWrench,
  faBong,
  faBurn,
  faIndustry,
  faBoxOpen,
  faShieldAlt,
  faCogs,
  faBolt,
  faTshirt,
  faHamburger,
  faTags
);

router.beforeEach((to, from, next) => {
  const { user } = useUser();
  if (to.name !== "Login" && to.name !== "Signup" && !user.value)
    next({ name: "Login" });
  else next();
});

createApp(App)
  .use(router)
  .component("fa-icon", FontAwesomeIcon)
  .mount("#app");
