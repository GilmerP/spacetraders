import { ref, watch } from "vue";

export default function useUser() {
  const user = ref(localStorage.getItem("username") as string);
  const token = ref(localStorage.getItem("token") as string);

  watch(user, user => localStorage.setItem("username", user));
  watch(token, token => localStorage.setItem("token", token));

  const getUserInfo = () => {
    user.value = localStorage.getItem("username") as string;
    token.value = localStorage.getItem("token") as string;
  };

  const getAuthentication = () => {
    if (user.value && token.value) return true;
    return false;
  };

  const login = (username: string, usertoken: string) => {
    localStorage.setItem("username", username);
    localStorage.setItem("token", usertoken);
    getUserInfo();
  };

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    user.value = "";
    token.value = "";
  };

  return { user, token, getUserInfo, getAuthentication, login, logout };
}
