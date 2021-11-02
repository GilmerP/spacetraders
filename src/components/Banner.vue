<template>
  <div class="banner" v-if="!isLogin">
    <h3 class="bar--item">
      {{ store.state.player.username?.toUpperCase() }}
    </h3>
    <h3 class="bar--item">
      <fa-icon class="fa-icon" style="color: #ff4400;" icon="coins" />
      {{ Number(store.state.player.credits)?.toLocaleString() }}
    </h3>
    <h3 class="bar--item">
      <fa-icon class="fa-icon" style="color: #ff4400;" icon="rocket" />
      {{ store.state.player.ships?.length }}
    </h3>
    <div id="burger-menu" @click="toggleMenu">
      <div class="bar one"></div>
      <div class="bar two"></div>
      <div class="bar three"></div>
    </div>
    <transition name="slide-fade">
      <nav v-if="menuVisible" class="navigation">
        <h2 class="primary-color bar--item heading">SPACE TRADERS</h2>
        <ul @click="toggleMenu">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/Ships">Ships</router-link></li>
          <li><router-link to="/Map">Map</router-link></li>
          <li><router-link to="/Login">Logout</router-link></li>
        </ul>
      </nav>
    </transition>
  </div>
  <div class="banner" v-else>
    <h3 class="bar--item">
      START YOUR JOURNEY TODAY
    </h3>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { store } from "@/store/index";
import router from "@/router";

export default defineComponent({
  setup() {
    const isLogin = computed(() => router.currentRoute.value.name?.toString().toLowerCase() === "login");
    const menuVisible = ref(false);
    function toggleMenu() {
      const menuButton = document.getElementById("burger-menu");
      if (!menuButton) return;
      menuButton.classList.toggle("selected");
      const middleBar = menuButton.getElementsByClassName("two")[0];
      middleBar.classList.toggle("hide");
      menuVisible.value = !menuVisible.value;
    }
    return { store, isLogin, toggleMenu, menuVisible };
  }
});
</script>

<style>
.banner {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
}

.bar--item:not(:last-child) {
  margin-right: 5vw;
}

#burger-menu {
  margin-left: auto;
  z-index: 100;
}

#burger-menu > div {
  background: #ff4400;
  z-index: 10;
  height: 3px;
  width: 35px;
  position: relative;
  transition: all linear 0.2s;
}

.one {
  left: 0;
  margin-bottom: 5px;
}

.two {
  margin-bottom: 5px;
  left: 0;
}

.hide {
  opacity: 0;
}

#burger-menu.selected > .one {
  top: 50%;
  transform: rotate(45deg);
}

#burger-menu.selected > .three {
  bottom: 25%;
  transform: rotate(-45deg);
}

nav ul {
  list-style-type: none;
  padding: 0;
  margin: auto 0;
}

nav ul li {
  margin-bottom: 20px;
  text-decoration: none;
}

nav ul li a {
  text-decoration: none;
}

#burger-menu + nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 90;
  text-align: center;
  backdrop-filter: blur(5px) brightness(0.2);
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(600px);
}

@media screen and (min-width: 600px) {
  #burger-menu {
    display: none;
  }
}
</style>
