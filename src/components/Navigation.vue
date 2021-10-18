<template>
  <nav>
    <ul>
      <li>
        <h2 class="primary-color bar--item">SPACE TRADERS</h2>
      </li>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="Ships">Ships</router-link></li>
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
  padding-top: 50px;
  grid-row: 1/3;
  margin: 0 50px;
  align-items: center;
}

nav a,
h2 {
  text-decoration: none;
  display: inline-block;
  margin-bottom: 50px;
}

ul {
  padding: 0;
  list-style-type: none;
}
</style>
