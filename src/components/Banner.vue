<template>
  <div>
    <h1>Space Traders</h1>
    <div class="nav">
      <router-link to="/">User</router-link>
      <router-link to="/loans">Loans</router-link>
      <router-link to="/ships">Ships</router-link>
      <router-link to="/market">Marketplace</router-link>
    </div>
  </div>
</template>

<script lang="ts"></script>

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
