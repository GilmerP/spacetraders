import { ref, watch } from "vue";

const messageText = ref<string>("");
const messageVisible = ref<boolean>(false);

export default function useError() {
  watch(messageVisible, () => {
    if (messageVisible.value) {
      setTimeout(() => {
        messageVisible.value = false;
      }, 5000);
    }
  });
  return { messageText, messageVisible };
}
