<template>
  <div v-if="marketplace.length" class="container">
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
  <div class="container" v-else-if="loading">
    <h1>Loading...</h1>
  </div>
  <div class="container" v-else>
    <h1 style="text-align: center">
      Could not get Marketplace data. <br />
      Make sure you have a ship that is not travelling right now...
    </h1>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { fetchUserShips, getMarketplace, placeOrder, sellGood } from "../api";
import useMessage from "../Message";
import BuyGood from "../components/BuyGood.vue";
import SellGood from "../components/SellGood.vue";
import Good from "@/interfaces/Good";
import Order from "@/interfaces/Order";
import Ship from "@/interfaces/Ship";

export default defineComponent({
  components: { BuyGood, SellGood },
  setup() {
    const loading = ref<boolean>(true);
    const ships = ref<Array<Ship>>([]);
    const selectedShip = ref<Ship>();
    const cargo = computed(() => selectedShip.value?.cargo);
    const marketplace = ref<Array<Good>>([]);

    const { messageText, messageVisible } = useMessage();

    const assignUserShips = async () => {
      try {
        ships.value = await fetchUserShips();
        selectedShip.value = ships.value[0];
      } catch (error) {
        messageText.value = error;
        messageVisible.value = true;
      } finally {
        loading.value = false;
      }
    };

    const assignMarketplace = async () => {
      if (selectedShip.value && selectedShip.value.location) {
        try {
          const response = await getMarketplace(selectedShip.value.location);
          marketplace.value = response.sort(
            (x: Good, y: Good) => x.pricePerUnit - y.pricePerUnit
          );
        } catch (error) {
          messageText.value = error;
          messageVisible.value = true;
        }
      } else {
        marketplace.value = [];
      }
    };

    const handleChange = () => {
      assignUserShips();
      assignMarketplace();
    };

    const handleBuy = async (goodToPurchase: Order) => {
      if (selectedShip.value && goodToPurchase) {
        try {
          const thisOrder = await placeOrder(
            selectedShip.value.id,
            goodToPurchase.good,
            goodToPurchase.quantity
          );
          const quantity = thisOrder.quantity;
          const good = thisOrder.good;
          const pricePerUnit = thisOrder.pricePerUnit;
          const message = `You purchased ${quantity} ${good} for ${Number(
            pricePerUnit
          ) * Number(quantity)} credits`;
          messageText.value = message;
          messageVisible.value = true;
        } catch (error) {
          messageText.value = error;
          messageVisible.value = true;
        }
      }
    };

    const handleSell = async (goodToSell: Order) => {
      if (selectedShip.value && goodToSell) {
        try {
          const response = await sellGood(
            selectedShip.value.id,
            goodToSell.good,
            goodToSell.quantity
          );
          const quantity = response.quantity;
          const good = response.good;
          const total = response.total;
          const message = `You sold ${quantity} ${good} and made ${total} credits`;
          messageText.value = message;
          messageVisible.value = true;
          handleChange();
        } catch (error) {
          messageText.value = error;
          messageVisible.value = true;
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
      handleBuy,
      cargo,
      handleSell,
      loading
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
