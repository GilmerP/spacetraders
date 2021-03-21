<template>
  <div v-if="ships.length > 0" class="container">
    <div class="searchbar">
      <h2>{{ "Market for: " }}</h2>
      <select v-model="selectedShip">
        <option v-for="(ship, index) in ships" :key="index" :value="ship">{{
          (ship.location || "travelling") + ` (Ship ${index + 1})`
        }}</option>
      </select>
    </div>
    <buyGood
      v-for="(good, index) in marketplace"
      :key="index"
      :good="good"
      :shipID="selectedShip.id"
      :change="handleChange"
    />
    <div class="searchbar">
      <h2>Inventory</h2>
    </div>
    <sell-good
      v-for="(good, index) in selectedShip.cargo"
      :key="index"
      :good="good"
      :shipID="selectedShip.id"
      :change="handleChange"
    />
  </div>
  <div class="container" v-else>
    <h1>Loading...</h1>
  </div>
  <message
    :handleClose="handleClose"
    :isVisible="popUp.isVisible"
    :msg="popUp.message"
    :title="popUp.title"
  />
</template>

<script lang="ts">
import { PopUp } from "@/classes";
import { defineComponent, onMounted, ref, watch } from "vue";
import { fetchUserShips, getMarketplace } from "../api";
import BuyGood from "./BuyGood.vue";
import SellGood from "./SellGood.vue";
import Message from "./Message.vue";
import { MarketplaceGood } from "@/interfaces";

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
  components: { BuyGood, SellGood, Message },
  setup() {
    const ships = ref([]);
    const selectedShip = ref({} as Ship);
    const marketplace = ref([]);
    const popUp = ref(new PopUp());

    const handleClose = () => {
      popUp.value.isVisible = false;
    };

    const assignUserShips = () => {
      fetchUserShips().then(data => {
        ships.value = data.ships;
        selectedShip.value = selectedShip.value.id
          ? selectedShip.value
          : ships.value[0];
      });
    };

    const assignMarketplace = () => {
      if (selectedShip.value.location) {
        getMarketplace(selectedShip.value.location).then(data => {
          if (data.error) {
            popUp.value = new PopUp(data.error.message, "Error", true);
            marketplace.value = [];
          } else {
            marketplace.value = data.location.marketplace.sort(
              (x: MarketplaceGood, y: MarketplaceGood) => {
                return x.pricePerUnit - y.pricePerUnit;
              }
            );
          }
        });
      } else {
        marketplace.value = [];
      }
    };

    const handleChange = () => {
      assignUserShips();
      assignMarketplace();
    };

    watch(selectedShip, () => {
      marketplace.value = [];
      assignMarketplace();
    });

    onMounted(() => {
      assignUserShips();
    });

    return {
      ships,
      selectedShip,
      marketplace,
      handleChange,
      popUp,
      handleClose
    };
  }
});
</script>

<style scoped>
.searchbar {
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
select,
option {
  color: black;
  margin-left: 15px;
}
</style>
