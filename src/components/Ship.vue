<template>
  <item-card
    :content="[
      { name: 'Class: ', value: ship.class },
      { name: 'Cargo: ', value: ship.maxCargo },
      { name: 'Speed: ', value: ship.speed },
      { name: 'Weapons: ', value: ship.weapons },
      { name: 'Manufacturer: ', value: ship.manufacturer },
      {
        name: 'Price: ',
        value: Number(ship.purchaseLocations[0].price).toLocaleString()
      },
      { name: 'Location: ', value: ship.purchaseLocations[0].location }
    ]"
    :buttons="ship.buttons"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ItemCard from "./ItemCard.vue";

export default defineComponent({
  components: { ItemCard },
  props: {
    ship: Object,
    buyShip: Function
  },
  setup() {
    return {};
  }
});
</script>

<style scoped></style>
