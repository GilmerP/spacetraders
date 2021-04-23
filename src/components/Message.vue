<template>
  <transition name="slide-fade">
    <div v-if="messageVisible" class="error">
      <strong class="close-btn" @click="messageVisible = !messageVisible">
        X
      </strong>
      <div class="error-content">
        <p>{{ messageText }}</p>
      </div>
      <div class="loading-bar"></div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useError from "@/Message";

export default defineComponent({
  props: [],
  setup() {
    const { messageText, messageVisible } = useError();
    return { messageText, messageVisible };
  }
});
</script>

<style>
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 2s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.error {
  position: fixed;
  top: 10%;
  right: 10px;
  min-width: 200px;
  max-width: 400px;
  background: #e40000;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  border-radius: 10px;
  overflow: hidden;
  text-align: center;
}
.error strong {
  position: absolute;
  right: 10px;
}
.error strong:hover {
  cursor: pointer;
}
.error-content {
  margin: 50px;
}
.error-content p {
  font-size: 20px;
}

@keyframes fill {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}

.loading-bar {
  margin-top: auto;
  height: 5px;
  background-color: white;
  animation: fill 3s forwards linear;
  align-self: flex-start;
}
</style>
