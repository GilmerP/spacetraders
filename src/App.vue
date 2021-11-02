<template>
  <div id="board">
    <Banner />
    <Navigation />
    <router-view />
    <Message />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { store } from "./store/index";
import Banner from "./components/Banner.vue";
import Message from "./components/Message.vue";
import Navigation from "./components/Navigation.vue";

export default defineComponent({
  components: { Banner, Message, Navigation },
  async mounted() {
    try {
      await store.init();
    } catch (error) {
      console.log(error);
    }
  }
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Orbitron&display=swap");

* {
  box-sizing: border-box;
  margin: 0;
  font-family: "Orbitron", Tahoma, Geneva, Verdana, sans-serif;
}

h1,
h2,
h3,
h4,
h5,
span,
p,
strong,
b,
u,
a,
li,
button,
td,
th {
  color: white;
}

h2 {
  font-size: clamp(16px, 24px, 2vw);
}

#app {
  background-image: url("./assets/app-bg.jpg");
  background-size: cover;
  background-position: 50% 0%;
  height: 100vh;
}

#board {
  display: grid;
  height: 100%;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
}

@media only screen and (max-width: 600px) {
  #board {
    grid-template: 1fr / 1fr;
  }
}

.primary-color {
  color: #ff4400;
}

.container {
  padding: 10px;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  justify-content: space-between;
  align-items: flex-start;
}

.container > * {
  margin: 10px;
}

.flex-column {
  flex-direction: column;
}

.item-card {
  padding: 30px 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  backdrop-filter: blur(5px) brightness(0.9);
  flex: 1 1 275px;
}

.item-card--header {
  text-align: center;
  margin-bottom: 20px;
}

.item-card_details {
  flex: 1 1 100px;
}

table {
  width: 100%;
}

td,
table {
  padding: 0;
  border-spacing: 0px;
}

tr {
  display: flex;
  margin-bottom: 5px;
}
td,
th {
  flex: 1;
}
button,
.btn {
  display: block;
  text-decoration: none;
  text-align: center;
  font-size: 13px;
  background: #ff4400;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  margin: auto;
  margin-top: 20px;
  min-width: 100px;
}

button:hover,
.btn:hover {
  cursor: pointer;
  background: hsl(16, 100%, 40%);
}
button:disabled {
  background: #4b4b4b;
  cursor: default;
}
@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}
.loader {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: grid;
  place-items: center;
  backdrop-filter: brightness(0.5);
}
.loader::before {
  content: "";
  width: 10%;
  padding: 5% 0;
  border-radius: 50%;
  border: rgba(255, 255, 255, 0.096) 50px solid;
  border-top: #ff4400 50px solid;
  animation: spinner 4s linear infinite;
}

.flex-between {
  display: flex;
  justify-content: space-between;
}
</style>
