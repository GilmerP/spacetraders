<template>
  <div class="item-card">
    <div class="item-card--header">
      <h4>{{ type === "buy" ? good.symbol : good.good }}</h4>
    </div>
    <table v-if="type === 'buy'" class="item-card_details">
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

    <table v-else class="item-card_details">
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
      <input v-model.number="quantity" type="number" step="1" @wheel="onScroll" />
      <button v-if="type === 'buy'" class="btn-buy" @click="buy">Buy</button>
      <button v-else class="btn-sell" @click="sell">Sell</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Good from "@/interfaces/Good";
import Cargo from "@/interfaces/Cargo";

export default defineComponent({
  emits: ["buyGood", "sellGood"],
  props: {
    good: { type: Object as PropType<Good | Cargo>, required: true },
    type: {
      validator: (value: string) => {
        return ["buy", "sell"].includes(value);
      }
    }
  },
  methods: {
    buy: function() {
      this.$emit("buyGood", (this.$props.good as Good).symbol, this.$data.quantity);
    },
    sell: function() {
      this.$emit("sellGood", (this.$props.good as Cargo).good, this.$data.quantity);
    },
    onScroll: function(event: WheelEvent) {
      if (event.target !== document.activeElement) return;
      event.preventDefault();
      if (event.deltaY > 0 && !(this.$data.quantity <= 0)) this.$data.quantity -= 1;
      if ((this.$props.good as Cargo).quantity) {
        if (event.deltaY < 0 && !((this.$props.good as Cargo).quantity <= this.$data.quantity))
          this.$data.quantity += 1;
      } else {
        if (event.deltaY < 0 && !((this.$props.good as Good).quantityAvailable <= this.$data.quantity))
          this.$data.quantity += 1;
      }
    }
  },

  data() {
    return {
      quantity: this.$props.type === "buy" ? 10 : (this.$props.good as Cargo).quantity
    };
  }
});
</script>

<style>
.purchase-container {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 10px 0;
  padding-top: 10px;
  border-top: 1px solid white;
}
.btn-buy {
  background: green;
  margin-top: 0;
}
.btn-buy:hover {
  background: hsl(120, 100%, 15%);
}
.btn-sell {
  margin-top: 0;
  background: red;
}
.btn-sell:hover {
  background: hsl(0, 100%, 30%);
}
input {
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 5px;
}
</style>
