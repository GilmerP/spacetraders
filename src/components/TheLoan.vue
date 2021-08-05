<template>
  <div>
    <h2>Loan</h2>
    <div v-if="store.state.player.loans?.length > 0" class="item-card">
      <h4 class="item-card--header">
        {{ store.state.player.loans[0].type.toLowerCase() }}
      </h4>
      <p>
        This loan is due in <b>{{ time }}</b>
      </p>
      <p>
        The repayment amount is
        <b> {{ repaymentAmount }}c </b>
      </p>
      <button>Pay off</button>
    </div>
    <div v-else>
      <span>Du solltest Schulden aufnehmen!</span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { store } from "@/store/index";

const now = ref(new Date().getTime());

const repaymentAmount = computed(() =>
  Number(store.state.player.loans[0].repaymentAmount).toLocaleString()
);

const time = computed(() => {
  const then = new Date(store.state.player.loans[0].due as string).getTime();
  const timeLeft = then - now.value;
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  return `${days}d ${hours}h ${minutes}m ${seconds}s `;
});

export default defineComponent({
  setup() {
    return { store, repaymentAmount, time };
  },
  mounted() {
    setInterval(() => (now.value = new Date().getTime()), 1000);
  }
});
</script>

<style scoped>
p {
  margin-bottom: 10px;
}
</style>
