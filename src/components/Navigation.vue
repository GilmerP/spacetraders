<template>
  <nav>
    <ul>
      <li>
        <h2 class="primary-color bar--item heading">SPACE TRADERS</h2>
      </li>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/Ships">Ships</router-link></li>
      <li><router-link to="/Map">Map</router-link></li>
      <li><router-link to="/Login">Logout</router-link></li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  }
});
</script>

<style scoped>
nav {
  padding: 20px;
  grid-row: 1/3;
}

nav a,
h2 {
  text-decoration: none;
  display: inline-block;
  margin-bottom: 50px;
}

ul {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0;
  list-style-type: none;
}

li:nth-last-child(2) {
  flex-grow: 1;
}

li:last-child a:hover {
  color: red;
}

@media only screen and (max-width: 600px) {
  nav {
    display: none;
  }
}
</style>
