<template>
  <div class="item-card">
    <table class="item-card_details">
      <tr>
        <td>Amount:</td>
        <td>{{ Number(loan.amount).toLocaleString() }}</td>
      </tr>
      <tr>
        <td>Rate:</td>
        <td>{{ loan.rate + "%" }}</td>
      </tr>
      <tr>
        <td>Due:</td>
        <td>{{ loan.termInDays + " days" }}</td>
      </tr>
      <tr>
        <td>Type:</td>
        <td>{{ loan.type }}</td>
      </tr>
    </table>

    <button @click="handleClick">Take out</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    loan: Object
  },
  emits: ["takeOutLoan"],
  components: {},
  setup(props, { emit }) {
    const handleClick = () => {
      emit("takeOutLoan", props.loan);
    };
    return { handleClick };
  }
});
</script>

<style scoped></style>
