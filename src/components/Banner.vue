<template>
  <div>
    <h2 class="primary-color bar--item">SPACE TRADERS</h2>
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
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { store } from "@/store/index";

export default defineComponent({
  setup() {
    return { store };
  }
});
</script>

<style scoped>
div {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 50px;
  grid-column: 1/4;
}

.bar--item:not(:last-child) {
  margin-right: 100px;
}
</style>
