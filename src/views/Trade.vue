<template>
  <div v-if="marketplace && selectedShip" class="container">
    <div>
      <h2>Marketplace</h2>
      <Good :type="'buy'" v-for="(good, index) in marketplace" :key="index" :good="good" @buyGood="buy"></Good>
    </div>
    <div>
      <h2>Cargo</h2>
      <Good :type="'sell'" v-for="(good, index) in sortedCargo" :key="index" :good="good" @sellGood="sell"></Good>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { store } from "../store/index";
import { getMarketplace, sellGood, placeOrder } from "../ts/api";
import router from "../router/index";
import Ship from "../interfaces/Ship";
import Good from "@/components/Good.vue";

function getShipFromParamId(): Ship | undefined {
  const paramShipId = router.currentRoute.value.params.shipId;
  return store.state.userShips?.find(x => x.id === paramShipId);
}

export default defineComponent({
  components: { Good },
  methods: {
    buy: async function(goodName: string, quantity: number) {
      if (this.selectedShip && goodName && quantity) {
        try {
          await placeOrder(this.selectedShip.id, goodName, quantity);
          store.update();
        } catch (error) {
          alert(error);
        }
      }
    },
    sell: async function(goodName: string, quantity: number) {
      if (this.selectedShip && goodName && quantity) {
        try {
          await sellGood(this.selectedShip.id, goodName, quantity);
          store.update();
        } catch (error) {
          alert(error);
        }
      }
    }
  },
  setup() {
    const selectedShip = computed(getShipFromParamId);
    const sortedCargo = computed(() => selectedShip.value?.cargo?.sort((a, b) => (a.good < b.good ? -1 : 1)));
    const marketplace = ref();
    async function setMarketplace() {
      if (!selectedShip?.value) return;
      const marketData = await getMarketplace(selectedShip.value?.location);
      marketplace.value = marketData.sort((a, b) => (a.symbol < b.symbol ? -1 : 1));
    }

    watch(selectedShip, async () => {
      setMarketplace();
    });

    onMounted(() => setMarketplace());
    return { selectedShip, marketplace, sortedCargo };
  }
});
</script>

<style scoped>
.container {
  grid-template-rows: 1fr;
}
</style>
