<template>
  <div id="app" class="bg-gray-300 min-h-screen">
    <MainMenu />
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import MainMenu from "./components/MainMenu.vue";
export default {
  components: {
    MainMenu
  }
};
</script>

<style src="./assets/main.css"></style>