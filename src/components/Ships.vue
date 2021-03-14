<template>
  <div v-if="ships.length > 0" class="container">
    <Ship v-for="(ship, index) in ships" :key="index" :ship="ship" />
  </div>
  <error :handleClose="handleClose" :isVisible="hasError" :msg="errorMessage" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { fetchShips } from "../api";
import Error from "./Error.vue";
import Ship from "./Ship.vue";

interface PurchaseLocations {
  location: string;
  price: number;
}

interface Ship {
  class: string;
  manufacturer: string;
  maxCargo: number;
  type: string;
  purchaseLocations: PurchaseLocations[];
}

export default defineComponent({
  components: { Ship, Error },
  setup() {
    const ships = ref([]);
    const buyShip = async (ship: Ship) => {
      if (ship) {
        return await fetch(`https://api.spacetraders.io/users/gilli/ships`, {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            Authorization: `Bearer ${process.env.VUE_APP_TOKEN}`,
            "Content-Type": "application/json;charset=UTF-8"
          },
          body: JSON.stringify({
            location: ship.purchaseLocations[0].location,
            type: ship.type
          })
        }).then(res => res.json());
      }
    };

    const hasError = ref(false);
    const errorMessage = ref("");
    const handleClose = () => {
      hasError.value = false;
    };

    onMounted(() => {
      fetchShips().then(data => {
        ships.value = data.ships.map((x: Ship) => {
          return {
            ...x,
            buttons: [
              {
                text: "Buy",
                action: () =>
                  buyShip(x).then(data => {
                    if (data.error) {
                      hasError.value = true;
                      errorMessage.value = data.error.message;
                    }
                  })
              }
            ]
          };
        });
      });
    });
    return { ships, buyShip, hasError, errorMessage, handleClose };
  }
});
</script>

<style scoped></style>
