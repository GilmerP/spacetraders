<template>
  <div class="item-card">
    <div class="item-card_header">
      <h2>{{ good.good }}</h2>
      <fa-icon class="item-card_header_icon" v-if="icon" :icon="icon" />
    </div>
    <table class="item-card_details">
      <tr>
        <td>Quantity</td>
        <td>{{ good.quantity }}</td>
      </tr>
      <tr>
        <td>Total Volume:</td>
        <td>{{ good.totalVolume }}</td>
      </tr>
    </table>

    <div class="purchase-container">
      <input v-model.number="quantity" type="number" step="1" />
      <input type="button" value="Sell" @click="handleSell" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import Common from "@/common";
import Cargo from "@/interfaces/Cargo";

export default defineComponent({
  emits: ["sellGood"],
  props: {
    good: { type: Object as PropType<Cargo>, required: true }
  },
  setup(props, { emit }) {
    const quantity = ref(props.good.quantity);

    const handleSell = () => {
      emit("sellGood", { good: props.good?.good, quantity: quantity.value });
    };

    const icon = Common.getIconForGood(props.good.good);

    return {
      icon,
      quantity,
      handleSell
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
  background: red;
}
</style>
