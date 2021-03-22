<template>
  <div class="item-card">
    <div class="item-card_header">
      <h2>{{ good.symbol }}</h2>
      <fa-icon class="item-card_header_icon" v-if="icon" :icon="icon" />
    </div>
    <table class="item-card_details">
      <tr>
        <td>Price/Unit:</td>
        <td>{{ good.pricePerUnit }}</td>
      </tr>
      <tr>
        <td>Volume/Unit:</td>
        <td>{{ good.volumePerUnit }}</td>
      </tr>
      <tr>
        <td>Quantity available:</td>
        <td>{{ Number(good.quantityAvailable).toLocaleString() }}</td>
      </tr>
    </table>

    <div class="purchase-container">
      <input v-model.number="quantity" type="number" step="1" />
      <input type="button" value="Buy" @click="handleBuy" />
    </div>
  </div>
  <message
    :isVisible="popUp.isVisible"
    :title="popUp.title"
    :msg="popUp.message"
    :handleClose="handleClose"
  />
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from "vue";
import Message from "./Message.vue";
import { PopUp } from "@/classes";
import Common from "../common";
import { MarketplaceGood } from "@/interfaces";

export default defineComponent({
  components: { Message },
  props: {
    good: { type: Object as PropType<MarketplaceGood>, required: true }
  },
  emits: ["buyGood"],
  setup(props, { emit }) {
    const popUp = ref(new PopUp());
    const handleClose = () => {
      popUp.value.isVisible = false;
    };
    const quantity = ref(10);

    const handleBuy = () => {
      emit("buyGood", { good: props.good.symbol, quantity: quantity.value });
    };

    const icon = Common.getIconForGood(props.good.symbol);
    return {
      icon,
      quantity,
      handleBuy,
      popUp,
      handleClose
    };
  }
});
</script>

<style scoped>
.purchase-container {
  display: flex;
  justify-content: space-evenly;
  margin: 5px 0;
  padding: 5px 0;
  border-top: 1px solid white;
}
</style>
