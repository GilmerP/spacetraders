<template>
  <div class="container">
    <the-loan />
    <div>
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
    <div style="grid-column: 1/4;">
      <h2>Your Fleet</h2>
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
.ship-display {
  display: flex;
}
.ship-display > div {
  min-width: 400px;
  margin-right: 20px;
}
</style>
