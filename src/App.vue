<template>
  <Banner :user="user" />
  <router-view v-if="user" />
  <router-view v-else @user-change="handleUserChange" />
  <Message />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useUser from "./Auth";
import Banner from "./components/Banner.vue";
import Message from "./components/Message.vue";

export default defineComponent({
  components: { Banner, Message },
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
  background: #111111;
}
.container {
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.flex-column {
  flex-direction: column;
}
.item-card {
  background: #111;
  padding: 10px;
  margin: 10px;
  box-sizing: border-box;
  min-height: 150px;
  min-width: 300px;
  border: 1px solid rgb(119, 119, 119);
  border-radius: 10px;
}
.item-card td:last-child {
  text-align: end;
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
.item-card button {
  background: black;
  border: white 1px solid;
  border-radius: 5px;
  padding: 10px 15px;
  min-width: 100px;
}
.item-card button:hover {
  opacity: 0.8;
  cursor: pointer;
}
.item-card input[type="number"] {
  box-sizing: border-box;
  background: black;
  border: none;
  border-radius: 5px;
  max-width: 100px;
  text-align: center;
}
</style>
