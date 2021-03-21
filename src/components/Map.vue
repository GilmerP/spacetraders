<template>
  <div class="container">
    <svg width="1000" height="1000">
      <circle
        v-for="(location, index) in locations"
        :key="index"
        :cx="location.x * 5 + 500"
        :cy="500 - location.y * 5"
        r="50"
        fill="white"
        :class="location.type + ' Object'"
        @click="() => handleSelect(location)"
      >
        <title>{{ "Name: " + location.name }}</title>
      </circle>
      <circle
        v-if="ship.location"
        class="ship Object"
        :cx="ship.x * 5 + 500"
        :cy="500 - ship.y * 5"
        r="10"
        fill="green"
      >
        <title>Ship</title>
      </circle>
    </svg>
    <div v-if="selectedObject.name" class="location-info">
      <div>
        <h3>Name: {{ selectedObject.name }}</h3>
        <h3>Type: {{ selectedObject.type }}</h3>
      </div>
      <input type="button" value="Travel" @click="handleTravel" />
    </div>
  </div>
  <message
    :handleClose="handleClose"
    :isVisible="popUp.isVisible"
    :msg="popUp.message"
    :title="popUp.title"
  />
</template>

<script lang="ts">
import { getPlanets, fetchUserShips, createFlightPlan } from "@/api";
import { PopUp } from "@/classes";
import { IShip, ObjectLocation } from "@/interfaces";
import { defineComponent, onMounted, ref } from "vue";
import Message from "./Message.vue";

export default defineComponent({
  components: {
    Message
  },

  setup() {
    const popUp = ref(new PopUp());
    const handleClose = () => {
      popUp.value.isVisible = false;
    };

    const locations = ref([]);
    const typeFilter = ref([
      "PLANET",
      "MOON",
      "GAS_GIANT",
      "ASTEROID",
      "WORMHOLE"
    ]);

    const selectedObject = ref({} as ObjectLocation);
    const handleSelect = (location: ObjectLocation) => {
      selectedObject.value = location;
    };

    const ship = ref({} as IShip);

    const handleTravel = () => {
      createFlightPlan(ship.value.id, selectedObject.value.symbol).then(
        data => {
          if (data.error) {
            popUp.value = new PopUp(data.error.message, "Error", true);
          } else {
            console.log(data);
          }
        }
      );
    };

    onMounted(() => {
      fetchUserShips().then(data => {
        ship.value = data.ships[0];
        console.log(data.ships);

        let shipLocation = data.ships[0].location as string;
        shipLocation = shipLocation.split("-")[0];
        getPlanets(shipLocation).then(data => {
          if (data.error) {
            popUp.value = new PopUp(data.error.message, "Error", true);
          } else {
            console.log(data.locations);
            locations.value = data.locations;
          }
        });
      });
    });

    return {
      popUp,
      handleClose,
      locations,
      handleSelect,
      typeFilter,
      selectedObject,
      ship,
      handleTravel
    };
  }
});
</script>

<style scoped>
.container {
  flex-direction: column;
  align-items: center;
}
label {
  margin-right: 20px;
}
svg {
  box-sizing: border-box;
  background: black;
}
.PLANET {
  fill: violet;
}
.GAS_GIANT {
  fill: orange;
}
.ASTEROID {
  fill: lightgray;
}
.MOON {
  fill: darkblue;
  stroke: lightblue;
}
.WORMHOLE {
  fill: greenyellow;
}
.Object {
  opacity: 0.9;
}
.Object:hover {
  opacity: 1;
  cursor: pointer;
}
.location-info {
  width: 1000px;
  display: flex;
  align-items: center;
}
input {
  margin-left: 20px;
  padding: 10px;
  background: black;
  border: none;
}
</style>
