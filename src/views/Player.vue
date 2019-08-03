<template>
  <div class="about">
    <h1>This is player</h1>
    <button @click="playSound" class="px-5 py-3 mx-3 bg-green-600 text-white rounded-full">Play</button>
    <button @click="stopSound" class="px-5 py-3 mx-3 bg-red-700 text-white rounded-full">Stop</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      audio: null
    }
  },
  methods: {
    playSound() {
      try {
        this.audio = new Audio(require('@/assets/Perfect.mp3'));
        this.audio.play();
      } catch (error) {
        console.log(error);
        
      }
    },
    stopSound() {
      this.audio.pause();
    }
  }
}
</script>
