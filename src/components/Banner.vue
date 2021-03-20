<template>
  <div>
    <h1>Space Traders</h1>
    <div v-if="user" class="nav">
      <router-link to="/">User</router-link>
      <router-link to="/loans">Loans</router-link>
      <router-link to="/ships">Ships</router-link>
      <router-link to="/market">Marketplace</router-link>
      <router-link @click="handleLogout" to="/Login">Log Out</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getUserInfo, user, logout } from "../Auth";
export default defineComponent({
  setup() {
    const handleLogout = () => {
      logout();
    };
    getUserInfo();
    return { user, handleLogout };
  }
});
</script>

<style scoped>
div:not(.nav) {
  width: 100%;
  background: black;
  display: flex;
  align-items: center;
}
h1 {
  color: white;
  padding: 10px;
}
.nav a {
  text-decoration: none;
  margin-left: 10px;
}
</style>
