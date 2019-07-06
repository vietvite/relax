<template>
  <div id="app" class="bg-gray-200 min-h-screen">
    <MainMenu />
    <router-view />
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


<style src="./assets/main.css">
</style>
