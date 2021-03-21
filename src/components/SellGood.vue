<template>
  <div class="good-wrapper">
    <item-card
      :header="good.good"
      :iconName="getIconForGood(good.good || '')"
      :content="[
        {
          name: 'quantity',
          value: Number(good.quantity).toLocaleString()
        },
        {
          name: 'total volume',
          value: Number(good.totalVolume).toLocaleString()
        }
      ]"
    />
    <div class="action-wrapper">
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
import { defineComponent, ref } from "vue";
import ItemCard from "./ItemCard.vue";
import { sellGood } from "../api";
import Message from "./Message.vue";
import { PopUp } from "@/classes";
import Common from "@/common";

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

    const handleSell = () => {
      if (props.shipID && props.good) {
        sellGood(props.shipID, props.good.good, quantity.value).then(data => {
          if (data.error) {
            popUp.value = new PopUp(data.error.message, "Error", true);
          } else {
            const quantity = data.order.quantity;
            const good = data.order.good;
            const total = data.order.total;
            const message = `You sold ${quantity} ${good} and made ${total} credits`;
            popUp.value = new PopUp(message, "Ching-Ching", true);
            props.change();
          }
        });
      }
    };

    const getIconForGood = Common.getIconForGood;

    return {
      getIconForGood,
      quantity,
      popUp,
      handleClose,
      handleSell
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
