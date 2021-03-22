<template>
  <div class="container">
    <div class="form-wrapper">
      <label for="username">username:</label>
      <input type="text" name="username" id="username" v-model="name" />
      <label for="token">token:</label>
      <input type="text" name="token" id="token" v-model="token" />
      <input type="button" value="Log In" @click="handleLogin" />
      <span
        >Need an account? <router-link to="/signup">Sign up</router-link>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import { defineComponent, ref } from "vue";
import useUser from "../Auth";
const { login } = useUser();

const name = ref("");
const token = ref("");

export default defineComponent({
  setup() {
    const handleLogin = () => {
      login(name.value, token.value);
      router.push("/");
    };
    return { handleLogin, name, token };
  }
});
</script>

<style scoped>
.form-wrapper {
  display: flex;
  background: #969696;
  flex-direction: column;
  padding: 15px 30px;
}
input {
  margin-bottom: 10px;
  color: black;
}
span {
  margin-top: 20px;
  font-size: 10px;
  text-align: center;
}
</style>
