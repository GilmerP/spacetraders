<template>
  <div class="item-card">
    <div class="item-card_header">
      <h2>{{ ship.manufacturer + " " + ship.class }}</h2>
      <fa-icon class="item-card_header_icon" v-if="icon" :icon="icon" />
    </div>
    <table class="item-card_details">
      <tr>
        <td>Speed:</td>
        <td>{{ ship.speed }}</td>
      </tr>
      <tr>
        <td>Weapons:</td>
        <td>{{ ship.weapons }}</td>
      </tr>
      <tr>
        <td>Plating:</td>
        <td>{{ ship.plating }}</td>
      </tr>
      <tr>
        <td>Cargo:</td>
        <td>{{ Number(ship.maxCargo).toLocaleString() }}</td>
      </tr>
    </table>

    <div
      class="purchase-location"
      v-for="(location, index) in ship.purchaseLocations"
      :key="index"
    >
      <div class="purchase-location_details">
        <table>
          <tr>
            <td>Location:</td>
            <td>{{ location.location }}</td>
          </tr>
          <tr>
            <td>Price:</td>
            <td>{{ Number(location.price).toLocaleString() }}</td>
          </tr>
        </table>
      </div>
      <button
        @click="
          () => handleBuy({ location: location.location, type: ship.type })
        "
      >
        Buy
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Ship from "@/interfaces/Ship";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  components: {},
  emits: ["buyShip"],
  props: {
    ship: { type: Object as PropType<Ship>, required: true }
  },

  setup(props, { emit }) {
    const handleBuy = (ship: Ship) => {
      emit("buyShip", ship);
    };

    const getIcon = (shipClass: string) => {
      switch (shipClass) {
        case "MK-I":
          return "rocket";
        case "MK-II":
          return "space-shuttle";
        default:
          return "fighter-jet";
      }
    };

    const icon = getIcon(props.ship.class);
    return { icon, handleBuy };
  }
});
</script>

<style scoped>
.purchase-location {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
  margin: 5px 0;
  border-top: 1px solid white;
}
.purchase-location_details {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-right: 20px;
}
button {
  background: green;
}
</style>
