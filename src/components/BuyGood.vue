<template>
  <div class="good-wrapper">
    <item-card
      :header="good.symbol"
      :iconName="getIconForGood(good.symbol || '')"
      :content="[
        {
          name: 'price/unit',
          value: Number(good.pricePerUnit).toLocaleString()
        },
        {
          name: 'quantity available',
          value: Number(good.quantityAvailable).toLocaleString()
        },
        {
          name: 'volume/unit',
          value: Number(good.volumePerUnit).toLocaleString()
        }
      ]"
    />
    <div class="action-wrapper">
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
import { defineComponent, ref } from "vue";
import ItemCard from "./ItemCard.vue";
import { placeOrder } from "../api";
import Message from "./Message.vue";
import { PopUp } from "@/classes";
import Common from "../common";

export default defineComponent({
  components: { ItemCard, Message },
  props: {
    good: Object,
    shipID: String,
    change: { type: Function, required: true }
  },
  setup(props) {
    const popUp = ref(new PopUp());
    const handleClose = () => {
      popUp.value.isVisible = false;
    };
    const quantity = ref(10);
    const handleBuy = () => {
      if (props.shipID && props.good) {
        placeOrder(props.shipID, props.good.symbol, quantity.value).then(
          data => {
            if (data.error) {
              popUp.value = new PopUp(data.error.message, "Error", true);
            } else {
              console.log(data.order);
              const quantity = data.order.quantity;
              const good = data.order.good;
              const pricePerUnit = data.order.pricePerUnit;
              const message = `You purchased ${quantity} ${good} for ${Number(
                pricePerUnit
              ) * Number(quantity)} credits`;
              popUp.value = new PopUp(message, "Ching-Ching", true);
              props.change();
            }
          }
        );
      }
    };

    const getIconForGood = Common.getIconForGood;
    return {
      getIconForGood,
      quantity,
      handleBuy,
      popUp,
      handleClose
    };
  }
});
</script>

<style scoped>
.good-wrapper {
  padding: 20px;
}
.action-wrapper {
  display: flex;
  justify-content: center;
}
input[type="button"] {
  position: relative;
  flex: 1;
}
input[type="button"]:hover {
  cursor: pointer;
  opacity: 0.8;
}
input {
  margin: 0 10px;
  background: #969696;
  border: none;
}
</style>
