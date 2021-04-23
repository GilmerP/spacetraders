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
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from "vue";
import Common from "../common";
import Good from "@/interfaces/Good";

export default defineComponent({
  props: {
    good: { type: Object as PropType<Good>, required: true }
  },

  emits: ["buyGood"],

  setup(props, { emit }) {
    const quantity = ref(10);

    const handleBuy = () => {
      emit("buyGood", { good: props.good.symbol, quantity: quantity.value });
    };

    const icon = Common.getIconForGood(props.good.symbol);
    return {
      icon,
      quantity,
      handleBuy
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
input[type="button"] {
  background: green;
}
</style>
