<template>
  <div class="wrapper">
    <div class="header">
      <h2 v-if="header">{{ header }}</h2>
      <fa-icon class="icon" v-if="iconName" :icon="iconName" />
    </div>
    <table>
      <tr v-for="prop in content" :key="content[prop]">
        <td>{{ prop.name }}</td>
        <td>{{ prop.value }}</td>
      </tr>
    </table>

    <div v-if="inputs" class="btn-container">
      <input
        v-for="(input, index) in inputs"
        :key="index"
        :type="input.type"
        v-on:click="input.action"
        v-model="input.text"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    header: String,
    iconName: String,
    content: Array,
    inputs: Array
  },
  setup() {
    return {};
  }
});
</script>

<style scoped>
.wrapper {
  background: #969696;
  padding: 10px;
  margin: 10px;
  box-sizing: border-box;
  min-height: 150px;
  min-width: 300px;
  border-radius: 10px;
}
h2 {
  flex-grow: 1;
}
.icon {
  font-size: 30px;
}
.header {
  display: flex;
  justify-content: center;
  align-items: center;
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
input {
  background: black;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  min-width: 100px;
}
input:hover {
  opacity: 0.8;
}
</style>
