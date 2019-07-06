<template>
  <div>
    <!-- Counter -->
    <div v-if="isActive">
      <progress-bar :sec="this.remainSec" :min="this.remainMin" :value="value" />
      <div class="flex justify-center mt-4">
        <button
          @click="stopCounter"
          class="pt-3 pb-3 pl-6 pr-6 rounded-full text-white font-semibold hover:bg-red-600 bg-red-700 focus:outline-none"
        >Stop</button>
      </div>
    </div>

    <!-- Start button -->
    <div v-else @click="startCounter(3)" class="flex justify-center ml-8 mt-8">
      <svg
        viewBox="0 0 1792 1792"
        xmlns="http://www.w3.org/2000/svg"
        width="200"
        height="200"
        fill="currentColor"
      >
        <path
          d="M1576 927l-1328 738q-23 13-39.5 3t-16.5-36v-1472q0-26 16.5-36t39.5 3l1328 738q23 13 23 31t-23 31z"
        />
      </svg>
    </div>
  </div>
</template>

<script>
import ProgressBar from "@/components/ProgressBar";
export default {
  name: "home",
  components: {
    ProgressBar
  },
  data() {
    return {
      isActive: false,

      value: 100,

      workTime: 25,
      shortRest: 1,
      longRest: 15,

      remainMin: null,
      remainSec: null,

      counter: null
    };
  },
  methods: {
    startCounter(minutes) {
      this.isActive = true;

      var totalSec = minutes * 60; // To seconds
      var counterSec = totalSec;

      this.counter = setInterval(() => {
        counterSec--;
        this.value = ~~((counterSec*100)/totalSec); // progress bar value
        this.remainMin = ~~(counterSec / 60);
        this.remainSec = ~~(counterSec % 60);
        console.log({
          remainMin: this.remainMin,
          remainSec: this.remainSec
        });
        
        console.log({value: this.value});
        if(counterSec <= 0) {
          clearInterval(this.counter);
          this.stopCounter();
        }
      }, 1000);
    },
    stopCounter() {
      this.isActive = false;
      clearInterval(this.counter);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
