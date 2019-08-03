<template>
  <div class="flex-none justify-center">
    <div v-if="this.state === 1 || this.state === 2">
      <div @click="pauseTimer" class="flex justify-center">
        <!-- Pause icon -->
        <div class="absolute pt-20" :class="{ hidden: this.state === 1, block: this.state === 2 }">
          <svg width="20" height="20" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1664 192v1408q0 26-19 45t-45 19h-512q-26 0-45-19t-19-45v-1408q0-26 19-45t45-19h512q26 0 45 19t19 45zm-896 0v1408q0 26-19 45t-45 19h-512q-26 0-45-19t-19-45v-1408q0-26 19-45t45-19h512q26 0 45 19t19 45z"
            />
          </svg>
        </div>
        <!-- End: Pause icon -->

        <div class="absolute pt-28 text-7xl text-orange-400">{{ time }}</div>

        <!-- circle -->
        <div class="svg-rotate">
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
        <!-- End: Circle -->
      </div>
      <div class="flex justify-center mt-4">
        <button
          @click="stopTimer"
          class="pt-3 pb-3 pl-6 pr-6 rounded-full text-white font-semibold hover:bg-red-600 bg-red-700 focus:outline-none"
        >Stop</button>
      </div>
    </div>
    <!-- Start button -->
    <div v-if="this.state === 0" @click="startTimer" class="flex justify-center ml-8 mt-8">
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

  beforeCreate() {
    // console.log("BEFORE CREATE progess bar");
  },
  created() {
    // console.log("CREATED progess bar");

    this.defaultOptions = {
      progress: {
        color: "#68D391",
        backgroundColor: "#CBD5E0"
      },
      layout: {
        height: 350,
        width: 350,
        strokeWidth: 3,
        type: "circle"
      }
    };
  },
  beforeMount() {
    // console.log("BEFORE MOUNT progess bar");
  },
  mounted() {
    // console.log("MOUNTED progess bar");

    this.updateValue(this.value);
    this.resetTime();
  },
  beforeUpdate() {
    // console.log("BEFORE update progess bar");
  },
  updated() {
    // console.log("UPDATED progess bar");
    console.log({ state: this.state });
  },
  beforeDestroy() {
    // console.log("BEFORE DESTROY progess bar");
    clearInterval(this.intervalVal);
  },
  destroyed() {
    // console.log("DESTROYED progess bar");
  },

  data() {
    return {
      state: 0, // 0 = idle, 1 = running, 2 = paused, 3 = resumed
      value: 100,
      min: Number,
      sec: Number,
      intervalVal: null,

      /** State
       * cycle 1/4 - state 1 - work time
       * cycle 2/4 - state 2 - short rest
       * cycle 3/4 - state 3 - work time
       * cycle 4/4 - state 4 - long rest
       */
      cycle: 1,

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
    startTimer() {
      this.state = 1;
      // this.value = 100;
      this.interval();
    },
    interval() {
      var totalSec;
      if (this.sec === 0) {
        totalSec = this.min * 60;
      } else {
        totalSec = this.min * 60 + this.sec;
      }
      console.log({ totalSec }); // Error cirle line reset to 100% when resume

      var countSec = totalSec;

      this.intervalVal = setInterval(() => {
        console.log({ countSec });

        countSec--;
        this.value = ~~((countSec * 100) / totalSec); // progress bar value
        this.min = ~~(countSec / 60);
        this.sec = countSec % 60;

        console.log({ min: this.min, sec: this.sec, value: this.value });

        if (countSec <= 0) {
          clearInterval(this.intervalVal);

          this.cycle++;
          if (this.cycle > 5) this.cycle = 1; // new cycle

          // work time - cycle = 1 || 3
          if (this.cycle % 2 !== 0 && this.cycle !== 5) {
            this.setTime(this.workTime);
          }
          // rest time - cycle = 2 || 4
          if (this.cycle === 2) {
            this.setTime(this.shortRest);
          }
          // long rest
          if (this.cycle === 4) {
            this.setTime(this.longRest);
          }

          return this.startTimer();
        }
      }, 1000);
    },
    pauseTimer() {
      // is running
      if (this.state === 1) {
        clearInterval(this.intervalVal);
        this.state = 2;
        console.log({ valueWhenPause: this.value });

        return;
      }
      // is pausing
      if (this.state === 2) {
        this.interval();
        this.state = 1;
        console.log({ valueWhenResume: this.value });

        return;
      }
    },
    stopTimer() {
      clearInterval(this.intervalVal);
      this.state = 0;
      this.resetTime();
    },
    setTime() {
      // only minute
      if (arguments.length === 1) {
        this.min = arguments[0];
        return;
      }
      // both minute and second
      if (arguments.length === 2) {
        this.min = arguments[0];
        this.sec = arguments[1];
        return;
      }
    },
    resetTime() {
      this.min = this.workTime;
      this.sec = (this.min * 60) % 60;
    },
    updateValue(val) {
      let invertedVal = 100 - val;
      this.strokeCircle = 2 * Math.PI * this.radiusCircle;
      this.strokeCircleOffset = this.strokeCircle * ((100 - val) / 100);
    }
  },
  computed: {
    time() {
      let min = this.min < 10 ? "0" + this.min : this.min;
      let sec = this.sec < 10 ? "0" + this.sec : this.sec;
      return min + ":" + sec;
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