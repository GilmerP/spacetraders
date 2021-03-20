<template>
  <div class="good-wrapper">
    <item-card
      :header="good.symbol"
      :iconName="getIconForGood(good.symbol)"
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
      <input v-model.number="quantityToBuy" type="number" step="1" />
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

export default defineComponent({
  components: { ItemCard, Message },
  props: {
    good: Object,
    shipID: String
  },
  setup(props) {
    const popUp = ref(new PopUp());
    const handleClose = () => {
      popUp.value.isVisible = false;
    };
    const quantityToBuy = ref(10);
    const handleBuy = () => {
      if (props.shipID && props.good) {
        placeOrder(props.shipID, props.good.symbol, quantityToBuy.value).then(
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
            }
          }
        );
      }
    };

    const getIconForGood = (goodName: string) => {
      switch (goodName.toUpperCase()) {
        case "research".toUpperCase():
          return "search";
        case "workers".toUpperCase():
          return "wrench";
        case "chemicals".toUpperCase():
          return "bong";
        case "ship_plating".toUpperCase():
          return "shield-alt";
        case "metals".toUpperCase():
          return "industry";
        case "fuel".toUpperCase():
          return "burn";
        case "machinery".toUpperCase():
          return "cogs";
        case "ship_parts".toUpperCase():
          return "box-open";
        default:
          return "";
      }
    };

    return { getIconForGood, quantityToBuy, handleBuy, popUp, handleClose };
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
