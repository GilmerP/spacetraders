<template>
  <div class="container" v-cloak>
    <div v-if="marketplace">
      <h2>Marketplace</h2>
      <buy-good
        v-for="(good, index) in marketplace"
        :key="index"
        :good="good"
        @buyGood="handleBuy"
      ></buy-good>
    </div>
    <div v-if="selectedShip">
      <h2>Cargo</h2>
      <sell-good
        v-for="(good, index) in selectedShip.cargo"
        :key="index"
        :good="good"
        @sellGood="handleSell"
      ></sell-good>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { store } from "../store/index";
import { getMarketplace, sellGood, placeOrder } from "../api";
import router from "../router/index";
import Ship from "../interfaces/Ship";
import BuyGood from "@/components/BuyGood.vue";
import SellGood from "@/components/SellGood.vue";
import Order from "@/interfaces/Order";

function getShipFromParamId(): Ship | undefined {
  const paramShipId = router.currentRoute.value.params.shipId;
  const ships = store.state.player.ships;
  return ships?.find(x => x.id === paramShipId);
}

export default defineComponent({
  components: { BuyGood, SellGood },
  setup() {
    const selectedShip = computed(() => {
      return getShipFromParamId();
    });

    const marketplace = ref();
    async function setMarketplace() {
      if (selectedShip?.value)
        marketplace.value = await getMarketplace(selectedShip.value?.location);
    }

    const handleBuy = async (goodToPurchase: Order) => {
      if (selectedShip.value && goodToPurchase) {
        try {
          await placeOrder(
            selectedShip.value.id,
            goodToPurchase.good,
            goodToPurchase.quantity
          );
          store.update();
        } catch (error) {
          alert(error);
        }
      }
    };

    const handleSell = async (goodToSell: Order) => {
      if (selectedShip.value && goodToSell) {
        try {
          await sellGood(
            selectedShip.value.id,
            goodToSell.good,
            goodToSell.quantity
          );
          store.update();
        } catch (error) {
          alert(error);
        }
      }
    };

    watch(selectedShip, async () => {
      setMarketplace();
    });
    return { selectedShip, marketplace, setMarketplace, handleBuy, handleSell };
  },
  async mounted() {
    this.setMarketplace();
  }
});
</script>

<style scoped>
.container {
  grid-template-rows: 1fr;
}
</style>
