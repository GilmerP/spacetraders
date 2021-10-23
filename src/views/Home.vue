<template>
  <div class="container">
    <div class="text-container">
      <h3>Welcome to Space Traders</h3>
      <p>
        Your Job is it to become the best trader in the universe.
        <br /><br />
        First things first. You should get a loan to kickstart your career. With your newly discovered wealth you are
        able to buy your first space ship.
        <br /><br />
        You will need at least one space ship to travel around the universe. On each celestial body you will find
        different ressources for different prices. In oder to make profit you will have to find the one route that gives
        you the most bang for your buck.
        <br /><br />
        But this is just an demo text i will continue writing once it is the most important thing i have to do on this
        project, which - to be honest - might take a while.
        <br /><br />
        See you soon, trader!
      </p>
    </div>
    <the-loan />
    <div class="ship-display-container" v-if="store.state.userShips.length">
      <h3>Your Fleet</h3>
      <div class="ship-display">
        <TheShip v-for="(ship, index) in store.state.userShips" :key="index" :ship="ship"> </TheShip>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { store } from "@/store/index";
import TheLoan from "@/components/TheLoan.vue";
import TheShip from "@/components/TheShip.vue";

export default defineComponent({
  components: { TheLoan, TheShip },
  data() {
    return {
      store
    };
  }
});
</script>

<style>
.ship-display-container {
  flex: 1 1 1000px;
}
h3 {
  margin-bottom: 10px;
}
.ship-display {
  display: flex;
  flex-wrap: wrap;
  margin: -10px;
}
.ship-display > * {
  margin: 10px;
}
.text-container {
  flex: 1 1 400px;
}
</style>
