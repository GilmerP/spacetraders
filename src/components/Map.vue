<template>
  <div class="container">
    <svg width="1000" height="1000">
      <!-- For each object a circle (PLANTES, MOONS, etc.) -->
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

      <!-- For each ship a smaller circle -->
      <circle
        v-for="(ship, index) in ships"
        :key="ship.id"
        class="ship Object"
        :cx="ship.x * 5 + 500"
        :cy="500 - ship.y * 5"
        r="10"
        fill="green"
      >
        <title>Ship {{ index + 1 }}</title>
      </circle>
    </svg>

    <div v-if="selectedObject.name" class="location-info">
      <div>
        <h3>Name: {{ selectedObject.name }}</h3>
        <h3>Type: {{ selectedObject.type }}</h3>
      </div>

      <select v-model="selectedShip">
        <option v-for="(ship, index) in ships" :key="index" :value="ship">{{
          ship.location + ` (Ship ${index + 1})`
        }}</option>
      </select>

      <input
        type="button"
        value="Travel"
        @click="() => handleTravel(selectedShip)"
      />
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

    const selectedObject = ref({} as ObjectLocation);
    const handleSelect = (location: ObjectLocation) => {
      selectedObject.value = location;
    };

    const ships = ref([]);

    const handleTravel = (ship: IShip) => {
      createFlightPlan(ship.id, selectedObject.value.symbol).then(data => {
        if (data.error) {
          popUp.value = new PopUp(data.error.message, "Error", true);
        } else {
          console.log(data);
          popUp.value = new PopUp(
            `You are on your way to ${data.flightPlan.destination}! \n Remaining seconds: ${data.flightPlan.timeRemainingInSeconds}`,
            "To infinity and beyond!",
            true
          );
        }
      });
    };

    const selectedShip = ref({} as IShip);
    onMounted(() => {
      fetchUserShips().then(data => {
        // eslint-disable-next-line
        ships.value = data.ships.filter((x: any) => x.location);
        selectedShip.value = data.ships[0];

        let shipLocation = data.ships[0].location as string;
        shipLocation = shipLocation.split("-")[0];
        getPlanets(shipLocation).then(data => {
          if (data.error) {
            popUp.value = new PopUp(data.error.message, "Error", true);
          } else {
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
      selectedObject,
      ships,
      handleTravel,
      selectedShip
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
select,
option {
  color: black;
  margin-left: 15px;
}
</style>
