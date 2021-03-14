<template>
  <div v-if="isLoaded" class="container">
    <loan v-for="loan in loans" :key="loans.indexOf(loan)" :loan="loan" />
  </div>
  <error :isVisible="hasError" :msg="errorMessage" :handleClose="closeError" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import Error from "./Error.vue";
import Loan from "./Loan.vue";

interface Loan {
  amount: string;
  collateralRequired: boolean;
  rate: number;
  termInDays: number;
  type: string;
  buttons: Array<object>;
}

export default defineComponent({
  components: { Loan, Error },
  setup() {
    const getLoans = async () => {
      const response = await fetch(
        `https://api.spacetraders.io/game/loans?token=${process.env.VUE_APP_TOKEN}`
      );
      return response.json();
    };
    const loans = ref([]);
    const isLoaded = ref(false);

    const hasError = ref(false);
    const errorMessage = ref("");
    const closeError = () => {
      hasError.value = false;
    };

    const takeOutLoan = async (loanType: string) => {
      return fetch(`https://api.spacetraders.io/users/gilli/loans`, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          Authorization: `Bearer ${process.env.VUE_APP_TOKEN}`,
          "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify({ type: loanType })
      }).then(response => response.json());
    };

    onMounted(() => {
      getLoans().then(data => {
        loans.value = data.loans.map((x: Loan) => {
          return {
            ...x,
            buttons: [
              {
                text: "Take Out",
                action: () => {
                  takeOutLoan(x.type).then(data => {
                    if (data.error) {
                      hasError.value = true;
                      errorMessage.value = data.error.message;
                    }
                  });
                }
              }
            ]
          };
        });
        isLoaded.value = true;
      });
    });
    return {
      loans,
      isLoaded,
      takeOutLoan,
      hasError,
      errorMessage,
      closeError
    };
  }
});
</script>

<style scoped></style>
