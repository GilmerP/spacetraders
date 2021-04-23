<template>
  <div class="container">
    <item-card
      v-for="flight in flights"
      :key="flight.id"
      :header="`From ${flight.departure} To ${flight.destination}`"
      :content="[{ name: 'User', value: flight.username }]"
    />
  </div>
</template>

<script lang="ts">
import { getFlightsForSystem } from "@/api";
import FlightPlan from "@/interfaces/FlightPlan";
import { defineComponent, onMounted, ref } from "vue";
import ItemCard from "../components/ItemCard.vue";

export default defineComponent({
  components: { ItemCard },
  setup() {
    const flights = ref<Array<FlightPlan>>([]);
    onMounted(async () => {
      try {
        flights.value = await getFlightsForSystem("OE");
      } catch (error) {
        console.log(error);
      }
    });
    return { flights };
  }
});
</script>

<style scoped></style>
