<template>
  <div class="item-card">
    <div class="item-card--header">
      <h4>{{ good.symbol }}</h4>
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
      <input type="button" value="Buy" @click="buy" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Good from "@/interfaces/Good";

export default defineComponent({
  emits: ["buyGood"],
  props: {
    good: { type: Object as PropType<Good>, required: true }
  },

  methods: {
    buy: function() {
      console.log("emit");
      this.$emit("buyGood", this.$props.good.symbol, this.$data.quantity);
    }
  },

  data() {
    return {
      quantity: 10
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
