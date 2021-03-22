<template>
  <div v-if="isLoaded" class="container">
    <loan v-for="loan in loans" :key="loans.indexOf(loan)" :loan="loan" />
  </div>
  <message
    :isVisible="popUp.isVisible"
    :msg="popUp.message"
    :title="popUp.title"
    :handleClose="closeError"
  />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { getLoans, takeOutLoan } from "../api";
import Message from "./Message.vue";
import Loan from "./Loan.vue";
import { PopUp } from "../classes";
import { ILoan } from "@/interfaces";

export default defineComponent({
  components: { Loan, Message },
  setup() {
    const loans = ref([]);
    const isLoaded = ref(false);
    const popUp = ref(new PopUp("", "", false));

    const closeError = () => {
      popUp.value.isVisible = false;
    };

    onMounted(() => {
      getLoans().then(data => {
        loans.value = data.loans.map((x: ILoan) => {
          return {
            ...x,
            buttons: [
              {
                text: "Take Out",
                type: "Button",
                action: () => {
                  takeOutLoan(x.type).then(data => {
                    if (data.error) {
                      popUp.value.title = "Error";
                      popUp.value.message = data.error.message;
                      popUp.value.isVisible = true;
                    } else {
                      popUp.value.title = "Congrats...";
                      popUp.value.message = "You are in debt now!";
                      popUp.value.isVisible = true;
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
      popUp,
      closeError
    };
  }
});
</script>

<style scoped></style>
