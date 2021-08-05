<template>
  <div class="container" v-if="ships.length">
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
  <div class="container" v-else-if="loading">
    <h1>Loading...</h1>
  </div>
  <div class="container" v-else>
    <h1 style="text-align:">
      Could not get the Map. <br />
      Make sure you have a ship that is currently not transitioning
    </h1>
  </div>
</template>

<script lang="ts">
import { getCelestialBodys, createFlightPlan } from "@/api";
import { store } from "@/store/index";
import useMessage from "../Message";
import Ship from "@/interfaces/Ship";
import CelestialBody from "@/interfaces/CelestialBody";
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  setup() {
    const loading = ref<boolean>(true);
    const locations = ref<Array<CelestialBody>>([]);

    const selectedObject = ref({} as CelestialBody);
    const handleSelect = (location: CelestialBody) => {
      selectedObject.value = location;
    };

    const ships = ref<Array<Ship>>([]);

    const { messageText, messageVisible } = useMessage();

    const handleTravel = async (ship: Ship) => {
      try {
        const flightplan = await createFlightPlan(
          ship.id,
          selectedObject.value.symbol
        );
        messageText.value = `You are on your way to ${flightplan.destination}! \n Remaining seconds: ${flightplan.timeRemainingInSeconds}`;
        messageVisible.value = true;
      } catch (error) {
        messageText.value = error;
        messageVisible.value = true;
      }
    };

    const selectedShip = ref({} as Ship);
    onMounted(async () => {
      try {
        const allShips = store.state.userShips;
        if (allShips.length) {
          ships.value = allShips.filter(x => x.location);
          selectedShip.value = ships.value[0];

          //first section of the ship location is the systemname.
          let shipLocation = selectedShip.value.location as string;
          shipLocation = shipLocation.split("-")[0];
          locations.value = await getCelestialBodys(shipLocation);
        }
      } catch (error) {
        messageText.value = error;
        messageVisible.value = true;
      } finally {
        loading.value = false;
      }
    });

    return {
      locations,
      handleSelect,
      selectedObject,
      ships,
      handleTravel,
      selectedShip,
      loading
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
