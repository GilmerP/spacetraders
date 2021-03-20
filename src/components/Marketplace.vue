<template>
  <div class="container">
    <div class="searchbar">
      <h2>{{ `Market for: Ship ${ships.indexOf(selectedShip) + 1}` }}</h2>
    </div>
    <item-card
      v-for="(good, index) in marketplace"
      :key="index"
      :header="good.symbol"
      :iconName="getIconForGood(good.symbol)"
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
import { fetchUserShips, getMarketplace } from "../api";
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

    const getIconForGood = (goodName: string) => {
      switch (goodName.toUpperCase()) {
        case "research".toUpperCase():
          return "search";
        case "workers".toUpperCase():
          return "wrench";
        case "chemicals".toUpperCase():
          return "bong";
        case "ship_plating".toUpperCase():
          return "shield-alt";
        case "metals".toUpperCase():
          return "industry";
        case "fuel".toUpperCase():
          return "burn";
        case "machinery".toUpperCase():
          return "cogs";
        case "ship_parts".toUpperCase():
          return "box-open";
        default:
          return "";
      }
    };
    onMounted(() => {
      fetchUserShips().then(data => {
        ships.value = data.ships;
        selectedShip.value = data.ships[0];
        getMarketplace(selectedShip.value.location).then(data => {
          if (data.error) {
            //TODO: error handling
          } else {
            marketplace.value = data.location.marketplace;
          }
        });
      });
    });
    return { ships, selectedShip, marketplace, getIconForGood };
  }
});
</script>

<style scoped>
.searchbar {
  width: 100%;
  text-align: center;
}
</style>
