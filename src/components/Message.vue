<template>
  <transition name="slide-fade">
    <div v-if="messageText" class="error item-card">
      <strong class="close-btn" @click="messageText = ''">
        X
      </strong>
      <div class="error-content">
        <p>
          {{ messageText }}
        </p>
      </div>
      <div class="loading-bar"></div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useMessage from "@/ts/Message";

export default defineComponent({
  props: [],
  setup() {
    const { messageText } = useMessage();
    return { messageText };
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
  width: clamp(200px, 500px, 500px);
  backdrop-filter: blur(8px) brightness(0.3);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  text-align: center;
}
.error strong {
  position: absolute;
  right: 30px;
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
  animation: fill 5s forwards linear;
  align-self: flex-start;
}
</style>
