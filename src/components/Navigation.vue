<template>
  <nav>
    <ul>
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
  margin: 0 50px;
  align-items: center;
}

nav a {
  text-decoration: none;
  display: inline-block;
  margin-bottom: 50px;
}

ul {
  padding: 0;
  list-style-type: none;
}
</style>
