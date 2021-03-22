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
  <message
    :isVisible="popUp.isVisible"
    :title="popUp.title"
    :msg="popUp.message"
    :handleClose="handleClose"
  />
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import Message from "./Message.vue";
import { PopUp } from "@/classes";
import Common from "@/common";
import { Cargo } from "@/interfaces";

export default defineComponent({
  components: { Message },
  emits: ["sellGood"],
  props: {
    good: { type: Object as PropType<Cargo>, required: true }
  },
  setup(props, { emit }) {
    const popUp = ref(new PopUp());
    const handleClose = () => {
      popUp.value.isVisible = false;
    };
    const quantity = ref(props.good.quantity);

    const handleSell = () => {
      emit("sellGood", { good: props.good?.good, quantity: quantity.value });
    };

    const icon = Common.getIconForGood(props.good.good);

    return {
      icon,
      quantity,
      popUp,
      handleClose,
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
</style>
