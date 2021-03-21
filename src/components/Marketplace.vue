<template>
  <div v-if="marketplace.length > 0" class="container">
    <div class="searchbar">
      <h2>{{ `Market for: Ship ${ships.indexOf(selectedShip) + 1}` }}</h2>
    </div>
    <buyGood
      v-for="(good, index) in marketplace"
      :key="index"
      :good="good"
      :shipID="selectedShip.id"
    />
    <div class="searchbar">
      <h2>SELL</h2>
    </div>
    <sell-good
      v-for="(good, index) in selectedShip.cargo"
      :key="index"
      :good="good"
      :shipID="selectedShip.id"
    />
  </div>
  <div class="container" v-else>
    <h1>Loading...</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { fetchUserShips, getMarketplace } from "../api";
import BuyGood from "./BuyGood.vue";
import SellGood from "./SellGood.vue";

interface PurchaseLocations {
  location: string;
  price: number;
}

interface Ship {
  class: string;
  manufacturer: string;
  maxCargo: number;
  type: string;
  location: string;
  purchaseLocations: PurchaseLocations[];
  id: string;
  cargo: [];
}

export default defineComponent({
  components: { BuyGood, SellGood },
  setup() {
    const ships = ref([]);
    const selectedShip = ref({} as Ship);
    const marketplace = ref([]);

    onMounted(() => {
      fetchUserShips().then(data => {
        ships.value = data.ships;
        selectedShip.value = data.ships[0];
        console.log(selectedShip.value);

        getMarketplace(selectedShip.value.location).then(data => {
          if (data.error) {
            //TODO: error handling
          } else {
            marketplace.value = data.location.marketplace;
          }
        });
      });
    });
    return { ships, selectedShip, marketplace };
  }
});
</script>

<style scoped>
.searchbar {
  width: 100%;
  text-align: center;
}
</style>
