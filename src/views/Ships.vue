<template>
  <div v-if="ships" class="container">
    <TheShip @buyShip="handleBuyShip" v-for="(ship, index) in ships" :key="index" :ship="ship" />
  </div>
  <div class="container" v-else>
    <h1>Loading...</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { fetchShips, buyShip } from "../api";
import useMessage from "../Message";
import Ship from "../interfaces/Ship";
import TheShip from "../components/TheShip.vue";

export default defineComponent({
  components: { TheShip },
  setup() {
    const ships = ref<Array<Ship>>();

    const { messageText, messageVisible } = useMessage();

    const handleBuyShip = async (location: string, type: string) => {
      console.log({ location, type });
      try {
        await buyShip(location, type);
        (messageText.value = "You just bought a spaceship"), (messageVisible.value = true);
      } catch (error) {
        (messageText.value = (error as Error).message), (messageVisible.value = true);
      }
    };

    onMounted(async () => {
      try {
        const fetchedData = await fetchShips();
        ships.value = fetchedData;
      } catch (error) {
        console.log((error as Error).message);
      }
    });

    return { ships, handleBuyShip };
  }
});
</script>

<style scoped></style>
