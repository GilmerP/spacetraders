<template>
  <div class="item-card">
    <div class="item-card--header">
      <h4>{{ good.good }}</h4>
    </div>
    <table class="item-card_details">
      <tr>
        <td>Quantity:</td>
        <td>{{ good.quantity }}</td>
      </tr>
      <tr>
        <td>Total Volume:</td>
        <td>{{ good.totalVolume }}</td>
      </tr>
    </table>

    <div class="purchase-container">
      <input v-model.number="quantity" type="number" step="1" />
      <input type="button" value="Sell" @click="sell" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Cargo from "@/interfaces/Cargo";

export default defineComponent({
  emits: ["sellGood"],
  props: {
    good: { type: Object as PropType<Cargo>, required: true }
  },

  methods: {
    sell: function() {
      this.$emit("sellGood", this.$props.good.good, this.$data.quantity);
    }
  },

  data() {
    return {
      quantity: this.$props.good.quantity
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
