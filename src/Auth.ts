import router from "./router/index";
import { createNewUser } from "./api";

let user: string | null = "";
let token: string | null = "";

const getUserInfo = () => {
  user = localStorage.getItem("username");
  token = localStorage.getItem("token");
};

const getAuthentication = () => {
  getUserInfo();
  if (user && token) return true;
  return false;
};

const login = (username: string, usertoken: string) => {
  localStorage.setItem("username", username);
  localStorage.setItem("token", usertoken);
  getUserInfo();
  router.push({ name: "Home" });
};

const logout = () => {
  localStorage.removeItem("username");
  localStorage.removeItem("token");
  user = "";
  token = "";
};

const signup = (username: string) => {
  createNewUser(username).then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      user = username;
      token = data.token as string;
      login(user, token);
    }
  });
};

export { user, token, getAuthentication, login, signup, getUserInfo, logout };
