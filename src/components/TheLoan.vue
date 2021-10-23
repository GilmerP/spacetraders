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
      <div class="item-card" v-for="loan in loans" :key="loan.type">
        <h3 class="item-card--header">{{ loan.type }}</h3>
        <table>
          <tr>
            <td>Amount:</td>
            <td>{{ loan.amount.toLocaleString() }}</td>
          </tr>
          <tr>
            <td>Rate:</td>
            <td>{{ loan.rate }}%</td>
          </tr>
          <tr>
            <td>Term:</td>
            <td>{{ loan.termInDays }} Days</td>
          </tr>
          <tr>
            <td>Collateral:</td>
            <td>{{ loan.collateralRequired ? "yes" : "-" }}</td>
          </tr>
        </table>

        <button @click="() => onTakeout(loan.type)">Take out</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { store } from "@/store/index";
import { getLoans, takeOutLoan } from "@/ts/api";

const now = ref(new Date().getTime());

const repaymentAmount = computed(() => Number(store.state.player.loans[0].repaymentAmount).toLocaleString());

const time = computed(() => {
  const then = new Date(store.state.player.loans[0].due as string).getTime();
  const timeLeft = then - now.value;
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  return `${days}d ${hours}h ${minutes}m ${seconds}s `;
});

export default defineComponent({
  setup() {
    async function onTakeout(type: string) {
      try {
        await takeOutLoan(type);
      } catch (error) {
        console.log(error);
      }
      await store.update();
    }
    const loans = ref();
    onMounted(async () => {
      setInterval(() => (now.value = new Date().getTime()), 1000);
      loans.value = await getLoans();
    });
    return { store, repaymentAmount, time, loans, onTakeout };
  }
});
</script>

<style>
p {
  margin-bottom: 10px;
}
</style>
