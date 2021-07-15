<template>
  <div class="container" v-if="loading">
    <h1>Loading...</h1>
  </div>
  <div class="container" v-else-if="flights.length"></div>
  <div class="container" v-else>
    <h1>No flights for your System found</h1>
  </div>
</template>

<script lang="ts">
import { getFlightsForSystem } from "@/api";
import FlightPlan from "@/interfaces/FlightPlan";
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  components: {},
  setup() {
    const flights = ref<Array<FlightPlan>>([]);
    const loading = ref<boolean>(true);

    onMounted(async () => {
      try {
        flights.value = await getFlightsForSystem("OE");
      } catch (error) {
        console.log(error);
      } finally {
        loading.value = false;
      }
    });
    return { flights, loading };
  }
});
</script>

<style scoped></style>
