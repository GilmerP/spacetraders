<template>
  <div class="rating-bar">
    <div class="rating" :style="{ width: thisWidth + '%' }">
      <span class="tooltiptext">{{ thisVal }}/{{ maxVal }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["maxVal", "thisVal"],
  setup(props) {
    const thisWidth = (100 / props.maxVal) * props.thisVal;
    return { thisWidth };
  }
});
</script>

<style scoped>
.rating-bar {
  position: relative;
  margin: auto;
  height: 15px;
  width: 100%;
  border: 0.5px solid rgba(255, 255, 255, 0.2);
}
.rating {
  background: #ff4400;
  height: 100%;
}
.rating-bar::after {
  content: "";
  width: 100;
}
.tooltiptext {
  font-size: 12px;
  visibility: hidden;
  width: 100px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;

  /* Position the tooltip text - see examples below! */
  position: absolute;
  bottom: 150%;
  left: 50%;
  margin-left: -50px;
  z-index: 1;
}
.tooltiptext::after {
  content: " ";
  position: absolute;
  top: 100%; /* At the bottom of the tooltip */
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: black transparent transparent transparent;
}
.rating-bar:hover .tooltiptext {
  visibility: visible;
}
</style>
