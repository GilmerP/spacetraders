<template>
  <div class="container">
    <canvas id="canvas" width="1000" height="1000"> </canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  setup() {
    const fieldCount = ref(100);
    onMounted(() => {
      const canvas = document.getElementById("canvas") as HTMLCanvasElement;
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      ctx.font = "15px Arial";
      ctx.fillStyle = "#969696";
      ctx.beginPath();
      ctx.arc(20 * 5 + 500, 500 - -25 * 5, 50, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeText("OE-PM", 15 * 5 + 500, 500 - -25 * 5);
      ctx.beginPath();
      ctx.arc(16 * 5 + 500, 500 - 17 * 5, 50, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeText("OE-CR", 11 * 5 + 500, 500 - 17 * 5);
      ctx.beginPath();
      ctx.arc(-48 * 5 + 500, 500 - -7 * 5, 50, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeText("OE-KO", -53 * 5 + 500, 500 - -7 * 5);
      ctx.beginPath();
      ctx.arc(-75 * 5 + 500, 500 - 82 * 5, 50, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeText("OE-UC", -80 * 5 + 500, 500 - 82 * 5);
      ctx.beginPath();
      ctx.arc(-23 * 5 + 500, 500 - -28 * 5, 20, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeText("P", -24 * 5 + 500, 500 - -28 * 5);
    });
    return { fieldCount };
  }
});
</script>

<style scoped>
canvas {
  box-sizing: border-box;
  background: black;
}
</style>
