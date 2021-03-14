<template>
  <div class="container">
    <div class="searchbar">
      <h2>{{ `Market for: Ship ${ships.indexOf(selectedShip) + 1}` }}</h2>
    </div>
    <item-card
      v-for="(good, index) in marketplace"
      :key="index"
      :header="good.symbol"
      :content="[
        {
          name: 'price/unit',
          value: Number(good.pricePerUnit).toLocaleString()
        },
        {
          name: 'quantity available',
          value: Number(good.quantityAvailable).toLocaleString()
        },
        {
          name: 'volume/unit',
          value: Number(good.volumePerUnit).toLocaleString()
        }
      ]"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { fetchUserShips } from "../api";
import ItemCard from "./ItemCard.vue";

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
}

export default defineComponent({
  components: { ItemCard },
  setup() {
    const ships = ref([]);
    const selectedShip = ref({} as Ship);
    const marketplace = ref([]);
    const getMarketplace = async () => {
      return await fetch(
        `https://api.spacetraders.io/game/locations/${selectedShip.value.location}/marketplace`,
        {
          headers: {
            Authorization: `Bearer ${process.env.VUE_APP_TOKEN}`
          }
        }
      ).then(res => res.json());
    };
    onMounted(() => {
      fetchUserShips().then(data => {
        ships.value = data.ships;
        selectedShip.value = data.ships[0];
        console.log(data.ships[0]);

        getMarketplace().then(data => {
          if (data.error) {
            //error handling
          } else {
            marketplace.value = data.planet.marketplace;
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
