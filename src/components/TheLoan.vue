<template>
  <div class="loan">
    <h3>Loan</h3>
    <div v-for="loan in store.state.player.loans" :key="loan.type" class="item-card">
      <h4 class="item-card--header">
        {{ loan.type.toLowerCase() }}
      </h4>
      <table class="item-card_details">
        <tr v-if="loan.status === 'CURRENT'">
          <td>Due in:</td>
          <td>{{ time }}</td>
        </tr>
        <tr>
          <td>Repayment amount:</td>
          <td>{{ loan.repaymentAmount }}</td>
        </tr>
        <tr>
          <td>Status:</td>
          <td>{{ loan.status }}</td>
        </tr>
      </table>

      <button @click="() => onPayoff(loan.id)">Pay off</button>
    </div>
    <div v-if="!store.state.player.loans?.length">
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
import { getLoans, payoffLoan, takeOutLoan } from "@/ts/api";
import useMessage from "../ts/Message";

const now = ref(new Date().getTime());

const time = computed(() => {
  const then = new Date(store.state.player.loans[0].due as string).getTime();
  const timeLeft = then - now.value;
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  return `${days}d ${hours}h ${minutes}m ${seconds}s `;
});

const { messageText } = useMessage();

export default defineComponent({
  setup() {
    async function onTakeout(type: string) {
      try {
        await takeOutLoan(type);
      } catch (error) {
        console.log(error);
        messageText.value = (error as Error).message;
      }
      await store.update();
    }
    async function onPayoff(loanId: string) {
      try {
        await payoffLoan(loanId);
        await store.update();
      } catch (error) {
        messageText.value = (error as Error).message;
      }
    }
    const loans = ref();
    onMounted(async () => {
      setInterval(() => (now.value = new Date().getTime()), 1000);
      loans.value = await getLoans();
    });
    return { store, time, loans, onTakeout, onPayoff };
  }
});
</script>

<style>
div.loan {
  flex: 0.3 10 400px;
}
</style>
