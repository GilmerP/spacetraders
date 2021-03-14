<template>
  <Banner />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Banner from "./components/Banner.vue";

export default defineComponent({
  components: { Banner }
});
</script>

<style>
* {
  margin: 0;
  color: white;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
#app {
  min-height: 100vh;
  background: rgb(31, 31, 31);
}
.container {
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
}
</style>
