<template>
  <div v-if="ships.length > 0" class="container">
    <Ship v-for="(ship, index) in ships" :key="index" :ship="ship" />
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
    const ships = ref([]);
    const popUp = ref(new PopUp("", "", false));

    const handleClose = () => {
      popUp.value.isVisible = false;
    };

    const getShipIcon = (shipClass: string) => {
      switch (shipClass) {
        case "MK-I":
          return "rocket";
        case "MK-II":
          return "space-shuttle";
        default:
          return "fighter-jet";
      }
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
                      popUp.value = new PopUp(
                        data.error.message,
                        "Error",
                        true
                      );
                    } else {
                      popUp.value = new PopUp(
                        "You just bought a spaceship",
                        "Congrats!",
                        true
                      );
                    }
                  })
              }
            ],
            icon: getShipIcon(x.class)
          };
        });
      });
    });
    return { ships, buyShip, popUp, handleClose };
  }
});
</script>

<style scoped></style>
