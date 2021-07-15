<template>
  <div v-if="isLoaded" class="container">
    <TheLoan
      @takeOutLoan="handleTakeOut"
      v-for="loan in loans"
      :key="loans.indexOf(loan)"
      :loan="loan"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { getLoans, takeOutLoan } from "../api";
import useMessage from "../Message";
import TheLoan from "../components/TheLoan.vue";
import Loan from "@/interfaces/Loan";

export default defineComponent({
  components: { TheLoan },
  setup() {
    const loans = ref<Array<Loan>>([]);
    const isLoaded = ref(false);

    const { messageText, messageVisible } = useMessage();

    const handleTakeOut = async (loanToTake: Loan) => {
      try {
        const data = await takeOutLoan(loanToTake.type);
        console.log(data);
      } catch (error) {
        messageText.value = error;
        messageVisible.value = true;
      }
    };

    onMounted(async () => {
      loans.value = await getLoans();
      isLoaded.value = true;
    });
    return {
      loans,
      isLoaded,
      takeOutLoan,
      handleTakeOut
    };
  }
});
</script>

<style scoped></style>
