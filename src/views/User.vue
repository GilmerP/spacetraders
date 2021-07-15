<template>
  <div v-if="isLoaded" class="container">
    <div class="item-card">
      <div class="item-card_header">
        <h2>{{ thisuser.username }}</h2>
        <fa-icon class="item-card_header_icon" icon="user-astronaut" />
      </div>
      <table class="item-card_details">
        <tr>
          <td>Token:</td>
          <td>{{ token }}</td>
        </tr>
        <tr>
          <td>Loans:</td>
          <td v-if="thisuser.loans.length">
            {{
              `${Number(
                thisuser.loans[0].repaymentAmount
              ).toLocaleString()} Credits, due ${new Date(
                thisuser.loans[0].due
              ).toLocaleString()}`
            }}
          </td>
          <td v-else>No loan taken</td>
        </tr>
      </table>
    </div>
  </div>
  <div class="container flex-column" v-if="isLoaded && thisuser.ships.length">
    <h2>Your Fleet</h2>
    <TheShip
      v-for="(ship, index) in thisuser.ships"
      :key="index"
      :ship="ship"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { getCurrentUser } from "../api";
import useError from "../Message";
import TheShip from "../components/TheShip.vue";
import router from "../router/index";

export default defineComponent({
  components: { TheShip },
  setup() {
    const thisuser = ref({});
    const isLoaded = ref<boolean>(false);
    const { messageText, messageVisible } = useError();
    const token = localStorage.getItem("token");

    onMounted(async () => {
      try {
        const data = await getCurrentUser();
        thisuser.value = data.user;
        isLoaded.value = true;
      } catch (error) {
        router.push("/login");
        messageText.value = error;
        messageVisible.value = true;
      }
    });

    return {
      thisuser,
      isLoaded,
      token
    };
  }
});
</script>

<style scoped></style>
