import { ref, watch } from "vue";

const messageText = ref<string>("");

export default function useError() {
  watch(messageText, () => {
    if (messageText.value) {
      setTimeout(() => {
        messageText.value = "";
      }, 5000);
    }
  });
  return { messageText };
}
