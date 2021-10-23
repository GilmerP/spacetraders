<template>
  <div class="item-card">
    <h3 class="item-card--header">
      {{ ship.manufacturer + " " + ship.class }}
    </h3>
    <div v-if="!purchaseLocationsVisible" class="ship-details">
      <img src="../assets/Spaceship_1.png" alt="spaceship" />
      <table class="item-card_details">
        <tr>
          <td>
            <fa-icon style="color: #ff4400;" icon="tachometer-alt" />
          </td>
          <td class="rating-container"><rating-bar :thisVal="ship.speed" :maxVal="5" /></td>
        </tr>
        <tr>
          <td>
            <fa-icon style="color: #ff4400;" icon="bomb" />
          </td>
          <td class="rating-container"><rating-bar :thisVal="ship.weapons" :maxVal="20" /></td>
        </tr>
        <tr>
          <td>
            <fa-icon style="color: #ff4400;" icon="shield-alt" />
          </td>
          <td class="rating-container"><rating-bar :thisVal="ship.plating" :maxVal="20" /></td>
        </tr>
        <tr>
          <td>
            <fa-icon style="color: #ff4400;" icon="box-open" />
          </td>
          <td class="rating-container"><rating-bar :thisVal="ship.maxCargo" :maxVal="3000" /></td>
        </tr>
      </table>
    </div>
    <table class="purchaseLocations" v-else>
      <tr>
        <th>System</th>
        <th>Location</th>
        <th>Price</th>
      </tr>
      <tr
        @click="() => buy(location.location)"
        v-for="location in ship.purchaseLocations"
        :key="location"
        class="location"
      >
        <td>{{ location.system }}</td>
        <td>{{ location.location }}</td>
        <td>{{ location.price }}</td>
      </tr>
    </table>

    <div v-if="ship.location" class="button-container">
      <router-link class="btn" :to="'/trade/' + ship.id">Trade</router-link>
      <router-link class="btn" to="/Map">Travel</router-link>
    </div>
    <div v-else-if="ship.id">
      <p style="text-align: center;">Ship is travelling for {{ time }} more seconds</p>
    </div>
    <div v-else>
      <button @click="() => (purchaseLocationsVisible = !purchaseLocationsVisible)">
        {{ purchaseLocationsVisible ? "Back" : "Buy" }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Ship from "@/interfaces/Ship";
import { getFlightById } from "../ts/api";
import { defineComponent, PropType } from "vue";
import RatingBar from "./RatingBar.vue";
import { store } from "@/store";

export default defineComponent({
  components: { RatingBar },
  emits: ["buyShip"],
  props: {
    ship: { type: Object as PropType<Ship>, required: true }
  },
  data() {
    return {
      time: 100,
      purchaseLocationsVisible: false
    };
  },
  methods: {
    buy(location: string) {
      this.$data.purchaseLocationsVisible = false;
      this.$emit("buyShip", location, this.$props.ship.type);
    }
  },
  async mounted() {
    if (this.ship.flightPlanId) {
      const flightplan = await getFlightById(this.ship.flightPlanId as string);
      this.$data.time = flightplan.timeRemainingInSeconds;

      let intId = -1;
      intId = setInterval(() => {
        this.$data.time--;
        if (this.$data.time < 0) {
          clearInterval(intId);
          store.update();
        }
      }, 1000);
    }
  }
});
</script>

<style>
.ship-details {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: -10px;
}
.ship-details > * {
  margin: 10px;
}
.ship-details td {
  flex: none;
  min-width: 30px;
}
img {
  width: 200px;
}
.button-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.purchaseLocations tr.location {
  padding: 5px;
}
.purchaseLocations tr.location:hover {
  background-color: rgb(0, 0, 0, 0.3);
  cursor: pointer;
}
.ship-details .rating-container {
  flex: 1;
}
</style>
