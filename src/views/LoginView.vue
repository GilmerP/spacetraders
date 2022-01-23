<template>
  <div class="center-container">
    <form class="item-card" @submit="onSubmit" name="loginForm">
      <h2>{{ isLogin ? "Login" : "Sign up" }}</h2>
      <label for="username">Username:</label>
      <input v-model="username" type="text" name="username" id="username" required />
      <label v-if="isLogin" for="token">Token: </label>
      <input v-if="isLogin" v-model="token" type="text" name="token" id="token" required />
      <button>{{ isLogin ? "Log in" : "Sign up" }}</button>
      <span v-if="isLogin">Need an account? <a href="#" @click="() => (isLogin = !isLogin)">Sign up</a></span>
      <span v-else>Already have an account? <a href="#" @click="() => (isLogin = !isLogin)">Log in</a></span>
    </form>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import { store } from "@/store";
import { createNewUser } from "@/ts/api";
import { defineComponent, ref } from "vue";
import useMessage from "../ts/Message";

export default defineComponent({
  setup() {
    const username = ref("");
    const token = ref("");
    const isLogin = ref(true);
    const { messageText } = useMessage();

    async function onSubmit(event: Event) {
      event.preventDefault();
      try {
        if (!isLogin.value) token.value = await createNewUser(username.value);
        await store.init(username.value, token.value);
      } catch (error) {
        messageText.value = error as string;
        return;
      }
      router.push("/");
    }
    return { onSubmit, username, token, isLogin };
  }
});
</script>

<style>
.center-container {
  display: grid;
  place-items: center;
}
form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 10px;
  width: fit-content;
  color: white;
}

form h2 {
  grid-column: 1/3;
  text-align: center;
  margin-bottom: 30px;
}

input {
  max-width: 400px;
}

button {
  grid-column: 1/3;
}

form span {
  font-size: 12px;
  margin-top: 20px;
  grid-column: 1/3;
  text-align: center;
}
</style>
