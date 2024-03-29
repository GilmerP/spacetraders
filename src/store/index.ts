import { reactive } from "vue";
import { fetchUserShips, getUser } from "@/ts/api";
import user from "../interfaces/User";
import Ship from "@/interfaces/Ship";

export const store = {
  state: reactive({
    player: {} as user,
    userShips: [] as Array<Ship>,
    username: "",
    token: ""
  }),

  async init(username?: string, token?: string) {
    if (username && token) {
      localStorage.setItem("username", username);
      localStorage.setItem("token", token);
    }
    this.state.username = localStorage.getItem("username") as string;
    this.state.token = localStorage.getItem("token") as string;
    await this.update();
  },

  setPlayer(playerObject: user) {
    this.state.player = playerObject;
  },

  clearPlayer() {
    this.state.player = {} as user;
    localStorage.removeItem("username");
    localStorage.removeItem("token");
  },

  async update() {
    this.state.player = await getUser();
    this.state.userShips = await fetchUserShips();
  }
};
