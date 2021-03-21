<template>
  <div v-if="isVisible" class="message-wrapper">
    <div class="message">
      <span @click="handleClose">X</span>
      <h2>{{ title }}</h2>
      <p>{{ msg }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    isVisible: { type: Boolean, default: false },
    title: { type: String, default: "Message" },
    msg: { type: String, default: "Sorry, something went wrong" },
    handleClose: Function
  },
  setup() {
    return {};
  }
});
</script>

<style scoped>
.message-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background: rgba(20, 20, 20, 0.8);
  backdrop-filter: blur(2px);
}
.message {
  position: relative;
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  background: rgb(150, 150, 150);
  min-height: 150px;
  min-width: 250px;
  border-radius: 10px;
  text-align: center;
}
p {
  white-space: pre-line;
}
span {
  position: absolute;
  right: 0;
  top: 0;
  padding: 5px 10px;
  font-size: 10px;
}
span:hover {
  cursor: pointer;
}
</style>
