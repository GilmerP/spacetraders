<template>
  <div v-if="marketplace && selectedShip" class="container">
    <div class="trade-column">
      <h3>Marketplace</h3>
      <Good :type="'buy'" v-for="(good, index) in marketplace" :key="index" :good="good" @buyGood="buy"></Good>
    </div>
    <div class="trade-column">
      <div class="flex-between">
        <h3>Cargo {{ usedCargoSpace + "/" + selectedShip.maxCargo }}</h3>
        <h3>Loading speed: {{ selectedShip.loadingSpeed }}</h3>
      </div>
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
import useMessage from "../ts/Message";

const { messageText } = useMessage();

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
          messageText.value = (error as Error).message;
        }
      }
    },
    sell: async function(goodName: string, quantity: number) {
      if (this.selectedShip && goodName && quantity) {
        try {
          await sellGood(this.selectedShip.id, goodName, quantity);
          store.update();
        } catch (error) {
          messageText.value = (error as Error).message;
        }
      }
    }
  },
  setup() {
    const selectedShip = computed(getShipFromParamId);
    const sortedCargo = computed(() => selectedShip.value?.cargo?.sort((a, b) => (a.good < b.good ? -1 : 1)));
    const usedCargoSpace = computed(() => {
      let used = 0;
      selectedShip.value?.cargo.forEach(item => {
        used += item.totalVolume;
      });
      return used;
    });
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
    return { selectedShip, marketplace, sortedCargo, usedCargoSpace };
  }
});
</script>

<style>
.trade-column {
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  align-items: flex-start;
}
.trade-column > *:first-child {
  width: 100%;
}
.trade-column > * {
  margin: 10px;
}
</style>
