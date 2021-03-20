<template>
  <div v-if="ships.length > 0" class="container">
    <Ship v-for="(ship, index) in ships" :key="index" :ship="ship" />
  </div>
  <error :handleClose="handleClose" :isVisible="hasError" :msg="errorMessage" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { fetchShips, buyShip } from "../api";
import { IShip } from "../interfaces";
import Error from "./Error.vue";
import Ship from "./Ship.vue";

export default defineComponent({
  components: { Ship, Error },
  setup() {
    const ships = ref([]);
    const hasError = ref(false);
    const errorMessage = ref("");
    const handleClose = () => {
      hasError.value = false;
    };

    onMounted(() => {
      fetchShips().then(data => {
        ships.value = data.ships.map((x: IShip) => {
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
