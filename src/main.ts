import { createApp } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCoins, faRocket, faBoxOpen, faShieldAlt, faTachometerAlt, faBomb } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import App from "./App.vue";
import router from "./router/index";

library.add(faCoins, faRocket, faBoxOpen, faShieldAlt, faTachometerAlt, faBomb);

createApp(App)
  .use(router)
  .component("fa-icon", FontAwesomeIcon)
  .mount("#app");
