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

    const handleUserChange = (username: string) => {
      user.value = username;
    };

    return { user, handleUserChange };
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
</style>
