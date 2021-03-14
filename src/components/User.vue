<template>
  <div v-if="isLoaded" class="container">
    <item-card
      :header="thisuser.username.toUpperCase()"
      :content="[
        { name: 'credits', value: Number(thisuser.credits).toLocaleString() }
      ]"
    />
    <item-card
      :header="'Active Loan'"
      :content="
        thisuser.loans.length > 0
          ? [
              {
                name: 'Amount',
                value: Number(
                  thisuser.loans[0].repaymentAmount
                ).toLocaleString()
              },
              {
                name: 'Due',
                value: new Date(thisuser.loans[0].due).toLocaleString()
              }
            ]
          : [{ name: 'No loan taken' }]
      "
    />
    <item-card
      v-for="(ship, index) in thisuser.ships"
      :key="index"
      :header="`Ship ${index + 1}`"
      :content="[
        { name: 'class', value: ship.class },
        { name: 'location', value: ship.location },
        {
          name: 'space available',
          value: ship.spaceAvailable + '/' + ship.maxCargo
        }
      ]"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import ItemCard from "./ItemCard.vue";

export default defineComponent({
  components: { ItemCard },
  setup() {
    const thisuser = ref({});
    const isLoaded = ref(false);
    const getUser = async (username: string) => {
      const res = await fetch(
        `https://api.spacetraders.io/users/${username}?token=${process.env.VUE_APP_TOKEN}`
      );
      const userData = await res.json();

      thisuser.value = userData.user;
    };

    onMounted(() => {
      getUser("gilli").then(() => (isLoaded.value = true));
    });

    return {
      thisuser,
      isLoaded
    };
  }
});
</script>

<style scoped></style>
