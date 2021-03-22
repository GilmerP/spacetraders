<template>
  <div v-if="ships" class="container">
    <Ship
      @buyShip="handleBuyShip"
      v-for="(ship, index) in ships"
      :key="index"
      :ship="ship"
    />
  </div>
  <div class="container" v-else>
    <h1>Loading...</h1>
  </div>
  <message
    :handleClose="handleClose"
    :title="popUp.title"
    :msg="popUp.message"
    :isVisible="popUp.isVisible"
  />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { fetchShips, buyShip } from "../api";
import { IShip } from "../interfaces";
import { PopUp } from "../classes";
import Message from "./Message.vue";
import Ship from "./Ship.vue";

export default defineComponent({
  components: { Ship, Message },
  setup() {
    const ships = ref<Array<IShip>>();
    const popUp = ref(new PopUp("", "", false));

    const handleClose = () => {
      popUp.value.isVisible = false;
    };

    const handleBuyShip = async (shipToBuy: IShip) => {
      const response = await buyShip(shipToBuy);
      if (typeof response == "string") {
        popUp.value = new PopUp(response, "Error", true);
      } else {
        popUp.value = new PopUp(
          "You just bought a spaceship",
          "Congrats!",
          true
        );
      }
    };

    onMounted(async () => {
      const fetchedData = await fetchShips();
      if (typeof fetchedData != "string") {
        ships.value = fetchedData;
      }
    });
    return { ships, handleBuyShip, popUp, handleClose };
  }
});
</script>

<style scoped></style>
