<template>
  <Banner :user="user" />
  <router-view v-if="user" />
  <router-view v-else @user-change="handleUserChange" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useUser from "./Auth";
import Banner from "./components/Banner.vue";

export default defineComponent({
  components: { Banner },
  setup() {
    const { user } = useUser();
    return { user };
  }
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
.item-card {
  background: #969696;
  padding: 10px;
  margin: 10px;
  box-sizing: border-box;
  min-height: 150px;
  min-width: 300px;
  border-radius: 10px;
}
.item-card_header {
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid white;
}
.item-card_header_icon {
  font-size: 2em;
  margin-left: auto;
}
.item-card_details {
  width: 100%;
}
.item-card input[type="button"] {
  background: black;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  min-width: 100px;
}
.item-card input:hover {
  opacity: 0.8;
}
</style>
