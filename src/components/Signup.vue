<template>
  <div class="container">
    <div class="form-wrapper">
      <label for="username">username:</label>
      <input type="text" name="username" id="username" v-model="username" />
      <button @click="handleSignup">Sign Up</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { signup } from "../Auth";

export default defineComponent({
  setup() {
    const username = ref("");
    const handleSignup = () => {
      console.log("signup");

      signup(username.value);
    };

    return { username, handleSignup };
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
