<template>
  <div v-if="isLoaded" class="container">
    <loan v-for="loan in loans" :key="loans.indexOf(loan)" :loan="loan" />
  </div>
  <error :isVisible="hasError" :msg="errorMessage" :handleClose="closeError" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { getLoans, takeOutLoan } from "../api";
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
    const loans = ref([]);
    const isLoaded = ref(false);

    const hasError = ref(false);
    const errorMessage = ref("");
    const closeError = () => {
      hasError.value = false;
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
