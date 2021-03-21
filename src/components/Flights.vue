<template>
  <div class="container">
    <item-card
      v-for="flight in flights"
      :key="flight.id"
      :header="`From ${flight.from} To ${flight.to}`"
      :content="[{ name: 'User', value: flight.username }]"
    />
  </div>
</template>

<script lang="ts">
import { getFlightsForSystem } from "@/api";
import { defineComponent, onMounted, ref } from "vue";
import ItemCard from "./ItemCard.vue";

export default defineComponent({
  components: { ItemCard },
  setup() {
    const flights = ref([]);
    onMounted(() => {
      getFlightsForSystem("OE").then(
        data => (flights.value = data.flightPlans)
      );
    });
    return { flights };
  }
});
</script>

<style scoped></style>
