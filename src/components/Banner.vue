<template>
  <div>
    <h1>Space Traders</h1>
    <nav v-if="user" class="nav">
      <router-link to="/">User</router-link>
      <router-link to="/loans">Loans</router-link>
      <router-link to="/ships">Ships</router-link>
      <router-link to="/market">Marketplace</router-link>
      <router-link to="/map">Map</router-link>
      <router-link @click="handleLogout" to="/Login">Log Out</router-link>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useUser from "../Auth";
export default defineComponent({
  setup() {
    const { logout, getUserInfo, user } = useUser();
    const handleLogout = () => {
      logout();
    };
    getUserInfo();
    return { user, handleLogout };
  }
});
</script>

<style scoped>
div {
  width: 100%;
  background: black;
  display: flex;
  align-items: center;
}
h1 {
  color: white;
  padding: 10px;
  flex-grow: 0;
}
nav {
  flex-grow: 1;
  margin-right: 30px;
  display: flex;
  align-items: center;
}
nav a {
  text-decoration: none;
  margin-left: 10px;
}
a:nth-last-child(2) {
  flex-grow: 1;
}
a:last-child {
  background: red;
  padding: 5px;
  border-radius: 5px;
}
</style>
