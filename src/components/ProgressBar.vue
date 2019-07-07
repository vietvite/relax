<template>
  <div class="flex-none justify-center">
    <div v-if="isActive">
      <div class="svg-rotate flex justify-center">
        <div class="absolute pt-28 text-7xl text-orange-400">{{ time }}</div>
        <svg :width="width" :height="height" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            :r="radiusCircle"
            fill="none"
            :stroke="defaultOptions.progress.backgroundColor"
            :stroke-width="defaultOptions.layout.strokeWidth"
          />
          <circle
            cx="60"
            cy="60"
            :r="radiusCircle"
            fill="none"
            :stroke="defaultOptions.progress.color"
            :stroke-width="defaultOptions.layout.strokeWidth"
            :stroke-dasharray="strokeCircle"
            :stroke-dashoffset="strokeCircleOffset"
          />
        </svg>
      </div>
      <div class="flex justify-center mt-4">
        <button
          @click="stopCounter"
          class="pt-3 pb-3 pl-6 pr-6 rounded-full text-white font-semibold hover:bg-red-600 bg-red-700 focus:outline-none"
        >Stop</button>
      </div>
    </div>
    <!-- Start button -->
    <div v-else @click="startCounter" class="flex justify-center ml-8 mt-8">
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
const s = x => x + "s";
const px = v => v + "px";
export default {
  name: "ProgressBar",
  props: ["workTime", "shortRest", "longRest"],
  created() {
    console.log("Trong created");
    console.log({
      work: this.workTime,
      short: this.shortRest,
      long: this.longRest
    });
    console.log({
      min: this.min,
      sec: this.sec
    });

    this.defaultOptions = {
      progress: {
        color: "#68D391",
        backgroundColor: "#E2E8F0"
      },
      layout: {
        height: 350,
        width: 350,
        strokeWidth: 3,
        type: "circle"
      }
    };
  },
  mounted() {
    console.log("Trong mounted");
    console.log({
      work: this.workTime,
      short: this.shortRest,
      long: this.longRest
    });
    console.log({
      min: this.min,
      sec: this.sec
    });
    this.updateValue(this.value);
    this.updateTimer();
  },

  data() {
    return {
      isActive: false,
      value: 100,
      min: Number,
      sec: Number,
      intervalVal: null,

      defaultOptions: Object,
      rectHeight: 0,
      rectY: 90,
      topCy: -20,
      radiusCircle: 54,
      strokeCircle: 0,
      strokeCircleOffset: 0
    };
  },
  methods: {
    startCounter() {
      this.isActive = true;

      var totalSec = this.min * 60;
      var countSec = totalSec;

      this.intervalVal = setInterval(() => {
        countSec--;
        this.value = ~~((countSec * 100) / totalSec); // progress bar value
        this.min = ~~(countSec / 60);
        this.sec = ~~(countSec % 60);

        if (countSec <= 0) {
          clearInterval(this.intervalVal);
          this.stopCounter();
        }
      }, 1000);
    },
    stopCounter() {
      clearInterval(this.intervalVal);
      this.isActive = false;
      this.value = 100;
      this.updateTimer();
    },
    updateTimer() {
      this.min = this.workTime;
      this.sec = (this.workTime * 60) % 60;
    },
    updateValue(val) {
      let invertedVal = 100 - val;
      this.strokeCircle = 2 * Math.PI * this.radiusCircle;
      this.strokeCircleOffset = this.strokeCircle * ((100 - val) / 100);
    }
  },
  computed: {
    time() {
      return (
        (this.min < 10 ? "0" + this.min : this.min) +
        ":" +
        (this.sec < 10 ? "0" + this.sec : this.sec)
      );
    },
    circle() {
      return this.defaultOptions.layout.type === "circle";
    },
    width() {
      return this.defaultOptions.layout.width;
    },
    height() {
      return this.defaultOptions.layout.height;
    }
  },
  watch: {
    value: function(val) {
      this.updateValue(val);
    }
  }
};
</script>


<style lang="scss" scoped>
.svg-rotate {
  svg {
    transform: rotate(-90deg);
  }
}
</style>