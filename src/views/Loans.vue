<template>
  <div v-if="isLoaded" class="container">
    <TheLoan v-for="loan in loans" :key="loans.indexOf(loan)" :loan="loan" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { getLoans, takeOutLoan } from "../api";
import useError from "../Message";
import TheLoan from "../components/TheLoan.vue";
import Loan from "@/interfaces/Loan";

export default defineComponent({
  components: { TheLoan },
  setup() {
    const loans = ref<Array<Loan>>([]);
    const isLoaded = ref(false);

    // const hasError = ref(false);
    // const errorMessage = ref<string>("");
    const { messageText, messageVisible } = useError();

    // watch(hasError, () => {
    //   if (hasError.value) {
    //     setTimeout(() => (hasError.value = false), 3000);
    //   }
    // });

    onMounted(async () => {
      const tmpLoans = await getLoans();
      loans.value = tmpLoans.map(x => {
        return {
          ...x,
          buttons: [
            {
              text: "Take Out",
              type: "Button",
              action: async () => {
                try {
                  await takeOutLoan(x.type);
                  messageText.value = "You are in debt now!";
                  messageVisible.value = true;
                } catch (error) {
                  messageVisible.value = true;
                  messageText.value = error.message;
                }
              }
            }
          ]
        };
      });
      isLoaded.value = true;
    });
    return {
      loans,
      isLoaded,
      takeOutLoan
    };
  }
});
</script>

<style scoped></style>
