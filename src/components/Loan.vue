<template>
  <div>
    <item-card
      :content="[
        { name: 'Amount:', value: Number(loan.amount).toLocaleString() },
        { name: 'Collateral Required:', value: loan.collateralRequired },
        { name: 'Rate:', value: loan.rate + '%' },
        { name: 'Term in Days:', value: loan.termInDays },
        { name: 'Type:', value: loan.type }
      ]"
      :buttons="loan.buttons"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ItemCard from "./ItemCard.vue";

export default defineComponent({
  props: {
    loan: Object
  },
  components: { ItemCard },
  setup() {
    return {};
  }
});
</script>

<style scoped></style>
