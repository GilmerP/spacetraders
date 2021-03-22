import { ref, watch } from "vue";

const user = ref(localStorage.getItem("username") as string);
const token = ref(localStorage.getItem("token") as string);

export default function useUser() {
  //Watchers constantly track changes and update the local storage
  watch(user, user => {
    if (user) {
      localStorage.setItem("username", user);
    } else {
      localStorage.removeItem("username");
    }
  });
  watch(token, token => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  });

  const login = (username: string, usertoken: string) => {
    user.value = username;
    token.value = usertoken;
  };

  const logout = () => {
    user.value = "";
    token.value = "";
  };

  return {
    user,
    token,
    login,
    logout
  };
}
