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
      @buyGood="handleBuy"
      :good="good"
    />
    <div class="searchbar">
      <h2>Inventory</h2>
    </div>
    <sell-good
      v-for="(good, index) in cargo"
      :key="index"
      :good="good"
      @sellGood="handleSell"
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
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { fetchUserShips, getMarketplace, placeOrder, sellGood } from "../api";
import BuyGood from "./BuyGood.vue";
import SellGood from "./SellGood.vue";
import Message from "./Message.vue";
import { MarketplaceGood, IShip, OrderedGood } from "@/interfaces";

export default defineComponent({
  components: { BuyGood, SellGood, Message },
  setup() {
    const ships = ref<Array<IShip>>([]);
    const selectedShip = ref<IShip>();
    const cargo = computed(() => selectedShip.value?.cargo);
    const marketplace = ref<Array<MarketplaceGood>>([]);
    const popUp = ref(new PopUp());

    const handleClose = () => {
      popUp.value.isVisible = false;
    };

    const assignUserShips = () => {
      fetchUserShips().then(data => {
        ships.value = data.ships;
        selectedShip.value = ships.value[0];
      });
    };

    const assignMarketplace = async () => {
      if (selectedShip.value && selectedShip.value.location) {
        const response = await getMarketplace(selectedShip.value.location);
        if (typeof response == "string") {
          popUp.value = new PopUp(response, "Error", true);
          marketplace.value = [];
        } else {
          //Sort Marketplace for lowest price
          marketplace.value = response.sort(
            (x: MarketplaceGood, y: MarketplaceGood) =>
              x.pricePerUnit - y.pricePerUnit
          );
        }
      } else {
        marketplace.value = [];
      }
    };

    const handleChange = () => {
      assignUserShips();
      assignMarketplace();
    };

    const handleBuy = async (good: OrderedGood) => {
      if (selectedShip.value && good) {
        const response = await placeOrder(
          selectedShip.value.id,
          good.good,
          good.quantity
        );
        if (typeof response == "string") {
          popUp.value = new PopUp(response, "Error", true);
        } else {
          const quantity = response.quantity;
          const good = response.good;
          const pricePerUnit = response.pricePerUnit;
          const message = `You purchased ${quantity} ${good} for ${Number(
            pricePerUnit
          ) * Number(quantity)} credits`;
          popUp.value = new PopUp(message, "Ching-Ching", true);
          handleChange();
        }
      }
    };

    const handleSell = async (goodToSell: OrderedGood) => {
      if (selectedShip.value && goodToSell) {
        const response = await sellGood(
          selectedShip.value.id,
          goodToSell.good,
          goodToSell.quantity
        );
        if (typeof response == "string") {
          popUp.value = new PopUp(response, "Error", true);
        } else {
          const quantity = response.quantity;
          const good = response.good;
          const total = response.total;
          const message = `You sold ${quantity} ${good} and made ${total} credits`;
          popUp.value = new PopUp(message, "Ching-Ching", true);
          handleChange();
        }
      }
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
      handleClose,
      handleBuy,
      cargo,
      handleSell
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
