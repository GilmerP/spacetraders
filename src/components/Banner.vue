<template>
  <div class="banner" v-if="!isLogin">
    <h2 class="bar--item">
      {{ store.state.player.username?.toUpperCase() }}
    </h2>
    <h3 class="bar--item">
      <fa-icon class="fa-icon" style="color: #ff4400;" icon="coins" />
      {{ Number(store.state.player.credits)?.toLocaleString() }}
    </h3>
    <h3 class="bar--item">
      <fa-icon class="fa-icon" style="color: #ff4400;" icon="rocket" />
      {{ store.state.player.ships?.length }}
    </h3>
  </div>
  <div class="banner" v-else>
    <h3 class="bar--item">
      START YOUR JOURNEY TODAY
    </h3>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { store } from "@/store/index";
import router from "@/router";

export default defineComponent({
  setup() {
    const isLogin = computed(() => router.currentRoute.value.name?.toString().toLowerCase() === "login");
    return { store, isLogin };
  }
});
</script>

<style>
.banner {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
}

.bar--item:not(:last-child) {
  margin-right: 100px;
}
</style>
