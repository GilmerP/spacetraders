<template>
  <div>
    <h2>{{ header }}</h2>
    <table>
      <tr v-for="prop in content" :key="content[prop]">
        <td>{{ prop.name }}</td>
        <td>{{ prop.value }}</td>
      </tr>
    </table>

    <div v-if="buttons" class="btn-container">
      <button
        v-for="button in buttons"
        :key="buttons.indexOf(button)"
        v-on:click="button.action"
      >
        {{ button.text }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    header: String,
    content: Array,
    buttons: Array
  },
  setup() {
    return {};
  }
});
</script>

<style scoped>
div:not(.btn-container) {
  background: #969696;
  padding: 10px;
  margin: 10px;
  box-sizing: border-box;
  min-height: 150px;
  min-width: 150px;
  width: 280px;
  border-radius: 10px;
}
table {
  width: 100%;
}
.btn-container {
  width: 100%;
  display: flex;
  margin-top: 10px;
  justify-content: center;
}
button {
  background: black;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  min-width: 100px;
}
button:hover {
  opacity: 0.8;
}
</style>
